import servicesData from "./data/services.js"
import reviews from "./data/reviews.js"

const backToTopButton=document.querySelector(".js-top-btn");
const hamburgerBtn=document.querySelector(".js-hamburger-btn");
const navList=document.querySelector(".js-nav-list");
const navItems=document.querySelectorAll(".js-nav-list-item");
const sections=document.querySelectorAll("main > section");
const navLinks=document.querySelectorAll(".js-nav-list a");
const slidesContainer = document.querySelector(".slide-container");
const fetchUrl = 'https://kreszacsgy.github.io/Chrissie-salon/data/reviews.json';
const modalSlidesContainer= document.querySelector(".scroll-image-container");
const modal=document.querySelector(".modal");
const modalTitle=document.querySelector(".modal-title");



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
      

// review slideshow

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

//create modal slides

function createModalSlides(service){
    return `
        <div class="slide">
            <img src="${service.pictureUrl}" alt="${service.text}">
            <p class="caption">${service.text}</p>
        </div>
    `;
};

//render modal slides

function renderModalSlides(services) {
modalSlidesContainer.innerHTML = services.map((service=> createModalSlides(service))).join('');
};

// find the correct pictures from the object

function getPicturesByType(obj,id) {
return obj.find(item => item.type === id);      
};

// get the result from the object

function getResult(id){
const result=getPicturesByType(servicesData,id);
renderModalSlides(result.pictures);
modalTitle.innerText=result.title;        
};

// open modal

function openModal() {
const opens=document.querySelectorAll(".services-item");
opens.forEach(open=>{open.addEventListener("click",(e) => {
    modal.classList.add("modal-active");
    const itemId=e.target.parentNode.id;
    getResult(itemId);
    clickSlides();
})});        
};

// close modal
  
function closeModal() {
    const close=document.querySelector(".modal-close");
    const modal=document.querySelector(".modal");
    close.addEventListener("click",()=> 
        modal.classList.remove("modal-active"));
};

// handle arrow direction

function handleClick(direction) {
    const item = document.querySelector(".slide");
    const itemWidth = item.offsetWidth;
    if(direction === "previous") {
        modalSlidesContainer.scrollBy({ left: -itemWidth, behavior: "smooth" });
    } else {
        modalSlidesContainer.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
};

// scroll in the modal with the arrows

function clickSlides() {
    const next=document.querySelector(".next");
    const prev=document.querySelector(".prev");
    next.addEventListener("click",()=>handleClick("next"));
    prev.addEventListener("click",()=>handleClick("previous"));
    
};

function clickModalButton() {
    const modalButton = document.querySelector(".modal-button");
    modalButton.addEventListener("click",()=> 
        modal.classList.remove("modal-active"));
}





scrollTopButtonVisibility();
hamburgerMenu();
pageNavigation();
renderSlides(reviews);
startSlideShow(reviews);
openModal();
closeModal();
clickModalButton();

