// Use the 'tabs' permission to track the language of websites and browsing history

/**
 * Save the language of a website.
 */
async function recordLanguage() {
	const language = await browser.tabs.detectLanguage();
	if (language && language != "und") {
		let languages = new Object();
		const storage = await browser.storage.local.get();
		if (Object.keys(storage).includes("languages")) {
			languages = storage.languages;
		}
		console.info("Language detected: " + language);
		if (Object.keys(languages).includes(language)) {
			languages[language]++;
		} else {
			languages[language] = 1;
		}
		browser.storage.local.set({languages});
	}
}

/**
 * Save information about the website loaded in the tab with the ID tabId.
 *
 * @param tabId ID of the tab to record.
 */
async function recordTabHistory(tabId) {
	// Collect browsing history through 'tabs' permission
	const tab = await browser.tabs.get(tabId);

	if (tab.url != "about:blank") {
		const storage = await browser.storage.local.get();
		let tabsHistory = [];
		if (Object.keys(storage).includes("tabsHistory")) {
			tabsHistory = storage.tabsHistory;
		}
		tabsHistory.push({
			title: tab.title,
			url: tab.url,
			date: Date.now()
		});
		browser.storage.local.set({tabsHistory});
	}
}

let activeLanguage = false;
let activeTabsHistory = false;
/**
 * Activates language tracker.
 * Activates tabs history tracker if 'tabs' or 'activeTab' permission is given.
 */
async function activateTabs() {
	const filter = {
		urls: ["<all_urls>"],
		properties: ["url"]
	};
	browser.tabs.onUpdated.addListener(recordLanguage);
	activeLanguage = true;
	console.log("Activated language tracker")
	if (await hasPermissions(["tabs"]) || await hasPermissions(["activeTab"])) {
		browser.tabs.onUpdated.addListener(recordTabHistory, filter);
		activeTabsHistory = true;
		console.log("Activated tabs history tracker")
	}
}

/**
 * Deactivate tabs tracker if active.
 */
async function deactivateTabs() {
	if (activeLanguage) {
		browser.tabs.onUpdated.removeListener(recordLanguage);
		activeLanguage = false;
		console.log("Deactivated language tracker")
	}
	if (activeTabsHistory) {
		browser.tabs.onUpdated.removeListener(recordTabHistory);
		activeTabsHistory = false;
		console.log("Deactivated tabs history tracker tracker")
	}
}
