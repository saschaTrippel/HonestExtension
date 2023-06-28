// Use the 'cookies' and '<all_urls>' permission to track cookies

/**
 * Save information of all cookies currently in the browser.
 */
async function saveAllCookies() {

	const cookiesCurrent = await browser.cookies.getAll({});
	// Dictionary domain: [list of cookie values]
	let cookies = {};
	const storage = await browser.storage.local.get();
	if (Object.keys(storage).includes("cookies")) {
		cookies = storage.cookies;
	}
	for (let cookie of cookiesCurrent) {
		addCookie(cookies, cookie);
	}
	browser.storage.local.set({cookies});
}

/**
 * Save information about newly added cookie.
 *
 * @param info information created by cookies.onChanged event
 */
async function saveNewCookie(info) {
	let cookies = {};
	const storage = await browser.storage.local.get();
	if (Object.keys(storage).includes("cookies")) {
		cookies = storage.cookies;
	}
	addCookie(cookies, info.cookie);
	browser.storage.local.set({cookies});
}

/**
 * Add cookie to list of known cookies, if it is not yet knwon.
 *
 * @param cookie Cookie to be added
 * @param cookies List of known cookies
 */
function addCookie(cookies, cookie) {
	// If domain is unknown, add empty list for domain
	if (! Object.keys(cookies).includes(cookie.domain)) {
		cookies[cookie.domain] = []
	}
	// If cookie is unknown, add to list of domain
	if (! cookies[cookie.domain].includes(cookie.value)) {
		cookies[cookie.domain].push(cookie.value);
	}
}

let activeCookies = false;
/**
 * Activate cookie tracker if 'cookies' and '<all_urls>'
 * permissions are given
 */
async function activateCookies() {
	if (await hasPermissions(["cookies", "<all_urls>"])) {
		saveAllCookies();
		browser.cookies.onChanged.addListener(saveNewCookie);
		activeCookies = true;
		console.log("Activated cookies tracker");
	}
}

/**
 * Deactivate cookie tracker if it is active.
 */
function deactivateCookies() {
	if (activeCookies) {
		browser.cookies.onChanged.removeListener(saveNewCookie);
		activeCookies = false;
		console.log("Deactivated cookies tracker");
	}
}
