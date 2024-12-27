// effects.js

import { getMirrorGroup } from './tokenManager.js';

/**
 * Adds a blue highlight effect to all tokens in the same mirror group.
 * This effect is visible only to the Game Master.
 *
 * @param {Object} token - The token triggering the highlight.
 */
export function applyHighlightEffect(token) {
    if (!window.isGameMaster()) return; // Ensure only GM sees the highlight

    const group = getMirrorGroup(token.id);
    if (!group || group.length === 0) return;

    group.forEach((tokenId) => {
        const mirroredToken = window.map.getTokenById(tokenId);
        if (mirroredToken) {
            // Adding a CSS class to visually highlight the token
            addHighlightCSS(mirroredToken.element, 'mirror-highlight');
        }
    });
}

/**
 * Removes the blue highlight effect from all tokens in the same mirror group.
 *
 * @param {Object} token - The token triggering the removal of highlight.
 */
export function removeHighlightEffect(token) {
    if (!window.isGameMaster()) return; // Ensure only GM modifies highlight

    const group = getMirrorGroup(token.id);
    if (!group || group.length === 0) return;

    group.forEach((tokenId) => {
        const mirroredToken = window.map.getTokenById(tokenId);
        if (mirroredToken) {
            // Removing the CSS class to stop highlighting
            removeHighlightCSS(mirroredToken.element, 'mirror-highlight');
        }
    });
}

/**
 * Toggles the blue highlight effect based on token selection.
 *
 * @param {Object} token - The token being selected or deselected.
 * @param {boolean} isSelected - True if the token is being selected, false otherwise.
 */
export function toggleHighlightEffect(token, isSelected) {
    if (isSelected) {
        applyHighlightEffect(token);
    } else {
        removeHighlightEffect(token);
    }
}

/**
 * Adds a CSS class to an element for visual effects.
 *
 * @param {HTMLElement} element - The DOM element to apply the effect to.
 * @param {string} className - The CSS class for the effect.
 */
function addHighlightCSS(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

/**
 * Removes a CSS class from an element for visual effects.
 *
 * @param {HTMLElement} element - The DOM element to remove the effect from.
 * @param {string} className - The CSS class to remove.
 */
function removeHighlightCSS(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

// Add CSS styles for the highlight effect
const style = document.createElement('style');
style.textContent = `
    .mirror-highlight {
        border: 2px solid blue;
        box-shadow: 0 0 10px blue;
    }
`;
document.head.appendChild(style);
