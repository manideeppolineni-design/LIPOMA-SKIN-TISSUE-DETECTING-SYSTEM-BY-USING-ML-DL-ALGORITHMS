import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCFh-2L_aYOUDHPw-NKeL_cn3T6laBjp_c";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: "You are a professional medical AI assistant."
    });
    const chat = model.startChat({
        history: []
    });
    const result = await chat.sendMessage("hello");
    console.log("Success:", result.response.text());
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
