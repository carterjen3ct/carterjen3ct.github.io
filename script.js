/* =============================================
   script.js — GIS Portfolio
   1. Hamburger menu toggle (mobile)
   2. Close mobile menu on nav link click
   3. Popup modal for the "More maps" tiles
      (open, close, previous/next, keyboard)
   4. Navbar shadow on scroll
   5. Scroll reveal animations
============================================= */


/* ---- HAMBURGER MENU TOGGLE ----
   Adds/removes 'open' on the nav links list.
   CSS shows the mobile menu when 'open' is present.
   Guarded with null checks so this works on both
   index.html and project detail pages.
---------------------------------*/

var hamburger = document.getElementById('hamburger');
var navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  /* Close menu when a nav link is tapped on mobile */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

}


/* ---- POPUP MODAL ----
   Detail-page tiles are plain <a> links and need no JS.
   "More maps" tiles (.project-tile--popup) open this modal.
   Everything is guarded so detail pages (no modal) don't error.
----------------------*/

var popupModal  = document.getElementById('popupModal');
var popupTiles  = Array.prototype.slice.call(document.querySelectorAll('.project-tile--popup'));
var currentIndex = -1; /* which tile is showing; -1 means the modal is closed */

/* Fill the modal with the data-* attributes from tile number i */
function showPopup(i) {
  var tile = popupTiles[i];
  currentIndex = i;

  document.getElementById('popupTitle').textContent = tile.dataset.title;
  document.getElementById('popupDesc').textContent  = tile.dataset.desc;
  document.getElementById('popupImg').src           = tile.dataset.img;
  document.getElementById('popupImg').alt           = tile.dataset.title;
  document.getElementById('popupFull').href         = tile.dataset.img;
  document.getElementById('popupCount').textContent = (i + 1) + ' of ' + popupTiles.length;

  /* Build skill tag pills from the comma-separated list */
  var skills = document.getElementById('popupSkills');
  skills.innerHTML = '';
  tile.dataset.skills.split(',').forEach(function (skill) {
    var tag = document.createElement('span');
    tag.className   = 'tag';
    tag.textContent = skill.trim();
    skills.appendChild(tag);
  });
}

/* Open the modal on tile number i and lock page scrolling */
function openPopup(i) {
  showPopup(i);
  popupModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('closePopup').focus(); /* move keyboard focus into the modal */
}

/* Close the modal and send keyboard focus back to the tile it was opened from */
function closePopup() {
  popupModal.classList.remove('open');
  document.body.style.overflow = '';
  popupTiles[currentIndex].focus();
  currentIndex = -1;
}

/* Move to the previous (-1) or next (+1) map, wrapping around at the ends */
function stepPopup(direction) {
  showPopup((currentIndex + direction + popupTiles.length) % popupTiles.length);
}

if (popupModal) {

  /* Clicking a tile opens the modal on that tile */
  popupTiles.forEach(function (tile, i) {
    tile.addEventListener('click', function () {
      openPopup(i);
    });
  });

  /* Close button, previous and next buttons */
  document.getElementById('closePopup').addEventListener('click', closePopup);
  document.getElementById('popupPrev').addEventListener('click', function () { stepPopup(-1); });
  document.getElementById('popupNext').addEventListener('click', function () { stepPopup(1); });

  /* Clicking the dark overlay (outside the white box) closes it */
  popupModal.addEventListener('click', function (event) {
    if (event.target === popupModal) closePopup();
  });

  /* Keyboard: Escape closes, left/right arrows flip through maps */
  document.addEventListener('keydown', function (event) {
    if (currentIndex === -1) return;
    if (event.key === 'Escape')     closePopup();
    if (event.key === 'ArrowLeft')  stepPopup(-1);
    if (event.key === 'ArrowRight') stepPopup(1);
  });

}


/* ---- NAVBAR SHADOW ON SCROLL ----
   Adds .scrolled to the navbar once the page moves
   down a little, so it gets a soft shadow.
-----------------------------------*/

var navbar = document.querySelector('.navbar');

/* Turn the shadow on/off depending on scroll position */
function updateNavShadow() {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
}

if (navbar) {
  window.addEventListener('scroll', updateNavShadow, { passive: true });
  updateNavShadow();
}


/* ---- SCROLL REVEAL ----
   Section headings, skills, project tiles, and detail-page
   blocks fade up the first time they scroll into view.
   Skipped entirely if the visitor prefers reduced motion.
-----------------------------*/

var revealItems = document.querySelectorAll(
  '.section-head, .legend, .skill, .skills-other li, .project-tile, .detail-layout, .detail-figure, .detail-gee-wrap, .detail-next'
);
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {

  /* Show each item once it's 10% on screen, then stop watching it */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  /* Hide items and start watching. Items in the same row get a small
     stagger (0, 90, 180, 270ms) so a row ripples in left to right. */
  revealItems.forEach(function (item) {
    var position = Array.prototype.indexOf.call(item.parentNode.children, item);
    item.style.transitionDelay = (position % 4) * 90 + 'ms';
    item.classList.add('reveal');
    revealObserver.observe(item);
  });

}
