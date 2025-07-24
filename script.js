// Dark mode toggle with localStorage
const btn = document.getElementById("toggleDark");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Check for saved preference or system preference
const currentTheme = localStorage.getItem("theme") || 
                    (prefersDarkScheme.matches ? "dark" : "light");
document.documentElement.classList.toggle("dark", currentTheme === "dark");

btn.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Project filtering
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');
  
  projects.forEach(project => {
    const projectCategories = project.getAttribute('data-tags').split(' ');
    
    if (category === 'all' || projectCategories.includes(category)) {
      project.classList.remove('hidden');
      project.classList.add('animate__animated', 'animate__fadeIn');
    } else {
      project.classList.add('hidden');
    }
  });
}

// Initialize project filtering
document.querySelectorAll('.project-filter').forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    document.querySelectorAll('.project-filter').forEach(btn => {
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('border', 'border-gray-300', 'dark:border-gray-600');
    });
    
    button.classList.add('bg-blue-600', 'text-white');
    button.classList.remove('border', 'border-gray-300', 'dark:border-gray-600');
    
    // Filter projects
    filterProjects(button.dataset.filter);
  });
});

// Load projects from JSON
fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("project-list");
    
    projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "project-card p-0 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all";
      card.setAttribute('data-tags', p.tags.join(' '));
      
      card.innerHTML = `
        <div class="h-48 overflow-hidden">
          <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">${p.title}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">${p.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${p.tags.map(tag => `<span class="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700">${tag}</span>`).join('')}
          </div>
          <a href="${p.link}" target="_blank" class="inline-flex items-center text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
            View project <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      `;
      
      container.appendChild(card);
    });
    
    // Initialize animation for projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.classList.add('animate__animated', 'animate__fadeIn');
      card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Set first filter button as active
    document.querySelector('.project-filter[data-filter="all"]').classList.add('bg-blue-600', 'text-white');
    document.querySelector('.project-filter[data-filter="all"]').classList.remove('border', 'border-gray-300', 'dark:border-gray-600');
  });

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Simple validation
  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // In a real app, you would send this data to a server
  console.log({ name, email, message });
  
  // Show success message
  alert('Thank you for your message! I will get back to you soon.');
  contactForm.reset();
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__animated', 'animate__fadeInUp');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

// Observe sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
  observer.observe(card);
});
