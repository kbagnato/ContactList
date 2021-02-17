$(document).ready(function() {
	// set current navbar tab to 'active'
	let href = window.location.pathname;
	let links = $('.nav-link');
	if (href.search('mailer') > 0) {
		links[0].classList.add('active');
	}
	else {
		links[1].classList.add('active');
	}
});