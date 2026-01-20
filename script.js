const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

const toggleBtn = document.getElementById("chatbot-toggle");
const chatBox = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chatbot-messages");


const toggleNav = () => {
    nav.classList.toggle("hidden");

    // Prevent screen from scrolling when menu is opened
    document.body.classList.toggle("lock-screen");

    if (nav.classList.contains("hidden")) {
        btnToggleNav.textContent = "menu";
    } else {
        // When menu is opened after transition change text respectively
        setTimeout(() => {
            btnToggleNav.textContent = "close";
        }, 475);
    }
};

btnToggleNav.addEventListener("click", toggleNav);

navMenu.addEventListener("click", (e) => {
    if (e.target.localName === "a") {
        toggleNav();
    }
});

document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !nav.classList.contains("hidden")) {
        toggleNav();
    }
});

// Animating work instances on scroll
workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
    (entries) => {
        const [entry] = entries;
        const [textbox, picture] = Array.from(entry.target.children);
        if (entry.isIntersecting) {
            picture.classList.remove("transform");
            Array.from(textbox.children).forEach(
                (el) => (el.style.animationPlayState = "running")
            );
        }
    }, { threshold: 0.3 }
);

workEls.forEach((workEl) => {
    observer.observe(workEl);
});

// Toggle theme and store user preferred theme for future
const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
    const isChecked = switchThemeEl.checked;

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
});

// Trap the tab when menu is opened
const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
        e.preventDefault();
        btnToggleNav.focus();
    }
});

// Rotating logos animation
const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async(logoWrapper, i) => {
    const logos = Array.from(logoWrapper.children);
    await sleep(1400 * i);
    setInterval(() => {
        let temp = logos[0];
        logos[0] = logos[1];
        logos[1] = logos[2];
        logos[2] = temp;
        logos[0].classList.add("hide", "to-top");
        logos[1].classList.remove("hide", "to-top", "to-bottom");
        logos[2].classList.add("hide", "to-bottom");
    }, 5600);
});

yearEl.textContent = new Date().getFullYear();

// Smooth scroll for CV and Certificates sections
window.addEventListener("DOMContentLoaded", function() {
    const cvLink = document.querySelector('a[href="#cv"]');
    const certificatesLink = document.querySelector('a[href="#certificates"]');
    const cvSection = document.querySelector('#cv');
    const certificatesSection = document.querySelector('#certificates');

    if (cvLink && cvSection) {
        cvLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            cvSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the CV section
        });
    }

    if (certificatesLink && certificatesSection) {
        certificatesLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            certificatesSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the Certificates section
        });
    }
});


toggleBtn.onclick = () => chatBox.style.display = "flex";
closeBtn.onclick = () => chatBox.style.display = "none";

sendBtn.onclick = async () => {
  const text = userInput.value;
  if (!text) return;

  messages.innerHTML += `<p style="background:#ff6a00;color:white;padding:10px;border-radius:12px;align-self:flex-end;">${text}</p>`;
  userInput.value = "";

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    const reply = data.reply || "Sorry, something went wrong.";

    messages.innerHTML += `<p style="background:white;color:black;padding:10px;border-radius:12px;">${reply}</p>`;
  } catch (error) {
    messages.innerHTML += `<p style="color:red;">Server error. Try again.</p>`;
  }
};
