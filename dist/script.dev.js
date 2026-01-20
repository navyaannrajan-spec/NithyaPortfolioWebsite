"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var nav = document.querySelector(".nav");
var navMenu = document.querySelector(".nav-items");
var btnToggleNav = document.querySelector(".menu-btn");
var workEls = document.querySelectorAll(".work-box");
var workImgs = document.querySelectorAll(".work-img");
var mainEl = document.querySelector("main");
var yearEl = document.querySelector(".footer-text span");

var toggleNav = function toggleNav() {
  nav.classList.toggle("hidden"); // Prevent screen from scrolling when menu is opened

  document.body.classList.toggle("lock-screen");

  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    // When menu is opened after transition change text respectively
    setTimeout(function () {
      btnToggleNav.textContent = "close";
    }, 475);
  }
};

btnToggleNav.addEventListener("click", toggleNav);
navMenu.addEventListener("click", function (e) {
  if (e.target.localName === "a") {
    toggleNav();
  }
});
document.body.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
}); // Animating work instances on scroll

workImgs.forEach(function (workImg) {
  return workImg.classList.add("transform");
});
var observer = new IntersectionObserver(function (entries) {
  var _entries = _slicedToArray(entries, 1),
      entry = _entries[0];

  var _Array$from = Array.from(entry.target.children),
      _Array$from2 = _slicedToArray(_Array$from, 2),
      textbox = _Array$from2[0],
      picture = _Array$from2[1];

  if (entry.isIntersecting) {
    picture.classList.remove("transform");
    Array.from(textbox.children).forEach(function (el) {
      return el.style.animationPlayState = "running";
    });
  }
}, {
  threshold: 0.3
});
workEls.forEach(function (workEl) {
  observer.observe(workEl);
}); // Toggle theme and store user preferred theme for future

var switchThemeEl = document.querySelector('input[type="checkbox"]');
var storedTheme = localStorage.getItem("theme");
switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;
switchThemeEl.addEventListener("click", function () {
  var isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
}); // Trap the tab when menu is opened

var lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');
document.body.addEventListener("keydown", function (e) {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
}); // Rotating logos animation

var logosWrappers = document.querySelectorAll(".logo-group");

var sleep = function sleep(number) {
  return new Promise(function (res) {
    return setTimeout(res, number);
  });
};

logosWrappers.forEach(function _callee(logoWrapper, i) {
  var logos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          logos = Array.from(logoWrapper.children);
          _context.next = 3;
          return regeneratorRuntime.awrap(sleep(1400 * i));

        case 3:
          setInterval(function () {
            var temp = logos[0];
            logos[0] = logos[1];
            logos[1] = logos[2];
            logos[2] = temp;
            logos[0].classList.add("hide", "to-top");
            logos[1].classList.remove("hide", "to-top", "to-bottom");
            logos[2].classList.add("hide", "to-bottom");
          }, 5600);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
yearEl.textContent = new Date().getFullYear(); // Smooth scroll for CV and Certificates sections

window.addEventListener("DOMContentLoaded", function () {
  var cvLink = document.querySelector('a[href="#cv"]');
  var certificatesLink = document.querySelector('a[href="#certificates"]');
  var cvSection = document.querySelector('#cv');
  var certificatesSection = document.querySelector('#certificates');

  if (cvLink && cvSection) {
    cvLink.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      cvSection.scrollIntoView({
        behavior: 'smooth'
      }); // Smooth scroll to the CV section
    });
  }

  if (certificatesLink && certificatesSection) {
    certificatesLink.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      certificatesSection.scrollIntoView({
        behavior: 'smooth'
      }); // Smooth scroll to the Certificates section
    });
  }
});
//# sourceMappingURL=script.dev.js.map
