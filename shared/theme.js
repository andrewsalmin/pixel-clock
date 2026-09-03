"use strict";

const THEMES = ["green", "amber", "blue"];
const THEME_STORAGE_KEY = "pixel-clock-theme";

function applyTheme(theme) {
  if (theme === "green") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

function getSavedTheme() {
  let saved;
  try {
    saved = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (e) {
    saved = null;
  }
  return THEMES.includes(saved) ? saved : THEMES[0];
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    // localStorage unavailable — theme just won't persist
  }
}

function initTheme() {
  let current = getSavedTheme();
  applyTheme(current);

  let button = document.createElement("button");
  button.className = "theme-toggle";
  button.type = "button";
  button.textContent = "тема";
  button.setAttribute("aria-label", "Переключить цветовую тему часов");
  button.addEventListener("click", function () {
    current = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    applyTheme(current);
    saveTheme(current);
  });
  document.body.appendChild(button);
}

function getThemeColors() {
  let style = getComputedStyle(document.documentElement);
  return {
    bg: style.getPropertyValue("--bg-color").trim(),
    digit: style.getPropertyValue("--digit-color").trim(),
    seconds: style.getPropertyValue("--seconds-color").trim(),
  };
}

initTheme();
