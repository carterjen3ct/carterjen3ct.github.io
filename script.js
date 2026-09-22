/* =============================================
   script.js — GIS Portfolio
   1. Hamburger menu toggle (mobile)
   2. Close mobile menu on nav link click
   3. Project tile click routing (detail page or popup)
   4. Popup modal open / close
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


/* ---- PROJECT TILE CLICK ROUTING ----
   Each .project-tile has either:
     data-href  → navigate to that detail page
     data-popup → open the popup modal with the tile's data attributes
   Only runs on index.html where .project-tile elements exist.
-----------------------------------*/

document.querySelectorAll('.project-tile').forEach(function (tile) {
  tile.addEventListener('click', function () {
    if (tile.dataset.href) {
      /* Navigate to the project detail page */
      window.location.href = tile.dataset.href;
    } else if (tile.dataset.popup) {
      /* Open the popup modal */
      openPopup(tile);
    }
  });
});


/* ---- POPUP MODAL ----
   Populates and shows the modal with data from the clicked tile.
   Only runs on index.html (elements guarded with null checks).
----------------------*/

var popupModal   = document.getElementById('popupModal');
var popupTitle   = document.getElementById('popupTitle');
var popupImg     = document.getElementById('popupImg');
var popupDesc    = document.getElementById('popupDesc');
var popupSkills  = document.getElementById('popupSkills');
var closePopupBtn = document.getElementById('closePopup');

/* Reference to the popup body — needed to toggle side layout class */
var popupBody = document.querySelector('.popup-body');

/* Pull data attributes from the tile and populate the modal.
   If the tile has data-layout="side", switch the body to the
   side-by-side layout (image left, text right). */
function openPopup(tile) {
  popupTitle.textContent = tile.dataset.title;
  popupImg.src           = tile.dataset.img;
  popupImg.alt           = tile.dataset.title;
  popupDesc.textContent  = tile.dataset.desc;

  /* Apply or clear the side layout depending on the tile's data-layout attribute */
  if (tile.dataset.layout === 'side' && popupBody) {
    popupBody.classList.add('layout-side');
  } else if (popupBody) {
    popupBody.classList.remove('layout-side');
  }

  /* Build skill tag elements from comma-separated string */
  popupSkills.innerHTML = '';
  tile.dataset.skills.split(',').forEach(function (skill) {
    var tag = document.createElement('span');
    tag.className   = 'tag';
    tag.textContent = skill.trim();
    popupSkills.appendChild(tag);
  });

  popupModal.classList.add('open');
  document.body.style.overflow = 'hidden'; /* stop page from scrolling behind modal */
}

/* Clear and hide the modal */
function closePopup() {
  if (!popupModal) return;
  popupModal.classList.remove('open');
  if (popupBody) popupBody.classList.remove('layout-side'); /* reset layout for next open */
  popupImg.src = ''; /* release image from memory */
  document.body.style.overflow = '';
}

/* X button closes the modal */
if (closePopupBtn) {
  closePopupBtn.addEventListener('click', closePopup);
}

/* Clicking the dark overlay (outside the white box) closes it */
if (popupModal) {
  popupModal.addEventListener('click', function (event) {
    if (event.target === popupModal) {
      closePopup();
    }
  });
}

/* Escape key closes the modal */
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && popupModal && popupModal.classList.contains('open')) {
    closePopup();
  }
});
