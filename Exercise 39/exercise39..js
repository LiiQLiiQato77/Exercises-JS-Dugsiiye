const RAPIDAPI_KEY = "3cd21794cemsh93d47fe02974102p1a33d7jsne674c32e6784";
const RAPIDAPI_HOST = "google-translate113.p.rapidapi.com";


const translateForm = document.querySelector("#translateForm");
const fromLangSelect = document.querySelector("#fromLang");
const toLangSelect = document.querySelector("#toLang");
const textInput = document.querySelector("#textInput");
const translateBtn = document.querySelector("#translateBtn");
const translatedText = document.querySelector("#translatedText");


getLanguages();

async function getLanguages() {
  const url = `https://${RAPIDAPI_HOST}/api/v1/translator/support-languages`;

  const option = {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, option);
    const result = await response.json();

    console.log("Languages API response:", result);

    if (Array.isArray(result) && result.length > 0) {
      const languages = result.reduce((acc, langObj) => {
        if (langObj.code && langObj.language) {
          acc[langObj.code] = langObj.language;
        }
        return acc; 
      }, {});

      populateLanguages(languages);
    } else {
      console.error("Invalid response structure or no languages found");
    }
  } catch (error) {
    console.error("Error fetching supported languages:", error);
  }
}


function populateLanguages(languages) {
  fromLangSelect.innerHTML = "";
  toLangSelect.innerHTML = "";

  fromLangSelect.innerHTML += `<option value="auto">Auto-detect</option>`;
  toLangSelect.innerHTML += `<option value="en">English</option>`;

  Object.keys(languages).forEach((langCode) => {
    fromLangSelect.innerHTML += `<option value="${langCode}">${languages[langCode]}</option>`;
    toLangSelect.innerHTML += `<option value="${langCode}">${languages[langCode]}</option>`;
  });

  toLangSelect.value = "so";
}


translateForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fromLang = fromLangSelect.value;
  const toLang = toLangSelect.value;
  const text = textInput.value.trim();

  // XAQIIJIN (VALIDATION): qoraalka waa lama huraan
  if (text === "") {
    translatedText.textContent = "Please enter some text to translate.";
    translatedText.classList.add("error");
    return;
  }

  translateText(fromLang, toLang, text);
});

async function translateText(fromLang, toLang, text) {

  translateBtn.disabled = true;
  translateBtn.textContent = "Translating...";
  translatedText.classList.remove("error");
  translatedText.textContent = "";

  const url = `https://${RAPIDAPI_HOST}/api/v1/translator/text`;

  const option = {
    method: "POST",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      from: fromLang,
      to: toLang,
      text: text,
    }),
  };

  try {
    const response = await fetch(url, option);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Translate result:", result);

    const translated = result?.trans || "Translation failed. Try again.";

    translatedText.textContent = translated;
  } catch (error) {
    console.error("Error during translation API call:", error);
    translatedText.textContent = `Error: ${error.message}`;
    translatedText.classList.add("error");
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "Translate";
  }
}