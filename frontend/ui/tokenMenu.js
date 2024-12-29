// tokenMenu.js - Gerencia o menu de tokens

export function initializeTokenMenu() {
    console.log("Token Menu: Inicializando...");

    // Simulação de inicialização do menu de tokens
    document.addEventListener('click', (event) => {
        const tokenMenu = document.getElementById('token-menu');

        // Exibe o menu se clicado em um token (simulação para teste)
        if (event.target.classList.contains('token')) {
            const rect = event.target.getBoundingClientRect();
            // Posiciona o menu próximo ao token
            tokenMenu.style.left = `${rect.left}px`;
            tokenMenu.style.top = `${rect.bottom}px`;
            tokenMenu.style.display = 'block'; // Exibe o menu

            console.log("Token Menu: Exibindo opções...");
        } else {
            // Fecha o menu se clicar fora
            const tokenMenu = document.getElementById('token-menu');
            if (tokenMenu.style.display === 'block' && !tokenMenu.contains(event.target)) {
                tokenMenu.style.display = 'none';
            }
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

        // Lógica para o clique do botão "Criar Grupo"
        groupButton.addEventListener('click', () => {
            console.log("Grupo criado!");
            // Aqui você pode adicionar a lógica de criação do grupo, dependendo da sua aplicação
        });

        console.log("Token Menu: Opção 'Criar Grupo' adicionada.");
    } else {
        console.error("Token Menu: Elemento do menu não encontrado.");
    }
}
