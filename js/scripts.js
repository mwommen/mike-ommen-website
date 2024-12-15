/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Dynamically set header background based on profile image
    const img = document.getElementById("profile-photo");
    const header = document.querySelector("header.masthead");

    if (img && header) {
        img.addEventListener("load", () => {
            const colorThief = new ColorThief();
            const dominantColor = colorThief.getColor(img);

            // Convert the color array to an RGB string
            const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

            // Apply the dominant color to the header background
            header.style.backgroundColor = rgbColor;

            // Optional gradient for a polished look
            header.style.backgroundImage = `linear-gradient(to bottom, rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.85), rgba(0, 0, 0, 0.85))`;
        });

        // If the image is cached and already loaded
        if (img.complete) {
            img.dispatchEvent(new Event("load"));
        }
    }

    // Medium Articles Fetching Logic
   
fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@Ommy5")
.then(response => response.json())
.then(data => {
    const container = document.getElementById("articles-container");

    // Clear out existing content first (if any)
    container.innerHTML = '';

    // Loop through the articles and render each one
    data.items.forEach(item => {
        const card = `
            <div class="col-lg-4 col-md-6">
                <div class="card">
                   
                        
                        <p class="card-text">${item.description ? item.description.substring(0, 100) + '...' : ''}</p>
                                                <h5 class="card-title">${item.title}</h5>
                                                <a href="${item.link}" target="_blank" class="btn">Read More</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;  // Add card to the container
    });
})
.catch(error => console.error('Error fetching Medium articles:', error));

  



});
