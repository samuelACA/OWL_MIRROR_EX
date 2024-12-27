// script.js - Entry point for the Owlbear Token Mirror extension
import { initializeSync } from './scripts/sync.js';
import { initializeMovementLogic } from './scripts/movementLogic.js';
import { initializeTokenManager } from './scripts/tokenManager.js';
import { initializeTokenMenu } from './scripts/tokenMenu.js';
import { initializeControls } from './scripts/controls.js';
import { initializeEffects } from './scripts/effects.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Owlbear Token Mirror Extension: Initializing...');

    // Step 1: Initialize Token Manager
    initializeTokenManager();

    // Step 2: Initialize Movement Logic
    initializeMovementLogic();

    // Step 3: Initialize Token Menu (for UI interaction)
    initializeTokenMenu();

    // Step 4: Initialize Controls (UI buttons and interactions)
    initializeControls();

    // Step 5: Initialize Effects (visual highlights and animations)
    initializeEffects();

    // Step 6: Initialize Sync (multi-user synchronization)
    initializeSync();

    console.log('Owlbear Token Mirror Extension: Initialization complete.');
});
