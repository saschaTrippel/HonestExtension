// Use hostpermission '<all_urls>' to track browsing history

/**
 * Save information about the website this script is injected to.
 */
async function historyTracker() {
	// Add visited websites to browsing history
	let history = [];
	const storage = await browser.storage.local.get();
	if (Object.keys(storage).includes("history")) {
		history = storage.history;
	}
	const windowLocation = window.location;
	if (windowLocation.hostname != "") {
		history.push({
			hostname: windowLocation.hostname,
			url: windowLocation.href,
			date: Date.now()
		});
		browser.storage.local.set({history});
	}
}

historyTracker();
