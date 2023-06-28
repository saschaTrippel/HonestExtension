**HonestExtension**
=
<!--toc:start-->
- [About HonestExtension](#about-honestextension)
- [How to install HonestExtension](#how-to-install-honestextension)
  - [Permanently (default)](#permanently-default)
  - [Temporary](#temporary)
- [How to Use HonestExtension](#how-to-use-honestextension)
  - [Activate permissions:](#activate-permissions)
  - [Understand permissions:](#understand-permissions)
  - [Start collecting data:](#start-collecting-data)
  - [Browse the web:](#browse-the-web)
  - [Review collected data:](#review-collected-data)
- [For Developers](#for-developers)
  - [How to add a tracker](#how-to-add-a-tracker)
<!--toc:end-->

# About HonestExtension
HonestExtension is an open-source Firefox add-on that aims to enhance users' understanding of the security and privacy risks associated with browser extensions. 
It provides a unique browsing experience by tracking and presenting the user with their own browsing habits. 
The add-on allows users to customize the permissions they want to track or select preset options that emulate popular add-ons.

HonestExtension strictly prioritizes user privacy. 
It saves data only on the user's computer and does not store sensitive information such as passwords. 
Furthermore, the tracking feature can be easily turned off, and all data can be deleted at any time.

Browser extensions have become essential tools for enhancing web browsing experiences, offering features like content blocking and shopping discounts. 
However, extensions often require extensive permissions, which can lead to the collection of personal information, including browsing history and passwords. 
Research has shown that users often underestimate the implications of granting certain permissions to extensions, leaving their security and privacy at risk. 
Some extensions even leak personal information to third parties.

With HonestExtension, our primary objective is to help users comprehend the security and privacy risks associated with browser extensions. 
Upon installation, the extension gathers as much data as possible about the user's browsing habits and presents it to them. By visualizing the collected information, 
we believe users will become more aware of the permissions they grant to browser extensions and the potential risks to their security and privacy.

# How to install HonestExtension
## Permanently (default)
- Go to the [**store page**](https://addons.mozilla.org/de/firefox/addon/honest-extension/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)
- Click on *Add to Firefox*

## Temporary
Temporary add-ons will be automatically uninstalled when Firefox is closed.
* Download the extension code
* Open <about:debugging#/runtime/this-firefox> in Firefox
* Click on *Load Temporary Add-on*
* Load any file of the extension (e.g. the ```manifest.json``` file)
* Temporary extensions are removed when the browser is closed

# How to Use HonestExtension
## Activate permissions:
- Within the extension interface, you will find a list of permissions.
- Activate the permissions that you want to explore by toggling them on.
- Below is a selection of popular browser extensions as well as a list of your installed browser extensions.
You can select one of these browser extension to activate their permissions.

## Understand permissions:
- Hover over each permission to view a short explanation of what it entails.
- This will help you understand the purpose and implications of each permission.
- Note that "hidden permissions" refer to permissions that are not explicitly disclosed during installation or review.

## Start collecting data:
- Once you have selected the desired permissions, click on the "Collect Data" button.
- The extension will begin storing data based on the activated permissions.

## Browse the web:
- Use your web browser as you normally would for a few minutes.
- Visit different websites and engage in typical browsing activities.
  
## Review collected data:
- After your browsing session, open the HonestExtension again by clicking on its icon.
- Within the extension interface, you will see individual pages for each permission (indicated by a small arrow).
- Click on the arrow next to a permission to access the collected data associated with it.


# For Developers
## How to add a tracker
- Decide wheter your tracker has to run permanently in the background for instance to permanently listen for changes in the browser configuration, or if the tracker has to be executed when a web page is visited.
- If your tracker has to run permanently, create a background scirpt:
    1. Create a background script in the [**background**](background) directory.
    This scirpt implements the functionality of the tracker.
    2. Make sure the script only collects data when the user has activated the data collection, and when the user has given the required permissions.
    In contrast to content scripts, background scripts have to check this for themselves.
    To do so, use the ```active``` and the ```permissions``` fields in the local storage.
    You can use the ```isActive``` function and the ```hasPermissions``` function implemented in the setup scirpt, since they are callable in all background scirpts.
    If the scirpt implements an activate and a deactivate function, these can be called by the [**tracking handler scirpt**](background/handleTracker.js).
    3. Add the background script to the [**extension manifest**](./manifest.json), so that it executed when the extension is started.
    4. Add the required permissions of the tracker to the [**extension manifest**](./manifest.json).
- If your tracker is executed for each website, create a content script:
    1. Create a content script in the [**content**](content) directory.
    This scirpt implements the functionality of the tracker.
    2. Add the tracker to the [**tracking handler script**](background/handleTracker.js). This script activates or deactivates you content script when necessary.
    3. Add the required permissions of the tracker to the [**extension manifest**](./manifest.json).

