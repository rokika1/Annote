// Dynamic import as a work-around for not supporting JS modules (ES6)
(async () => {
    const src = chrome.runtime.getURL('src/optionBar.js');
    await import(src);
})();
