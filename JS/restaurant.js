import { restaurantData } from "./resdata.js";
import { icons } from "./resicon.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- INITIALIZATION & DYNAMIC CONTENT ---

  document.getElementById("restaurant-name").textContent = restaurantData.name;
  document.getElementById("restaurant-cuisine").textContent =
    restaurantData.cuisine;
  document.title = `${restaurantData.name} Menu - BU Eats`;

  const menuContainer = document.getElementById("menu-container");
  restaurantData.menu.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.className =
      "w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all transform hover:-translate-y-2 hover:shadow-2xl group text-center";
    menuItem.innerHTML = `
            <div class="relative pt-12">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-100 dark:bg-amber-900/50 rounded-b-full"></div>
                <img src="${item.image}" alt="${
      item.name
    }" class="relative z-10 w-48 h-48 mx-auto object-cover rounded-full border-8 border-white dark:border-gray-800 shadow-md transition-transform group-hover:scale-110 duration-300" />
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white truncate">${
                  item.name
                }</h3>
                <p class="text-gray-600 dark:text-gray-400 mt-2 flex-grow h-16">${
                  item.description
                }</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-xl font-bold text-amber-600 dark:text-amber-400">$${item.price.toFixed(
                      2
                    )}</span>
                    <button class="bg-gray-800 dark:bg-amber-400 hover:bg-gray-900 dark:hover:bg-amber-500 text-white dark:text-gray-900 font-bold py-2 px-5 rounded-full text-md transition-all transform hover:scale-105 shadow-md">Add</button>
                </div>
            </div>
        `;
    menuContainer.appendChild(menuItem);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("search-icon").innerHTML = icons.SearchIcon;
  document.getElementById("cart-icon").innerHTML = icons.ShoppingCartIcon;
  document.getElementById("user-icon").innerHTML = icons.UserIcon;

  const socialContainer = document.getElementById("social-icons-footer");
  socialContainer.innerHTML = `
        <a href="#" class="text-gray-300 hover:text-white transition-transform transform hover:scale-110">${icons.FacebookIcon}</a>
        <a href="#" class="text-gray-300 hover:text-white transition-transform transform hover:scale-110">${icons.InstagramIcon}</a>
        <a href="#" class="text-gray-300 hover:text-white transition-transform transform hover:scale-110">${icons.TwitterIcon}</a>
    `;

  // --- EVENT LISTENERS ---
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const htmlEl = document.documentElement;
  const updateThemeIcon = (theme) => {
    themeToggleBtn.innerHTML =
      theme === "light" ? icons.MoonIcon : icons.SunIcon;
  };

  let currentTheme = localStorage.getItem("theme") || "light";
  htmlEl.classList.add(currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    currentTheme = htmlEl.classList.contains("dark") ? "light" : "dark";
    htmlEl.classList.toggle("dark");
    localStorage.setItem("theme", currentTheme);
    updateThemeIcon(currentTheme);
  });
});
