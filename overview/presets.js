let preset = {}

function fillTopPresets() {
	preset["uBlockOrigin"] = [
		"dns",
		"menus",
		"privacy",
		"storage",
		"tabs",
		"unlimitedStorage",
		"webNavigation",
		"webRequest",
		"webRequestBlocking",
		"<all_urls>"
	];
	preset["adBlockerUltimate"] = [
		"tabs",
		"<all_urls>",
		"webRequest",
		"webRequestBlocking",
		"webNavigation",
		"storage",
		"unlimitedStorage",
		"contextMenus"
	];
	preset["honey"] = [
		"storage",
		"webRequest",
		"webRequestBlocking",
		"<all_urls>"
	];
	preset["easyScreenshot"] = [
		"<all_urls>",
		"clipboardWrite",
		"downloads",
		"notifications",
		"storage"
	]
	preset["toGoogleTranslate"] = [
		"<all_urls>",
		"contextMenus",
		"storage",
		"webRequest",
		"webRequestBlocking",
		"tabs"
	]
}

async function fillInstalledPresets() {
	function filterExtension(extension) {
		return extension.type == "extension";
	}
	let extensions = await browser.management.getAll();
	extensions = extensions.filter(filterExtension);
	
	// Add permissions to presets
	for (let extension of extensions) {
		let tmp = extension.permissions;
		tmp.push.apply(tmp, extension.hostPermissions);
		// Cannot simulate all host permissions, just <all_urls>, add that if something similar is granted
		if (tmp.includes("http://*/*") || tmp.includes("https://*/*") || tmp.includes("http://*") || tmp.includes("https://*")) {
			tmp.push("<all_urls>");
		}
		preset[extension.name] = tmp;
	}

	// Add extensions to list
	const installedGroup = document.getElementById("extension-selection-installed");
	for (let extension of extensions) {
		installedGroup.innerHTML += '<option label="' + extension.name + '">' + extension.name + '</option>'
	}
}

async function setPresetPermissions(select) {
	// User selected a preset, save the permissions
	// of the selected extension an update UI
	
	const extension = select.target.value;
	let permissions = [];
	if (Object.keys(preset).includes(extension)) {
		permissions = preset[extension];
	}

	if (permissions != []) {
		browser.storage.local.set({permissions});
		const storage = browser.storage.local.get();
		storage.then(updateUI, onError);
	}
}

fillTopPresets();
fillInstalledPresets();

const extensionSelection = document.querySelector("#extension-selection");
extensionSelection.addEventListener("change", setPresetPermissions);
