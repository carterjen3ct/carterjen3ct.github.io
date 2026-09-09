/* =============================================
   script.js — GIS Portfolio
   1. Hamburger menu toggle (mobile)
   2. Close mobile menu on nav link click
   3. GEE app modal (Pakistan flood project)
============================================= */


/* ---- HAMBURGER MENU TOGGLE ----
   Adds/removes 'open' on the nav links list.
   CSS shows the mobile menu when 'open' is present.
---------------------------------*/

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});


/* ---- CLOSE MENU ON LINK CLICK ----
   Tapping a nav link on mobile closes the menu.
-----------------------------------*/

const navLinkItems = navLinks.querySelectorAll('a');

navLinkItems.forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});


/* ---- GEE APP MODAL ----
   Opens a full-screen popup with the Pakistan flood GEE app in an iframe.
   The iframe src is set on open and cleared on close so GEE stops running
   in the background when the modal isn't visible.
------------------------*/

// Published GEE app URL — update this if the app URL ever changes
const GEE_APP_URL = 'https://cartertjensen.users.earthengine.app/view/interactive-flood-inundation-tool';

const geeModal    = document.getElementById('geeModal');
const geeFrame    = document.getElementById('geeFrame');
const openGeeBtn  = document.getElementById('openGeeModal');
const closeGeeBtn = document.getElementById('closeGeeModal');

// Set iframe src and show the modal
function openModal() {
  geeFrame.src = GEE_APP_URL;
  geeModal.classList.add('open');
  document.body.style.overflow = 'hidden'; // stop page from scrolling behind modal
}

// Clear iframe src and hide the modal
function closeModal() {
  geeModal.classList.remove('open');
  geeFrame.removeAttribute('src'); // removeAttribute fully stops GEE; setting src='' can reload the page
  document.body.style.overflow = '';
}

// "View Project" button on the Pakistan card
openGeeBtn.addEventListener('click', openModal);

// X button inside the modal header
closeGeeBtn.addEventListener('click', closeModal);

// Click on the dark overlay (outside the white box) also closes
geeModal.addEventListener('click', function (event) {
  if (event.target === geeModal) {
    closeModal();
  }
});

// Escape key closes the modal
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && geeModal.classList.contains('open')) {
    closeModal();
  }
});
