import pdfplumber
import re
import io
import uuid
import os
from datetime import datetime
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

# ── Medical NLP Knowledge Base ──────────────────────────────────
LIPOMA_POSITIVE_KEYWORDS = [
    "lipoma", "lipomatous", "fatty lesion", "fat density", "adipose",
    "hyperechoic", "well-defined", "well defined", "benign", "non-malignant",
    "subcutaneous", "encapsulated", "homogeneous", "soft tissue fat",
    "fatty mass", "fatty tumor", "lipomatous lesion", "benign fatty",
    "no internal vascularity", "compressible", "mobile mass",
    "no invasion", "well-circumscribed", "no calcification",
    "suggestive of lipoma", "consistent with lipoma", "features of lipoma"
]

LIPOMA_NEGATIVE_KEYWORDS = [
    "malignant", "liposarcoma", "cancer", "carcinoma", "metastasis",
    "irregular border", "internal vascularity", "vascular", "calcification present",
    "infiltrating", "invasive", "necrosis", "heterogeneous", "hypoechoic lesion",
    "suspicious", "cannot exclude malignancy", "biopsy recommended urgent",
    "sarcoma", "lymph node", "lymphoma"
]

SCAN_TYPE_KEYWORDS = {
    "mri": [
        "mri", "magnetic resonance", "t1-weighted", "t2-weighted", "flair", 
        "gradient echo", "gadolinium", "diffusion weighted", "mri study",
        "axial sections", "sagittal sections", "coronal sections"
    ],
    "ct": [
        "ct scan", "computed tomography", "hounsfield units", "hu", "kvp", 
        "mas", "contrast enhanced", "non-contrast", "multidetector ct",
        "axial reconstructed"
    ]
}

# ── General Medical Fidelity Markers ────────────────────────────
MEDICAL_FIDELITY_KEYWORDS = [
    "patient", "clinical", "physician", "radiology", "imaging", 
    "hospital", "doctor", "history", "findings", "impression",
    "correlation", "radiologist", "diagnostic", "assessment"
]

BODY_LOCATIONS = [
    "arm", "forearm", "shoulder", "neck", "back", "chest", "abdomen",
    "thigh", "leg", "knee", "scalp", "head", "face", "buttock",
    "axilla", "groin", "flank", "lumbar", "cervical", "dorsal"
]

FINDINGS_PATTERNS = [
    r'(?:findings?|observation)[:\s]+(.{20,300}?)(?:\n\n|\Z)',
    r'(?:impression|conclusion|opinion)[:\s]+(.{10,300}?)(?:\n\n|\Z)',
    r'(?:lesion|mass|lump|nodule).{0,200}(?:cm|mm)',
]

SIZE_PATTERN = r'(\d+\.?\d*)\s*[xX×]\s*(\d+\.?\d*)\s*(?:x\s*(\d+\.?\d*))?\s*(?:cm|mm)'
SINGLE_SIZE_PATTERN = r'(\d+\.?\d*)\s*(?:cm|mm)'


