// Use the 'management' permission to track which extensions are installed

/**
 * Save information about all extensions currently installed.
 */
async function saveAllExtensions() {
	const currentExtensions = await browser.management.getAll();
	const storage = browser.storage.local.get();
	
	let extensions = [];
	if (Object.keys(storage).includes("extensions")) {
		extensions = storage.extensions;
	}

	for (let extension of currentExtensions) {
		addExtensionToList(extensions, extension)
	}
	browser.storage.local.set({extensions});
}

/**
 * Save information about newly installed extension.
 *
 * @param changes Information generated by management.onInstalled event
 */
async function saveNewExtension(changes) {
	if (changes.type == "extension") {
		const storage = browser.storage.local.get();

		let extensions = [];
		if (Object.keys(storage).includes("extensions")) {
			extensions = storage.extensions;
		}
		addExtensionToList(extensions, changes);
		browser.storage.local.set({extensions});
		console.info("Recorded installation of extension: " + changes.name);
	}
}

/**
 * Add extension to extensions list if it is unknown.
 *
 * @param extensions List of extensions
 * @param extension Extension to be added
 */
function addExtensionToList(extensions, extension) {
	if (extension.type == "extension" && !isExtensionKnown(extensions, extension)) {
		extensions.push({
			id: extension.id,
			name: extension.name,
		})
	}
}

/**
 * Check if extension is in list of extensions.
 *
 * @param extensions List of extensions
 * @param extension Extension to be checked
 * @return {Boolean} true if extension is in extensions list
 */
function isExtensionKnown(extensions, extension) {
	for (let knownExtension of extensions) {
		if (knownExtension.id == extension.id) {
			return true;
		}
	}
	return false;
}

let activeManagement = false;
/**
 * Activate extension tracker if 'management' permission is given.
 */
async function activateManagement() {
	if (await hasPermissions(["management"])) {
		saveAllExtensions();
		browser.management.onInstalled.addListener(saveNewExtension);
		activeManagement = true;
		console.log("Activated extension tracker");
	}
}

/**
 * Deactivate extension tracker if it is active.
 */
function deactivateManagement() {
	if (activeManagement) {
		browser.management.onInstalled.removeListener(saveNewExtension);
		activeManagement = false;
		console.log("Deactivated extension tracker");
	}
}
