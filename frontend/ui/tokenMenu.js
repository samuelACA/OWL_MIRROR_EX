// tokenMenu.js - Gerencia o menu de tokens

export function initializeTokenMenu() {
    console.log("Token Menu: Inicializando...");

    // Simulação de inicialização do menu de tokens
    document.addEventListener('click', (event) => {
        const tokenMenu = document.getElementById('token-menu');

        // Exibe o menu se clicado (simulação para teste)
        if (event.target.classList.contains('token')) {
            tokenMenu.style.display = 'block'; // Exibe o menu (assumindo que já existe no HTML/CSS)
            console.log("Token Menu: Exibindo opções...");
        }
    });

    // Adiciona a nova opção "Criar Grupo"
    addGroupOption();
}

function addGroupOption() {
    // Seleciona o contêiner do menu
    const tokenMenu = document.getElementById('token-menu');

    if (tokenMenu) {
        // Cria o botão para "Criar Grupo"
        const groupButton = document.createElement('button');
        groupButton.id = 'create-group';
        groupButton.textContent = 'Criar Grupo';
        groupButton.style.marginTop = '10px'; // Adiciona um espaçamento para estética

        // Adiciona o botão ao menu
        tokenMenu.appendChild(groupButton);

        console.log("Token Menu: Opção 'Criar Grupo' adicionada.");
    } else {
        console.error("Token Menu: Elemento do menu não encontrado.");
    }
}
