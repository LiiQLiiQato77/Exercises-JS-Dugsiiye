const navLinks = document.querySelectorAll(".nav-link");

const menuBtn = document.querySelector(".menu-btn");

const navMenu = document.querySelector(".nav-links");



navLinks.forEach((link)=>{

    link.addEventListener("click",(event)=>{

        event.preventDefault();

        const section=link.dataset.section;

        document
        .getElementById(section)
        .scrollIntoView({

            behavior:"smooth"

        });

        localStorage.setItem("activePage",section);

        navLinks.forEach(nav=>nav.classList.remove("active"));

        link.classList.add("active");

        navMenu.classList.remove("active");

        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

    });
});


menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {

        menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    } else {

        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

    }

});



window.addEventListener("DOMContentLoaded", () => {
    const page = localStorage.getItem("activePage");

    if (page) {

        document.getElementById(page).scrollIntoView({
            behavior: "smooth"
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.dataset.section === page) {

                link.classList.add("active");

            }

        });

    }

});