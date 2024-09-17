"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToClipboard = void 0;
var fallback = function (text) {
    var previousFocusElement = document.activeElement;
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.visibility = 'hidden';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    console.log(document);
    document.execCommand('copy');
    document.body.removeChild(textArea);
    if (previousFocusElement) {
        previousFocusElement.focus();
    }
};
var copyToClipboard = function (text) {
    if (!navigator.clipboard)
        return fallback(text);
    navigator.clipboard.writeText(text).catch(function () { return fallback(text); });
};
exports.copyToClipboard = copyToClipboard;
