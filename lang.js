
// window.addEventListener("DOMContentLoaded", () => {
//   // Step 1: Try URL, fallback to localStorage
//   const urlParams = new URLSearchParams(window.location.search);
//   const langFromURL = urlParams.get("lang");
//   const lang = langFromURL || localStorage.getItem("selectedLang");

//   if (lang) {
//     localStorage.setItem("selectedLang", lang);
//     loadLanguage(lang);
//   } else {
//     const langModal = document.getElementById("langModal");
//     if (langModal) langModal.style.display = "flex";
//   }
// });

// function selectLang(lang) {
//   localStorage.setItem("selectedLang", lang);
//   const langModal = document.getElementById("langModal");
//   if (langModal) langModal.style.display = "none";
//   loadLanguage(lang);
// }

// function loadLanguage(lang) {
//   fetch(`lang/${lang}.json`)
//     .then(res => {
//       if (!res.ok) throw new Error("Language file not found");
//       return res.json();
//     })
//     .then(data => {
//       for (const key in data) {
//         const el = document.getElementById(key);
//         if (!el) continue;

//         if (el.children.length === 0) {
//           el.textContent = data[key];
//         } else {
//           for (const node of el.childNodes) {
//             if (node.nodeType === Node.TEXT_NODE) {
//               node.textContent = data[key];
//               break;
//             }
//           }
//         }
//       }

//       document.documentElement.lang = lang;
//       document.documentElement.dir = ["ar", "ur"].includes(lang) ? "rtl" : "ltr";
//     })
//     .catch(err => {
//       console.error("Error loading language:", err);
//     });
// }


window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const langFromURL = urlParams.get("lang");
  const savedLang = localStorage.getItem("selectedLang");

  const lang = langFromURL || savedLang || "en";

  if (!["en", "de"].includes(lang)) {
    localStorage.setItem("selectedLang", "en");
    window.location.href = updateLangInUrl("en");
    return;
  }

  localStorage.setItem("selectedLang", lang);
  loadLanguage(lang);
});

function selectLang(lang) {
  if (!["en", "de"].includes(lang)) return;

  localStorage.setItem("selectedLang", lang);

  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("lang", lang);

  window.location.href = currentUrl.toString(); // reload with updated language
}

function updateLangInUrl(lang) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("lang", lang);
  return currentUrl.toString();
}

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Language file not found");
      return res.json();
    })
    .then(data => {
      for (const key in data) {
        const el = document.getElementById(key);
        if (!el) continue;

        if (el.children.length === 0) {
          el.textContent = data[key];
        } else {
          for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              node.textContent = data[key];
              break;
            }
          }
        }
      }

      // Update <html lang="">
      document.documentElement.lang = lang;

      // Set dropdown value to match
      const langSelect = document.getElementById("languageSelect");
      if (langSelect) langSelect.value = lang;
    })
    .catch(err => {
      console.error("Error loading language:", err);
    });
}

