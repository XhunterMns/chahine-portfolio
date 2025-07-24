// Dark mode toggle
const btn = document.getElementById("toggleDark");
btn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Load projects from JSON
fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("project-list");
    projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "p-4 border rounded shadow hover:scale-105 transition-transform";
      card.innerHTML = `
        <h3 class="text-xl font-bold mb-2">${p.title}</h3>
        <p class="mb-2">${p.description}</p>
        <a href="${p.link}" target="_blank" class="text-blue-500 hover:underline">View project →</a>
      `;
      container.appendChild(card);
    });
  });

