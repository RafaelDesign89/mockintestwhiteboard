const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;
  setMessages((prev) => [...prev, `You: ${userMessage}`]);
  setInput("");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    if (data.reply) {
      setMessages((prev) => [...prev, `AI: ${data.reply}`]);
    } else {
      setMessages((prev) => [...prev, `AI: Ошибка: нет ответа от сервера`]);
    }
  } catch (error) {
    setMessages((prev) => [...prev, `AI: Ошибка при запросе к API`]);
  }
};
