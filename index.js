// Navbar toggle

//load the page and check if Navbar toggle is being clicked
document.addEventListener('DOMContentLoaded', function() {
    var navToggle = document.querySelector('nav .nav-toggle'); /* get toggle item and listen in the next step */
    navToggle.addEventListener('click', changeNavbarStatus); /* if Navbar toggle is clicked, call the function to add or hide Navbar items */
})

// define fucntion to add or hide Navbar items
var navItems = document.querySelectorAll('nav .nav-item'); /* get navbar items and change visibility in next step */
function changeNavbarStatus(){     
    for (var i=0; i<navItems.length; i++) { /* get all navbar items and update */
        navItems[i].classList.toggle('active'); /* linked to CSS sheet format */
    }
}

function hideNavbar(){     
    for (var i=0; i<navItems.length; i++) { 
        navItems[i].classList.remove('active'); 
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
var defaultLanguage = supportedLanguages.includes(primaryLanguage) ? primaryLanguage : "en"; /* "?" means if no primary language, use "en" */

//add event listener and wait to action if user change language

var languageDropdown = document.getElementById('languageDropdown');
if (languageDropdown) {
    languageDropdown.addEventListener('change', function(){
        switchLanguage(event);
        hideNavbar(); //Toggle Navbar when language changes
    });
}

function switchLanguage(event) { // 'event' is 'languageDropdown' 
    var selectedLanguage = event.target.value; //get selected language value
    localStorage.setItem('selectedLanguage', selectedLanguage);//store user selected language in the localStorage - prepare for different pages
    updateTextContent(selectedLanguage);
}

// click any part of the page to hide navbar
var pageClick = document.querySelector('body > *:not(:first-child)');
pageClick.addEventListener("click", hideNavbar)

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


//Change font style for Chinese characters

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

// Click image to open and zoom

document.addEventListener('DOMContentLoaded', function() {

    var thumbnails = document.querySelectorAll('.thumbnail');
    var modal = document.createElement('div'); //create modal div
    document.body.appendChild(modal); // add the div to body
    modal.id = 'imageModal'; // Assign ID and format modal div
    modal.style.display = 'none'; // hide on the webpage (default)

    var fullsizeImage = new Image(); // create full size image
    fullsizeImage.id = 'fullsizeImage'; // assign ID for formatting
    modal.appendChild(fullsizeImage); // add into modal div

    thumbnails.forEach(function(thumbnail) { // apply to all image assigned class "thumbnails"
        thumbnail.addEventListener('click', function() {
            var fullsizeUrl = thumbnail.getAttribute('data-fullsize-url'); // set the source of fullsize image as var
            fullsizeImage.src = fullsizeUrl; // add the source data
            modal.style.display = 'flex'; //show on screen
        });
    });

    modal.addEventListener('click', function() {
        modal.style.display = 'none'; //click to hide the full image
    });
});

// Nav bar to hide when scroll down

let lastScrollTop = 0; // Variable to keep track of the last scroll position

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling Down
        document.querySelector('.navbar').style.top = '-60px'; // Adjust '-50px' to the negative height of your navbar
    } else {
        // Scrolling Up
        document.querySelector('.navbar').style.top = '0px';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
}, false);