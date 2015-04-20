export default class ServiceWorker {

	static hasSupport() {
		return ("serviceWorker" in navigator);
	}

	static hasControl() {
		return (!!navigator.serviceWorker.controller);
	}

	static register() {
		if (this.hasSupport()) {

			navigator.serviceWorker.register('service-worker.js', {scope: './'})
				.then(function(registration) {
					if (!navigator.serviceWorker.controller) {
						var helper = document.createElement("div");
						helper.classList.add("info-message");
						helper.textContent = "This app uses Service Workers. Reload this page in order to cache network operations";
						document.body.appendChild(helper);
					}
					
				});
		} 
	}
}

