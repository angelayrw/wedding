// Navbar toggle

//load the page and check if Navbar toggle is being clicked
document.addEventListener('DOMContentLoaded', function() {
    var navToggle = document.querySelector('nav .nav-toggle'); /* get toggle item and listen in the next step */
    navToggle.addEventListener('click', changeNavbarStatus); /* if Navbar toggle is clicked, call the function to add or hide Navbar items */
})

// define fucntion to add or hide Navbar items
function changeNavbarStatus(){     
    var navItems = document.querySelectorAll('nav .nav-item'); /* get navbar items and change visibility in next step */
    for (var i=0; i<navItems.length; i++) { /* get all navbar items and update */
        navItems[i].classList.toggle('active'); /* linked to CSS sheet format */
    }
}

//Translated content with three languages//

import contentTranslations from './text.js';


// get all keys from the contentTranslations object
var idName = Object.keys(contentTranslations);


// create a list and add all keys to the list
var idNames = [];
idName.forEach((key) => {
    idNames.push(key);
});

//check user's navigator language and use it as default language//

var userLanguage = navigator.language || navigator.userLanguage; 
var primaryLanguage = userLanguage.split('-')[0];
var supportedLanguages = ["en", "zh", "pt"];
var defaultLanguage = supportedLanguages.includes(primaryLanguage) ? primaryLanguage : "en";

//add event listener and wait to action if user change language

var languageDropdown = document.getElementById('languageDropdown');
if (languageDropdown) {
    languageDropdown.addEventListener('change', function(){
        switchLanguage(event);
        changeNavbarStatus();
    });
}

function switchLanguage(event) { // 'event' is 'languageDropdown' 
    var selectedLanguage = event.target.value; //get selected language value
    localStorage.setItem('selectedLanguage', selectedLanguage);//store user selected language in the localStorage - prepare for different pages
    updateTextContent(selectedLanguage);
}

//Retrive stored language from localStorage - different pages

document.addEventListener('DOMContentLoaded', function() { //load DOM localStorage
    var selectedLanguage = localStorage.getItem('selectedLanguage')||"en"; // Fallback to 'en' if nothing is stored
    document.getElementById('languageDropdown').value = selectedLanguage; //get selected language
    updateTextContent(selectedLanguage);
});

//update lanaugage based on user's selection//

function updateTextContent(selectedLanguage) {
    for (var i = 0; i < idNames.length; i++) {
        var text = idNames[i];
        var element = document.getElementById(text);

        if (element && contentTranslations[text][selectedLanguage]) {
            element.textContent = contentTranslations[text][selectedLanguage];
        }
    }

    var handwritingElements = document.querySelectorAll('.handwriting');

    if (selectedLanguage === 'zh') {
        handwritingElements.forEach(function(handwritingFont) {
            handwritingFont.style.fontFamily = "Ma Shan Zheng";
        });
    } else {
        handwritingElements.forEach(function(handwritingFont) {
            handwritingFont.style.fontFamily = "Mrs Saint Delafield";
        });
    }
}

//Toggle Navbar when language changes
