chrome.runtime.onInstalled.addListener(() => {});
chrome.action.onClicked.addListener(async (tab) => {
  if (
    tab.url.startsWith("https://twitter.com/") &&
    tab.url.endsWith("following")
  ) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "OFF" ? "ON" : "OFF";

    await chrome.scripting.insertCSS({
      files: ["style.css"],
      target: { tabId: tab.id },
    });
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["./scripts/content.js"],
      })
      .then(() => console.log("Starting the process.."));
  } else console.log("You must be on your following page");
});
