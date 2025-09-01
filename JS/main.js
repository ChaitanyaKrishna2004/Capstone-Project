import { restaurants, howItWorksSteps } from "./data.js";
import { icons } from "./icons.js";
import { callGeminiAPI } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- THEME TOGGLE ---
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  let currentTheme = localStorage.getItem("theme") || "light";

  const applyTheme = () => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      themeToggleBtn.innerHTML = icons.SunIcon;
    } else {
      document.documentElement.classList.remove("dark");
      themeToggleBtn.innerHTML = icons.MoonIcon;
    }
  };

  themeToggleBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
    applyTheme();
  });

  applyTheme();

  // --- DYNAMIC CONTENT INJECTION ---

  // Header Icons
  const headerIconsContainer = document.getElementById("header-icons");
  headerIconsContainer.innerHTML =
    icons.SearchIcon + icons.ShoppingCartIcon + icons.UserIcon;

  // Restaurant Slider
  const sliderContainer = document.getElementById(
    "restaurant-slider-container"
  );
  restaurants.forEach((restaurant) => {
    const card = document.createElement("div");
    card.className =
      "flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all transform hover:-translate-y-2 hover:shadow-2xl group text-center";
    card.innerHTML = `
            <div class="relative pt-12">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-100 dark:bg-amber-900/50 rounded-b-full"></div>
                <img src="${restaurant.image}" alt="${restaurant.name}" class="relative z-10 w-48 h-48 mx-auto object-cover rounded-full border-8 border-white dark:border-gray-800 shadow-md transition-transform group-hover:scale-110 duration-300" />
                <button data-restaurant-id="${restaurant.id}" class="describer-btn absolute top-16 right-8 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-2 rounded-full text-amber-600 dark:text-amber-400 hover:bg-white dark:hover:bg-gray-600 transition-all transform hover:scale-110 z-20">
                    ${icons.SparklesIcon}
                </button>
            </div>
            <div class="p-6">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white truncate">${restaurant.name}</h3>
                <p class="text-amber-700 dark:text-amber-400 font-semibold mt-1">${restaurant.cuisine}</p>
                <a href="#" class="mt-4 inline-block bg-gray-800 dark:bg-amber-400 hover:bg-gray-900 dark:hover:bg-amber-500 text-white dark:text-gray-900 font-bold py-2 px-6 rounded-full text-md transition-all transform hover:scale-105 shadow-md">
                    Order Now
                </a>
            </div>
        `;
    sliderContainer.appendChild(card);
  });

  // How It Works Section
  const howItWorksGrid = document.querySelector(
    "#how-it-works-container .grid"
  );
  howItWorksSteps.forEach((step) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "flex flex-col items-center";
    stepDiv.innerHTML = `
            <div class="bg-amber-100 dark:bg-amber-900/50 border-2 border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-full p-5 mb-4">
                ${icons[step.icon]}
            </div>
            <h3 class="text-2xl font-semibold mb-2">${step.title}</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${
              step.description
            }</p>
        `;
    howItWorksGrid.appendChild(stepDiv);
  });

  // Footer Icons
  const footerSocialContainer = document.getElementById("footer-social-icons");
  footerSocialContainer.innerHTML =
    icons.FacebookIcon + icons.InstagramIcon + icons.TwitterIcon;

  // --- INTERACTIVITY ---

  // Smooth Scrolling for Nav Links
  document.querySelectorAll(".nav-link").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Restaurant Carousel Scroll Buttons
  const scrollLeftBtn = document.getElementById("scroll-left-btn");
  const scrollRightBtn = document.getElementById("scroll-right-btn");
  scrollLeftBtn.innerHTML = icons.ChevronLeftIcon;
  scrollRightBtn.innerHTML = icons.ChevronRightIcon;

  scrollLeftBtn.addEventListener("click", () =>
    sliderContainer.scrollBy({ left: -300, behavior: "smooth" })
  );
  scrollRightBtn.addEventListener("click", () =>
    sliderContainer.scrollBy({ left: 300, behavior: "smooth" })
  );

  // AI Describer Modal Logic
  const modal = document.getElementById("describer-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  closeModalBtn.innerHTML = icons.XIcon;
  const modalRestaurantName = document.getElementById("modal-restaurant-name");
  const modalRestaurantCuisine = document.getElementById(
    "modal-restaurant-cuisine"
  );
  const modalDescription = document.getElementById("modal-description");

  const openModal = async (restaurant) => {
    modalRestaurantName.textContent = restaurant.name;
    modalRestaurantCuisine.textContent = restaurant.cuisine;
    modalDescription.textContent = "✨ Generating description...";
    modal.classList.remove("hidden");

    const prompt = `You are a creative copywriter for a food app. Write a short, punchy, and appealing one-sentence description for a restaurant named "${restaurant.name}" that serves ${restaurant.cuisine} food.`;
    const description = await callGeminiAPI(prompt);
    modalDescription.textContent = description;
  };

  const closeModal = () => {
    modal.classList.add("hidden");
  };

  document.querySelectorAll(".describer-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const restaurantId = parseInt(button.getAttribute("data-restaurant-id"));
      const restaurant = restaurants.find((r) => r.id === restaurantId);
      if (restaurant) openModal(restaurant);
    });
  });

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
