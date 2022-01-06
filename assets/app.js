const btn = document.getElementById("back-to-top-btn");

btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});