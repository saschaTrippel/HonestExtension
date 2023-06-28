// Use hostpermission '<all_urls>' to track username and password
// TODO: not able to track credentials for all sites e.g. Google does not work

/**
 * Record information about credentials (username, password) entered into forms
 */
function trackCredentials() {
	// Get all forms
	const forms = document.forms;
	for (let form of forms) {
		// Check if form contains username or password input
		const passwordFields = form.querySelectorAll('input[type=password]');

		// Collect login fields
		let tmp = []
		let usernameFields = tmp.concat(
			Array.from(form.querySelectorAll('input[autocomplete=username]')),
			Array.from(form.querySelectorAll('input[type=email]')),
			Array.from(form.querySelectorAll('input[name=email]')),
			Array.from(form.querySelectorAll('input[name=username]')),
			Array.from(form.querySelectorAll('input[name=Username]')),
			Array.from(form.querySelectorAll('input[name=userLoginId]'))
		);
		
		// Collect submit buttons
		let submitButtons = tmp.concat(
			Array.from(form.querySelectorAll('input[type=submit]')),
			Array.from(form.querySelectorAll('button'))
		);

		// Create handler function which has correct password and username fields in its environment
		let eventHandler = function (passwordFields, usernameFields) {
			// Function that actualy reads the credentials
			return async function()  {
				// Search for username
				let username = false;
				for (let usernameField of usernameFields) {
					if (usernameField.value != "") {
						username = usernameField.value;
						break;
					}
				}

				// Search for password
				let password = false;
				for (let passwordField of passwordFields) {
					if (passwordField.value != "") {
						password = true;
						break;
					}
				}

				// Store learned data
				if (username != false || password) {
					const storage = await browser.storage.local.get();
					let credentials = [];
					if (Object.keys(storage).includes("credentials")) {
						credentials = storage.credentials;
					}
					credentials.push({
						hostname: window.location.hostname,
						username: username,
						password: password,
					});
					browser.storage.local.set({credentials});
				}
			};
		};

		if ((passwordFields.length > 0 || usernameFields.length > 0) && submitButtons.length > 0) {
			// Form contains a username or a password field, attach function to read when submit button is clicked
			for (let submitButton of submitButtons) {
				submitButton.addEventListener("click", eventHandler(passwordFields, usernameFields));
			}
		}
	}
}

trackCredentials();
