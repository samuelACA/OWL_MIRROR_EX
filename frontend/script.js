// script.js - Entry point for the Owlbear Token Mirror extension
import { initializeSync } from './scripts/sync.js';
import { initializeMovementLogic } from './scripts/movementLogic.js';
import { initializeTokenManager } from './scripts/tokenManager.js';
import { initializeTokenMenu } from './scripts/tokenMenu.js';
import { initializeControls } from './scripts/controls.js';
import { initializeEffects } from './scripts/effects.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Owlbear Token Mirror Extension: Initializing...');

    try {
        // Inicializa o Token Manager
        initializeTokenManager();

        // Inicializa a lógica de movimento
        initializeMovementLogic();

        // Inicializa o menu de tokens
        initializeTokenMenu();

        // Inicializa os controles da interface
        initializeControls();

        // Inicializa os efeitos visuais
        initializeEffects();

        // Inicializa a sincronização de múltiplos usuários
        initializeSync();

        console.log('Owlbear Token Mirror Extension: Initialization complete.');
    } catch (error) {
        console.error('Erro durante a inicialização:', error);
    }
});
