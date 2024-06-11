// content.js

function addPasteListener() {
    const writeInp = document.querySelector('.write-inp');
    if (writeInp && !writeInp.hasListenerAttached) {
        writeInp.addEventListener('paste', function (event) {
            event.preventDefault();
            const text = (event.clipboardData || window.clipboardData).getData('text');
            document.execCommand('insertText', false, text);
        });
        writeInp.hasListenerAttached = true;  // Custom property to track if the listener is attached
    }
}

// Check if the element is available immediately
addPasteListener();

// If the element might be created dynamically, use a MutationObserver
const observer = new MutationObserver((mutations, observer) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            addPasteListener();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
