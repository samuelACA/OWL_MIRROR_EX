// tokenMenu.js

import { createMirrorGroup, breakMirrorGroup, getMirrorGroup } from './tokenManager.js';
import { applyHighlightEffect, removeHighlightEffect } from './effects.js';

/**
 * Adds mirror-related options to the token's context menu.
 *
 * @param {Object} token - The token whose menu is being customized.
 * @param {Array} menuItems - The current menu items for the token.
 */
export function extendTokenMenu(token, menuItems) {
    const mirrorGroup = getMirrorGroup(token.id);

    if (mirrorGroup) {
        // If the token is already part of a mirror group, show "Break Mirror"
        menuItems.push({
            label: 'Break Mirror',
            icon: '🔗', // Icon for breaking the mirror group
            action: () => handleBreakMirror(token),
        });
    } else {
        // If the token is not in a group, show "Mirror"
        menuItems.push({
            label: 'Mirror',
            icon: '🪞', // Icon for mirroring
            action: () => handleCreateMirror(token),
        });
    }

    // Always add a visual indicator toggle for the GM
    if (window.isGameMaster()) {
        menuItems.push({
            label: 'Highlight Mirror Group',
            icon: '💡',
            action: () => toggleHighlightGroup(token),
        });
    }
}

/**
 * Handles the creation of a mirror group for the token.
 *
 * @param {Object} token - The token being mirrored.
 */
function handleCreateMirror(token) {
    window.showMessage('Select another token to mirror this token’s movement.');
    
    // Wait for the user to select a second token
    const onTokenSelect = (event) => {
        const targetToken = event.detail.token;

        if (targetToken.id === token.id) {
            window.showMessage('Cannot mirror the token to itself.');
            return;
        }

        // Create the mirror group
        createMirrorGroup(token.id, targetToken.id);
        window.showMessage('Mirror group created successfully.');

        // Clean up the event listener
        document.removeEventListener('tokenSelected', onTokenSelect);
    };

    document.addEventListener('tokenSelected', onTokenSelect);
}

/**
 * Handles breaking a mirror group for the token.
 *
 * @param {Object} token - The token whose mirror group is being broken.
 */
function handleBreakMirror(token) {
    const mirrorGroup = getMirrorGroup(token.id);

    if (!mirrorGroup) {
        window.showMessage('This token is not part of a mirror group.');
        return;
    }

    // Break the mirror group
    breakMirrorGroup(token.id);
    window.showMessage('Mirror group removed successfully.');
}

/**
 * Toggles the highlight effect for all tokens in the same mirror group.
 *
 * @param {Object} token - The token whose group should be highlighted.
 */
function toggleHighlightGroup(token) {
    const group = getMirrorGroup(token.id);
    if (!group) {
        window.showMessage('This token is not part of a mirror group.');
        return;
    }

    // Highlight or remove highlight effect for the mirror group
    group.forEach((tokenId) => {
        const targetToken = window.map.getTokenById(tokenId);
        if (targetToken) {
            applyHighlightEffect(targetToken);
        }
    });
}

/**
 * Integrates the extension with the Owlbear Rodeo context menu system.
 */
export function integrateTokenMenu() {
    const originalMenuHandler = window.map.tokenMenuHandler;

    // Extend the existing menu handler
    window.map.tokenMenuHandler = (token, menuItems) => {
        originalMenuHandler(token, menuItems);
        extendTokenMenu(token, menuItems);
    };
}

// Initialize the token menu integration
integrateTokenMenu();
