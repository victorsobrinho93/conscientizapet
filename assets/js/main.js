const templatesCache = {};
const state = { home: true };

async function loadTemplate(name) {
    if (!templatesCache[name]) {
        const res = await fetch(`/templates/${name}.html`);
        const html = await res.text();
        templatesCache[name] = html;
    }
    return templatesCache[name];
}

async function render(page) {
    const main = document.querySelector("main");
    main.innerHTML = await loadTemplate(page);
}

const aboutBtn = document.getElementById("about-btn");

aboutBtn.addEventListener("click", () => {
    if (state.home) {
        state.home = false;
        render("about");
        aboutBtn.textContent = "PÁGINA INICIAL";
    } else {
        state.home = true;
        render("home");
        aboutBtn.textContent = "QUEM SOMOS";
    }
});

document.addEventListener("DOMContentLoaded", () => render("home"));
