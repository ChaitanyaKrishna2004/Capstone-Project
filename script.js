document.addEventListener("DOMContentLoaded", () => {
  // --- DATA ---
  const restaurants = [
    {
      id: 1,
      name: "Burger Hub",
      image:
        "https://source.unsplash.com/random/400x300/?photorealistic,gourmet,burger,on,a,platter",
      cuisine: "American",
    },
    {
      id: 2,
      name: "Pizza Palace",
      image:
        "https://source.unsplash.com/random/400x300/?vibrant,neapolitan,pizza,slice",
      cuisine: "Italian",
    },
    {
      id: 3,
      name: "The Salad Spot",
      image:
        "https://source.unsplash.com/random/400x300/?colorful,healthy,salad,bowl",
      cuisine: "Healthy",
    },
    {
      id: 4,
      name: "Sushi Central",
      image:
        "https://source.unsplash.com/random/400x300/?cinematic,sushi,platter,dark,background",
      cuisine: "Japanese",
    },
    {
      id: 5,
      name: "Taco Town",
      image:
        "https://source.unsplash.com/random/400x300/?authentic,mexican,street,tacos",
      cuisine: "Mexican",
    },
    {
      id: 6,
      name: "Coffee Corner",
      image:
        "https://source.unsplash.com/random/400x300/?barista,latte,art,coffee,shop",
      cuisine: "Café",
    },
    {
      id: 7,
      name: "Pasta Place",
      image:
        "https://source.unsplash.com/random/400x300/?creamy,tomato,pasta,dish,basil",
      cuisine: "Italian",
    },
    {
      id: 8,
      name: "Healthy Bowls",
      image:
        "https://source.unsplash.com/random/400x300/?buddha,bowl,quinoa,vegetables",
      cuisine: "Healthy",
    },
  ];

  const howItWorksSteps = [
    {
      icon: "MenuIcon",
      title: "Browse Menus",
      description:
        "Explore a wide variety of restaurants and dishes available on campus.",
    },
    {
      icon: "PointerIcon",
      title: "Place Your Order",
      description:
        "Select your favorite items, customize them, and check out in seconds.",
    },
    {
      icon: "SmileIcon",
      title: "Enjoy Your Meal",
      description:
        "Get notified when your food is ready for a quick and easy pickup.",
    },
  ];

  // --- ICONS (as SVG strings) ---
  const icons = {
    SearchIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer transition-colors"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>`,
    ShoppingCartIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer transition-colors"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>`,
    UserIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer transition-colors"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>`,
    FacebookIcon: `<a href="#" class="text-gray-300 hover:text-white transition-transform transform hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>`,
    InstagramIcon: `<a href="#" class="text-gray-300 hover:text-white transition-transform transform hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>`,
    TwitterIcon: `<a href="#" class="text-gray-300 hover:text-white transition-transform transform hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.35 0 11.37-6.08 11.37-11.37l-.01-.52c.78-.57 1.45-1.28 1.98-2.08z"></path></svg></a>`,
    ChevronLeftIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-gray-700 dark:text-gray-200"><path d="m15 18-6-6 6-6"/></svg>`,
    ChevronRightIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-gray-700 dark:text-gray-200"><path d="m9 18 6-6-6-6"/></svg>`,
    MenuIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`,
    PointerIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10"><path d="M22 14a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8Z"></path><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>`,
    SmileIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
    SparklesIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/></svg>`,
    XIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    SunIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    MoonIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  };

  // --- GEMINI API CALL FUNCTION ---
  async function callGeminiAPI(prompt) {
    const apiKey = "YOUR_API_KEY_HERE"; // REPLACE WITH YOUR ACTUAL API KEY
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`API call failed: ${response.status}`);
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || "Sorry, I couldn't come up with a description right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Oops! Something went wrong while contacting the AI.";
    }
  }

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
    if (e.target === modal) closeModal(); // Close if clicking on the background overlay
  });
});
