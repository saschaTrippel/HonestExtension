function listPermissions(storage) {
	const permissions = storage.permissions;
	const permList = document.getElementById("permissions-list");
	for (let permission of permissions) {
		permList.innerHTML += "<li>";
		permList.innerHTML += permission;
		permList.innerHTML += "</li>";
	}
}

function listBrowsingHistory(storage) {
	if (Object.keys(storage).includes("history")) {
		const history = storage.history;
		const historyList = document.getElementById("history-list");
		for (let entry of history) {
			historyList.innerHTML += "<li> <a href='" + entry.url + "'>" + entry.hostname + "</a> " + Date(entry.date) + "</li>";
		}
	}
}

function listBookmarks(storage) {
	if (Object.keys(storage).includes("bookmarks")) {
		const bookmarks = storage.bookmarks;
		const bookmarksList = document.getElementById("bookmarks-list");
		for (let bookmark of bookmarks) {
			bookmarksList.innerHTML += "<li><a href='" + bookmark.url + "'>" + bookmark.title + "</a></li>";
		}
	}
}

function listDownloads(storage) {
	if (Object.keys(storage).includes("downloads")) {
		const downloads = storage.downloads;
		const downloadsList = document.getElementById("downloads-list");
		for (let download of downloads) {
			downloadsList.innerHTML += "<li>" + "Name:" + download.filename + "</li>"
		}
	}
}

function listCredentials(storage) {
	if (Object.keys(storage).includes("credentials")) {
		const credentials = storage.credentials;
		const credentialsList = document.getElementById("credentials-list");
		for (let credential of credentials) {
			credentialsList.innerHTML += "<li>" + credential.hostname + ": username = '" + credential.username + "' able to learn password = " + credential.password + "</li>"
		}
	}
}

function listGeolocations(storage) {
	if (Object.keys(storage).includes("geolocations")) {
		const geolocations = storage.geolocations;
		const geolocationsList = document.getElementById("geolocations-list");
		for (let geolocation of geolocations) {
			geolocationsList.innerHTML += "<li>" + Date(geolocation.timestamp) + ": <a href='https://www.openstreetmap.org/#map=18/" + geolocation.latitude + "/" + geolocation.longitude + "'>Latitude: " + geolocation.latitude + " Longitude: " + geolocation.longitude + "</a>";
		}
	}
}


const gettingStorage = browser.storage.local.get()

gettingStorage.then(listPermissions);
gettingStorage.then(listBrowsingHistory);
gettingStorage.then(listBookmarks);
gettingStorage.then(listDownloads);
gettingStorage.then(listCredentials);
gettingStorage.then(listGeolocations);
