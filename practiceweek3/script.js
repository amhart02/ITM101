const facts = [
  "Elephants can recognize themselves in mirrors.",
  "They can hear sounds from miles away.",
  "Elephants mourn their dead.",
  "Their trunks have over 40,000 muscles."
];

const button = document.getElementById("factButton");
const display = document.getElementById("factDisplay");

button.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  display.textContent = facts[randomIndex];
});
