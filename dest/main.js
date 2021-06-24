let $carousel = $('.slider__image')
$carousel.flickity({
    cellAlign: 'left',
    contain: true,
    prevNextButtons: false,
    draggable: true,
    wrapAround: true,
    pageDots: false,
    autoPlay: true,
    lazyLoad: 2,
})

let flkty = new Flickity('.slider__image');

let progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.height = progress * 100 + '%';
});

let backToTop = document.querySelector('.btntop');

backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

// Back to Top
let positionSectionProduct = document.querySelector('.about1').offsetTop;
let positionFooter = document.querySelector('footer').offsetTop;
let header = document.querySelector('header')

window.addEventListener('scroll', function () {
    let positionScroll = this.window.pageYOffset;
    if (positionScroll > positionSectionProduct) {
        header.style.backgroundColor = 'rgba(11, 29, 38, 0.7)';
        header.style.paddingTop = '20px';
        header.style.paddingBottom = '20px';
    }
    if (positionScroll < positionSectionProduct) {
        header.style.backgroundColor = 'transparent';
        header.style.paddingTop = '60px';
    }
    if (positionScroll > positionSectionProduct - 500 && positionScroll < positionFooter + 100000) {
        backToTop.style.display = 'block'
    } else backToTop.style.display = 'none'
})

// Nav
const menuBtn = document.querySelector(".btnmenu");
const btn = document.querySelector(".menuButton")
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav ul li a");

menuBtn.addEventListener("click", function () {
    if (btn.classList.contains("clicked")) {
        btn.classList.remove("clicked");
        nav.classList.remove("open");
    } else {
        btn.classList.add("clicked");
        nav.classList.add("open");
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
        nav.classList.remove("open");
        btn.classList.remove("clicked");
    }
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const section = document.querySelector(
            `.${link.getAttribute("href").replace("#", "")}`
        );
        window.scrollTo({
            top:
                section.getBoundingClientRect().top + window.scrollY - header.offsetTop,
            behavior: "smooth",
        });
        nav.classList.remove("open");
        btn.classList.remove("clicked");
    });
});


// Scroll animation
function Utils() { }
Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();
$(window).on('load', addFadeIn());

$(window).scroll(function () {
    addFadeIn(false);
});

function addFadeIn(repeat) {
    var classToFadeIn = ".will-fadeIn";

    $(classToFadeIn).each(function (index) {
        var isElementInView = Utils.isElementInView($(this), false);
        if (isElementInView) {
            if (!($(this).hasClass('fadeInRight')) && !($(this).hasClass('fadeInLeft'))) {
                if (index % 2 == 0) $(this).addClass('fadeInRight');
                else $(this).addClass('fadeInLeft');
            }
        } else if (repeat) {
            $(this).removeClass('fadeInRight');
            $(this).removeClass('fadeInLeft');
        }
    });
}