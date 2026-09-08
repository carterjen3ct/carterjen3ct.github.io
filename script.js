/* =============================================
   script.js — GIS Portfolio
   This file handles two small interactive features:
     1. The hamburger menu toggle on mobile
     2. Closing the mobile menu when a nav link is clicked
   That's it — keeping it simple.
============================================= */


/* ---- HAMBURGER MENU TOGGLE ----
   When the user clicks the hamburger button on mobile,
   this adds or removes the 'open' class on the nav links.
   The CSS shows the menu when 'open' is present.
---------------------------------*/

// Grab the hamburger button and the nav links list from the HTML
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Listen for a click on the hamburger button
hamburger.addEventListener('click', function () {
  // Toggle the 'open' class — adds it if missing, removes it if present
  navLinks.classList.toggle('open');
});


/* ---- CLOSE MENU ON LINK CLICK ----
   On mobile, if the user taps a nav link (like "Projects"),
   this closes the menu so the page doesn't stay blocked by it.
-----------------------------------*/

// Get all the anchor links inside the nav list
const navLinkItems = navLinks.querySelectorAll('a');

// Loop over each link and add a click listener
navLinkItems.forEach(function (link) {
  link.addEventListener('click', function () {
    // Remove 'open' to hide the mobile menu
    navLinks.classList.remove('open');
  });
});
