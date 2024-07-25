const backToTopButton=document.querySelector(".js-top-btn");
const hamburgerBtn=document.querySelector(".js-hamburger-btn");
const navList=document.querySelector(".js-nav-list");
const navItems=document.querySelectorAll(".js-nav-list-item");
const sections=document.querySelectorAll("main > section");
const navLinks=document.querySelectorAll(".js-nav-list a");
const slidesContainer = document.querySelector(".slide-container");
const fetchUrl = 'https://kreszacsgy.github.io/Chrissie-salon/data/reviews.json';

//scroll top button

function scrollTopButtonVisibility() {
    window.addEventListener('scroll', () => {

        if (window.scrollY > 100) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    );
};

//hamburger menu

function hamburgerMenu() {

    hamburgerBtn.addEventListener("click", () => {
        navList.classList.toggle("nav-active");
        hamburgerBtn.classList.toggle("hamburger-active");
    });

    navItems.forEach((navItem) => {
        navItem.addEventListener("click", () => {
            navList.classList.remove("nav-active");
            hamburgerBtn.classList.remove("hamburger-active");
        })
    });

    document.addEventListener("click", (e) => {
        if(!navList.contains(e.target) && !hamburgerBtn.contains(e.target)){
        navList.classList.remove("nav-active");
        hamburgerBtn.classList.remove("hamburger-active");
        }
    });
};

//navbar link stays highlighted 

function pageNavigation() {
    window.addEventListener("scroll",()=>{
        let current="";
        sections.forEach( section=> {
            const sectionTop=section.offsetTop;            
            const sectionHeight=section.clientHeight;            
            if(scrollY >= (sectionTop-sectionHeight/3)){
            current=section.getAttribute("id");
            }            
        })
        navLinks.forEach (link =>
            {link.classList.remove("active");
            if (link.classList.contains(current)){
                link.classList.add("active");
            }
        });
    });
};

// fetch reviews

async function fetchReviews() {
    try {
        const response = await fetch(fetchUrl);
        const reviews = await response.json();
        renderSlides(reviews);
        startSlideShow(reviews);

    } catch (err) {
        console.error(err);
    };
};

function createStars(productRating) {
    let rating = productRating; 
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
        if (rating > 0) {
            starsHTML += `<i class="fa-solid fa-star"></i>`
            rating--
        } else {
            starsHTML += ` <i class="fa-regular fa-star"></i>`
        }
    };
    return starsHTML;
};

// create review cards

function createReviewCards(review) {
    const starsHTML= createStars(review.stars);
    return `
        <div class="mySlides">
            <div class="text">
                <div class="stars">${starsHTML}</div>
                <i class="fa-solid fa-quote-right"></i>                
                <h3 class="customerName">${review.name}</h3>
                <p>${review.text}</p>
            </div>
        </div>
    `;
};


// render review slides

function renderSlides(reviews) {
    slidesContainer.innerHTML = reviews.map((review => createReviewCards(review))).join('');};
      

// slideshow

function startSlideShow(reviews) {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.mySlides');

    slides[currentIndex].classList.add('active');
    setInterval(() => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % reviews.length;
        slides[currentIndex].classList.add('active');
    }, 4000);
};

scrollTopButtonVisibility();
hamburgerMenu();
pageNavigation();
fetchReviews()
