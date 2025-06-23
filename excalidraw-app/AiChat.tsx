import React, { useState } from "react";

export default function AiChat() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Ты интервьюер. Задавай дизайнеру задачи, оценивай логику, помогай уточняющими вопросами." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: updatedMessages
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message;
    setMessages([...updatedMessages, reply]);
    setInput("");
  };

  return (
    <div style={{ padding: 10, height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.role}:</b> {m.content}</div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 5 }}
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}