# ── PDF Extraction ───────────────────────────────────────────────
def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract all text from a PDF file."""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text
    except Exception as e:
        return f"PDF extraction error: {str(e)}"


# ── Strict Medical Validation Layer ──────────────────────────────
def validate_medical_fidelity(text: str) -> tuple[bool, str]:
    """
    Performs a 3-layer check to ensure document is a genuine MRI/CT report.
    1. Technical Modality Match
    2. Clinical Density (Medical markers count)
    3. Anatomic Evidence (Location or Measurement)
    """
    lower = text.lower()
    
    # Layer 1: Strong Modality Check (Must find at least 1 technical term)
    has_modality = False
    for st, keywords in SCAN_TYPE_KEYWORDS.items():
        if any(kw in lower for kw in keywords):
            has_modality = True
            break
    if not has_modality:
        return False, "Technical MRI/CT modality signatures not detected."

    # Layer 2: Clinical Density Check (Must find at least 3 medical markers)
    medical_hits = [kw for kw in MEDICAL_FIDELITY_KEYWORDS if kw in lower]
    if len(medical_hits) < 3:
        return False, f"Insufficient clinical density (Detected {len(medical_hits)}/3 markers). Document does not appear to be a medical report."

    # Layer 3: Anatomic/Metric Evidence
    has_location = any(loc in lower for loc in BODY_LOCATIONS)
    has_measurement = bool(re.search(SIZE_PATTERN, text)) or bool(re.search(SINGLE_SIZE_PATTERN, text))
    
    if not (has_location or has_measurement):
        return False, "Anatomical or metric evidence (body location/measurements) not identified."

    return True, "Fidelity Validated"


# ── Medical Entity Extraction ────────────────────────────────────
def extract_medical_entities(text: str) -> dict:
    """Extract key medical entities from scan report text."""
    lower = text.lower()
    
    # --- Size Detection ---
    sizes = re.findall(SIZE_PATTERN, text 
)
    size_str = "Not specified"
    if sizes:
        s = sizes[0]
        parts = [p for p in s if p]
        size_str = " × ".join(parts) + " cm"
    
    # --- Location Detection ---
    locations = [loc for loc in BODY_LOCATIONS if loc in lower]
    location_str = ", ".join(locations).title() if locations else "Not specified"
    
    # --- Scan Type Detection ---
    scan_type = None
    for st, keywords in SCAN_TYPE_KEYWORDS.items():
        if any(kw in lower for kw in keywords):
            scan_type = st.upper()
            break
    
    # --- Findings & Impression ---
    findings = "See attached report"
    impression = "AI Analysis performed"
    
    # Try to extract findings/impression sections
    sections = re.split(r'\n(?=[A-Z])', text)
    for section in sections:
        sl = section.lower()
        if any(kw in sl for kw in ["finding", "observation", "description"]):
            findings = section.strip()[:400]
        if any(kw in sl for kw in ["impression", "conclusion", "opinion", "summary"]):
            impression = section.strip()[:400]
    
    # --- Patient Details ---
    patient_name = "N/A"
    name_match = re.search(r'(?:patient name|name)[:\s]+([A-Za-z\s]+)', text, re.IGNORECASE)
    if name_match:
        patient_name = name_match.group(1).strip()[:50]
    
    age = "N/A"
    age_match = re.search(r'(?:age|years?)[:\s]+(\d{1,3})', text, re.IGNORECASE)
    if age_match:
        age = age_match.group(1) + " years"
    
    return {
        "size": size_str,
        "location": location_str,
        "scan_type": scan_type,
        "findings": findings,
        "impression": impression,
        "patient_name": patient_name,
        "patient_age": age
    }


# ── ML Classification ────────────────────────────────────────────
def classify_lipoma(text: str, entities: dict) -> dict:
    """Score the report against lipoma indicators using NLP rule-based ML."""
    lower = text.lower()
    
    positive_hits = [kw for kw in LIPOMA_POSITIVE_KEYWORDS if kw in lower]
    negative_hits = [kw for kw in LIPOMA_NEGATIVE_KEYWORDS if kw in lower]
    
    positive_score = len(positive_hits)
    negative_score = len(negative_hits)
    
    # Base confidence calculation
    base = 40.0  # base score in percent
    
    if positive_score > 0:
        confidence = min(base + (positive_score * 8.5), 99.0)
    else:
        confidence = max(base - (negative_score * 10), 10.0)
    
    # Deduct for negative indicators
    confidence = max(confidence - (negative_score * 12), 5.0)
    
    # Classification
    if confidence >= 70:
        classification = "Likely Lipoma"
        risk = "Low Risk — Benign"
        verdict_color = "green"
    elif confidence >= 40:
        classification = "Possible Lipoma"
        risk = "Moderate — Further Evaluation Advised"
        verdict_color = "orange"
    else:
        classification = "Lipoma Unlikely"
        risk = "High Risk — Specialist Consultation Required"
        verdict_color = "red"
    
    return {
        "classification": classification,
        "confidence": f"{confidence:.1f}%",
        "confidence_value": round(confidence, 1),
        "risk_assessment": risk,
        "positive_indicators": positive_hits[:5],
        "warning_indicators": negative_hits[:3],
        "verdict_color": verdict_color
    }


# ── PDF Report Generation ────────────────────────────────────────
def generate_pdf_report(
    scan_id: str,
    patient_email: str,
    entities: dict,
    classification: dict,
    filename: str
) -> bytes:
    """Generate a professional PDF diagnosis report."""
    
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=60,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    primary = colors.HexColor('#6c63ff')
    dark = colors.HexColor('#0d1b2a')
    success = colors.HexColor('#00b894')
    warning = colors.HexColor('#e17055')
    light_bg = colors.HexColor('#f8f9fa')
    
    title_style = ParagraphStyle('TitleS', fontSize=22, textColor=primary, alignment=TA_CENTER,
                                  fontName='Helvetica-Bold', spaceAfter=4)
    subtitle_style = ParagraphStyle('SubS', fontSize=11, textColor=colors.grey,
                                     alignment=TA_CENTER, spaceAfter=6)
    section_style = ParagraphStyle('SecS', fontSize=13, textColor=dark,
                                    fontName='Helvetica-Bold', spaceBefore=14, spaceAfter=6)
    body_style = ParagraphStyle('BodyS', fontSize=10, textColor=dark,
                                 leading=16, spaceAfter=4)
    small_style = ParagraphStyle('SmallS', fontSize=8, textColor=colors.grey,
                                  alignment=TA_CENTER)
    
    story = []
    
    # ── Header ──────────────────────────────────────────────
    story.append(Paragraph("LIPOMA DETECTION SYSTEM", title_style))
    story.append(Paragraph("AI-Powered Medical Scan Analysis Report", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=primary))
    story.append(Spacer(1, 14))
    
    # ── Report Metadata ──────────────────────────────────────
    verdict_color_map = {"green": success, "orange": warning, "red": colors.red}
    v_color = verdict_color_map.get(classification.get("verdict_color", "green"), success)
    
    meta_data = [
        ["Report ID", f"RPT-{scan_id[:8].upper()}", "Date", datetime.now().strftime("%d %b %Y, %I:%M %p")],
        ["Patient Email", patient_email, "Scan Type", entities.get("scan_type", "N/A")],
        ["Patient Name", entities.get("patient_name", "N/A"), "Patient Age", entities.get("patient_age", "N/A")],
        ["Source File", filename[:40], "Status", "ANALYSIS COMPLETE"],
    ]
    
    meta_table = Table(meta_data, colWidths=[100, 170, 90, 170])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), light_bg),
        ('BACKGROUND', (2, 0), (2, -1), light_bg),
        ('TEXTCOLOR', (0, 0), (-1, -1), dark),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (2, 0), (2, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.white, light_bg]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
        ('PADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 16))
    
    # ── AI Verdict Box ───────────────────────────────────────
    story.append(HRFlowable(width="100%", thickness=1, color=primary))
    story.append(Spacer(1, 8))
    story.append(Paragraph("🤖 AI DIAGNOSTIC CONCLUSION", section_style))
    
    verdict_data = [
        ["Classification", classification.get("classification", "N/A")],
        ["AI Confidence Score", classification.get("confidence", "N/A")],
        ["Risk Assessment", classification.get("risk_assessment", "N/A")],
    ]
    
    verdict_table = Table(verdict_data, colWidths=[180, 350])
    verdict_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f0f4ff')),
        ('BACKGROUND', (0, 0), (0, -1), primary),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.white),
        ('TEXTCOLOR', (1, 0), (1, -1), dark),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#c3d0ff')),
        ('PADDING', (0, 0), (-1, -1), 12),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(verdict_table)
    story.append(Spacer(1, 14))
    
    # ── Imaging Findings ─────────────────────────────────────
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#e2e8f0')))
    story.append(Paragraph("📋 EXTRACTED IMAGING DETAILS", section_style))
    
    img_data = [
        ["Parameter", "Extracted Value"],
        ["Lesion Size", entities.get("size", "Not specified")],
        ["Body Location", entities.get("location", "Not specified")],
        ["Scan Modality", entities.get("scan_type", "N/A")],
    ]
    
    img_table = Table(img_data, colWidths=[180, 350])
    img_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), primary),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, light_bg]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
        ('PADDING', (0, 0), (-1, -1), 9),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(img_table)
    story.append(Spacer(1, 12))
    
    # ── Findings & Impression ─────────────────────────────────
    story.append(Paragraph("🔍 REPORT FINDINGS", section_style))
    findings_text = entities.get("findings", "N/A").replace('\n', '<br/>')
    story.append(Paragraph(findings_text[:500], body_style))
    story.append(Spacer(1, 8))
    
    story.append(Paragraph("📌 RADIOLOGIST IMPRESSION", section_style))
    impression_text = entities.get("impression", "N/A").replace('\n', '<br/>')
    story.append(Paragraph(impression_text[:500], body_style))
    story.append(Spacer(1, 12))
    
    # ── Positive Indicators ──────────────────────────────────
    if classification.get("positive_indicators"):
        story.append(Paragraph("✅ DETECTED LIPOMA INDICATORS", section_style))
        indicators = " • ".join([kw.title() for kw in classification["positive_indicators"]])
        story.append(Paragraph(indicators, body_style))
        story.append(Spacer(1, 8))
    
    if classification.get("warning_indicators"):
        story.append(Paragraph("⚠️ WARNING INDICATORS", section_style))
        warnings = " • ".join([kw.title() for kw in classification["warning_indicators"]])
        story.append(Paragraph(f'<font color="red">{warnings}</font>', body_style))
        story.append(Spacer(1, 8))
    
    # ── Disclaimer ───────────────────────────────────────────
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#e2e8f0')))
    story.append(Spacer(1, 8))
    disclaimer = (
        "⚠️ DISCLAIMER: This AI-generated report is intended for informational purposes only. "
        "It does not constitute a medical diagnosis. Always consult a qualified healthcare "
        "professional for medical advice, diagnosis, and treatment decisions."
    )
    story.append(Paragraph(disclaimer, small_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        f"Generated by Lipoma Detection AI System | {datetime.now().strftime('%d %B %Y')} | Report: RPT-{scan_id[:8].upper()}",
        small_style
    ))
    
    doc.build(story)
    buffer.seek(0)
    return buffer.getvalue()


# ── Main Orchestrator ────────────────────────────────────────────
async def analyze_pdf_scan(file_bytes: bytes, filename: str, user_email: str) -> dict:
    """Full pipeline: extract → analyze → classify → store PDF."""
    
    scan_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().isoformat()
    
    # Step 1: Extract text
    text = extract_text_from_pdf(file_bytes)
    
    # Step 2: Ultra-Strict Medical Fidelity Check
    is_valid, reason = validate_medical_fidelity(text)
    if not is_valid:
        return {
            "status": "Invalid Scan",
            "analysis_result": "NON-MEDICAL MEDIA DETECTED",
            "detailed_findings": (
                f"STRICT PROTOCOL 403 REJECTION: {reason}. "
                "The diagnostic system is strictly calibrated for cross-sectional "
                "radiology reports (MRI/CT). Generic documents, health tips, "
                "invoices, or other scanning reports are permanently blocked."
            ),
            "confidence_score": "0%",
            "status_code": "FIDELITY_ERROR_403",
            "filename": filename,
            "timestamp": timestamp
        }

    # Step 3: Extract entities
    entities = extract_medical_entities(text)
    classification = classify_lipoma(text, entities)
    
    # Step 4: Generate PDF report
    pdf_bytes = generate_pdf_report(scan_id, user_email, entities, classification, filename)
    
    # Save PDF to reports directory
    reports_dir = os.path.join(os.path.dirname(__file__), "reports")
    os.makedirs(reports_dir, exist_ok=True)
    report_path = os.path.join(reports_dir, f"{scan_id}.pdf")
    with open(report_path, 'wb') as f:
        f.write(pdf_bytes)
    
    return {
        "scan_id": scan_id,
        "timestamp": timestamp,
        "filename": filename,
        "user_email": user_email,
        "status": "Analysis Complete",
        # Classification results
        "analysis_result": classification["classification"],
        "confidence_score": classification["confidence"],
        "risk_assessment": classification["risk_assessment"],
        # Extracted details
        "tissue_density": entities.get("size", "N/A"),
        "scan_type": entities.get("scan_type", "N/A"),
        "body_location": entities.get("location", "N/A"),
        "findings_summary": entities.get("impression", "N/A")[:200],
        "positive_indicators": classification["positive_indicators"],
        "warning_indicators": classification["warning_indicators"],
        # Report download
        "report_path": report_path,
        "report_id": scan_id,
        "model_version": "NLP-ML v2.0 | PdfAnalyzer Pro"
    }
