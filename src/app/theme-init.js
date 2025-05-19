// This script injects into the <head> and runs before React hydration
// to prevent Flash of Unstyled Content (FOUC)
function setInitialColorMode() {
  function getInitialColorMode() {
    // Check for saved theme preference in localStorage
    const persistedColorPreference = window.localStorage.getItem('theme');
    if (persistedColorPreference) {
      return persistedColorPreference;
    }
    
    // Check for system preference
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    if (systemPreference.matches) {
      return 'dark';
    }
    
    return 'light'; // Default to light if no preference found
  }

  const colorMode = getInitialColorMode();
  
  // Add the appropriate class to the HTML element
  const html = document.documentElement;
  
  if (colorMode === 'dark') {
    html.classList.add('dark');
    html.style.colorScheme = 'dark';
  } else {
    html.classList.remove('dark');
    html.style.colorScheme = 'light';
  }
}

// Call function immediately
setInitialColorMode();
