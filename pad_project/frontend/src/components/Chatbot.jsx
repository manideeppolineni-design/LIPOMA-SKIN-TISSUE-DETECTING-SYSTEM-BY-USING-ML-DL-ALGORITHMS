import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your LipomaDetect AI Specialist. I am ready to provide professional medical insights. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Error: API Key is missing. Please check your .env file." }]);
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are a professional medical AI assistant for LipomaDetect. Provide accurate clinical information. ALWAYS state you are an AI and not a substitute for a doctor. If the user asks about non-medical things, steer them back to health.",
      });

      const systemPrompt = "You are a professional medical AI assistant for LipomaDetect. Provide accurate clinical information. ALWAYS state you are an AI and not a substitute for a doctor. If the user asks about non-medical things, steer them back to health.";

      // IMPORTANT: Gemini history MUST start with a 'user' role message.
      // We filter out the very first 'assistant' greeting from the history.
      const chatHistory = messages
        .filter((msg, index) => index > 0) // Skip the initial "Hello" assistant message
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        }));

      const chat = model.startChat({
        history: chatHistory,
      });

      // Include the system prompt context with the user's message
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("Gemini AI Error:", error);
      setMessages((prev) => [...prev, { role: 'assistant', content: `⚠️ AI Engine Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="pro-chatbot">
      <div className="chat-messages-area">
        {messages.map((msg, index) => (
          <div key={index} className={`pro-message ${msg.role}`}>
            <div className="pro-bubble">
              {msg.role === 'assistant' && <div className="bot-avatar">AI</div>}
              <div className="bubble-content">{msg.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="pro-message assistant">
            <div className="pro-bubble typing-bubble">
              <div className="typing-dots"><span></span><span></span><span></span></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="pro-chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your medical query here..."
        />
        <button type="submit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
