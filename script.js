/* =========================================================
   ASWIN RAJ D PORTFOLIO
   JAVASCRIPT
========================================================= */


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");


if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("open");

        if (navMenu.classList.contains("open")) {

            menuButton.textContent = "✕";

        } else {

            menuButton.textContent = "☰";

        }

    });


    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

            menuButton.textContent = "☰";

        });

    });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progress = document.getElementById("progress");


function updateProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) {
        return;
    }

    const percentage =
        (scrollTop / documentHeight) * 100;

    if (progress) {

        progress.style.width =
            percentage + "%";

    }

}


window.addEventListener(
    "scroll",
    updateProgress,
    {
        passive: true
    }
);

updateProgress();


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.getElementById("cursorGlow");


if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
) {

    window.addEventListener(
        "mousemove",
        function (event) {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   CERTIFICATE FUNCTIONS
========================================================= */


/*
    OPEN CERTIFICATE
*/

function toggleCertificate(
    certificateId,
    button
) {

    const certificate =
        document.getElementById(certificateId);


    if (!certificate) {

        console.error(
            "Certificate not found:",
            certificateId
        );

        return;

    }


    const isCurrentlyOpen =
        certificate.classList.contains("show");


    /*
        Close every other certificate
    */

    const allViewers =
        document.querySelectorAll(
            ".certificate-viewer"
        );


    allViewers.forEach(function (viewer) {

        viewer.classList.remove("show");

    });


    /*
        Reset all buttons
    */

    const allButtons =
        document.querySelectorAll(
            ".certificate-button"
        );


    allButtons.forEach(function (item) {

        item.innerHTML =
            `
            Show Certificate
            <span>↓</span>
            `;

    });


    /*
        If it was closed,
        open it.
    */

    if (!isCurrentlyOpen) {

        certificate.classList.add("show");


        if (button) {

            button.innerHTML =
                `
                Hide Certificate
                <span>↑</span>
                `;

        }


        /*
            Scroll smoothly to
            the certificate.
        */

        setTimeout(function () {

            certificate.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }, 100);

    }

}


/*
    CLOSE CERTIFICATE
*/

function closeCertificate(
    certificateId
) {

    const certificate =
        document.getElementById(certificateId);


    if (!certificate) {
        return;
    }


    certificate.classList.remove("show");


    /*
        Find its parent card
    */

    const parent =
        certificate.closest(".certificate");


    if (parent) {

        const button =
            parent.querySelector(
                ".certificate-button"
            );


        if (button) {

            button.innerHTML =
                `
                Show Certificate
                <span>↓</span>
                `;

        }

    }

}


/* =========================================================
   NAVBAR BACKGROUND
========================================================= */

const navbar =
    document.querySelector(".navbar");


function updateNavbar() {

    if (!navbar) {
        return;
    }


    if (window.scrollY > 30) {

        navbar.style.background =
            "rgba(8,10,13,0.94)";

    } else {

        navbar.style.background =
            "rgba(8,10,13,0.82)";

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);

updateNavbar();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


const sectionObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.id;


                    navigationLinks.forEach(
                        function (link) {

                            link.style.color = "";


                            if (
                                link.getAttribute("href") ===
                                "#" + currentId
                            ) {

                                link.style.color =
                                    "var(--green)";

                            }

                        }
                    );

                }

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }

    );


sections.forEach(function (section) {

    sectionObserver.observe(section);

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (anchor) {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


/* =========================================================
   PROJECT PREVIEW TILT
========================================================= */

const projectPreviews =
    document.querySelectorAll(
        ".browser, .weather-preview"
    );


if (
    window.matchMedia("(pointer: fine)").matches
) {

    projectPreviews.forEach(function (preview) {

        preview.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    preview.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -2;


                const rotateY =
                    ((x - centerX) / centerX) * 2;


                preview.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-3px)
                    `;

            }
        );


        preview.addEventListener(
            "mouseleave",
            function () {

                preview.style.transform = "";

            }
        );

    });

}


/* =========================================================
   PAGE TITLE WHEN TAB CHANGES
========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden) {

            document.title =
                "Come back! | Aswin Raj D";

        } else {

            document.title =
                "Aswin Raj D | Developer Portfolio";

        }

    }
);