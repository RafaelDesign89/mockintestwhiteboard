const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;
  setMessages([...messages, `You: ${userMessage}`]);
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

    setMessages((prev) => [...prev, `AI: ${data.reply}`]);
  } catch (error) {
    setMessages((prev) => [...prev, `AI
