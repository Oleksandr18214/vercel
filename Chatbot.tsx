import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, user: "You" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4",
        messages: [{ role: "user", content: input }],
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`
        }
      });

      const botReply = response.data.choices[0].message.content;
      setMessages([...newMessages, { text: botReply, user: "AI" }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>AI Chatbot</h2>
      <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "300px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "5px 0", color: msg.user === "AI" ? "blue" : "black" }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />
      <button onClick={sendMessage} style={{ width: "100%", padding: "10px", marginTop: "5px" }}>Send</button>
    </div>
  );
};
m
export default Chatbot;
