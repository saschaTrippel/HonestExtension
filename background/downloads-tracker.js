// Uses 'downloads' permission to track downloads

/**
 * Save information about newly started download.
 *
 * @param info Information created by downloads.onCreated event
 */
async function saveNewDownloads(info){
    let downloads = [];
    const storage = await browser.storage.local.get();
    if (Object.keys(storage).includes("downloads")) {
        downloads = storage.downloads;
    }
    downloads.push({
        filename: info.filename,
        url: info.url,
        date: info.startTime
    })
    browser.storage.local.set({downloads});
}

/**
 * Save information about all downloads currently in downloads list.
 */
async function saveAllDownloads() {
    const currentDownloads = await browser.downloads.search({});
    let downloads = [];
    const storage = await browser.storage.local.get();
    if (Object.keys(storage).includes("downloads")) {
        downloads = storage.downloads;
    }
    for (const download of currentDownloads) {
        if (! isDownloadKnown(download, downloads)) {
            downloads.push({
                filename: download.filename,
                url: download.url,
                date: download.startTime
            });
        }
    }
    browser.storage.local.set({downloads});
}

/**
 * Check if download is already in donwloads list.
 *
 * @param download Download to check
 * @param downloads List of Downloads
 * @returns {Boolean} True is download is in downloads list
 */
function isDownloadKnown(download, downloads) {
    for (let knownD of downloads) {
        if (knownD.url == download.url) {
            return true;
        }
    }
    return false;
}


let activeDownloads = false;
/**
 * Activate downloads tracker if 'downloads' permission is given.
 */
async function activateDownloads() {
    if (await hasPermissions(["downloads"])) {
        saveAllDownloads();
        browser.downloads.onCreated.addListener(saveNewDownloads);
        activeDownloads = true;
        console.log("Activated downloads tracker");
    }
}

/**
 * Deactivate downloads tracker if it is active.
 */
function deactivateDownloads() {
    if (activeDownloads) {
        browser.downloads.onCreated.removeListener(saveNewDownloads);
        activeDownloads = false;
        console.log("Deactivated downloads tracker");
    }
}
