const icon = document.querySelector('.icon-menu');
icon.addEventListener('click', () => {
	document.documentElement.classList.toggle('menu-open');
});