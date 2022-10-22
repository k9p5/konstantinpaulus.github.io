const btn = document.getElementById("back-to-top-btn");

btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const img = document.getElementById('phone-demo');

if(window.innerWidth <= 620) {
    img.src = 'assets/phone-mobile.png'
} else {
    img.src = 'assets/phone-desktop.png'
}