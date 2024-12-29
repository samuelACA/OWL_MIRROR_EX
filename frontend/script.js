// Aguarda até que a cena esteja disponível
async function waitForScene() {
    while (!window?.owlbear?.scene) {
        console.warn('Cena ainda não carregada. Aguardando...');
        await new Promise((resolve) => setTimeout(resolve, 100)); // Espera 100ms antes de tentar novamente
    }
    console.log('Cena carregada:', window.owlbear.scene);
    return window.owlbear.scene;
}

// Função principal de inicialização
async function initializeExtension() {
    console.log('Owlbear Token Mirror Extension: Inicializando...');

    try {
        // Aguarda a cena do Owlbear estar disponível
        const scene = await waitForScene();

        console.log('Cena disponível:', scene);

        // Passo 1: Inicializar gerenciador de tokens
        initializeTokenManager(scene);

        // Passo 2: Inicializar lógica de movimento
        initializeMovementLogic(scene);

        // Passo 3: Inicializar menu de tokens
        initializeTokenMenu(scene);

        // Passo 4: Inicializar controles (UI)
        initializeControls(scene);

        // Passo 5: Inicializar efeitos visuais
        initializeEffects(scene);

        // Passo 6: Inicializar sincronização
        initializeSync(scene);

        console.log('Owlbear Token Mirror Extension: Inicialização completa.');
    } catch (error) {
        console.error('Erro durante a inicialização da extensão:', error);
    }
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initializeExtension();
});
