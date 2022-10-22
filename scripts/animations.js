const faders = document.querySelectorAll('.fade-in');
const bottomSliders = document.querySelectorAll('.slide-in-bottom');
const leftSliders = document.querySelectorAll('.slide-in-left');
const rightSliders = document.querySelectorAll('.slide-in-right');

const options = {
	threshold: 0,
	rootMargin: '0px 0px -150px 0px',
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		}
		entry.target.classList.add('appear');
		appearOnScroll.unobserve(entry.target);
	});
}, options);

faders.forEach((fader) => {
	appearOnScroll.observe(fader);
});

bottomSliders.forEach((slider) => {
	appearOnScroll.observe(slider);
});

leftSliders.forEach((slider) => {
	appearOnScroll.observe(slider);
});

rightSliders.forEach((slider) => {
	appearOnScroll.observe(slider);
});
