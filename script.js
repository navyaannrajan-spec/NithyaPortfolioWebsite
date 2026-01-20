const toggleBtn = document.getElementById("chatbot-toggle");
const chatBox = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chatbot-messages");

toggleBtn.onclick = () => chatBox.style.display = "flex";
closeBtn.onclick = () => chatBox.style.display = "none";

sendBtn.onclick = async () => {
  const text = userInput.value;
  if (!text) return;

  messages.innerHTML += `<p style="background:#ff6a00;color:white;padding:10px;border-radius:12px;align-self:flex-end;">${text}</p>`;
  userInput.value = "";

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    const reply = data.reply || "Sorry, something went wrong.";

    messages.innerHTML += `<p style="background:white;color:black;padding:10px;border-radius:12px;">${reply}</p>`;
  } catch (error) {
    messages.innerHTML += `<p style="color:red;">Server error. Try again.</p>`;
  }
};
