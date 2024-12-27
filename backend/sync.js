import { tokenGroups } from './movementLogic.js';

// Objeto para armazenar as conexões WebSocket (se houver mais de um cliente conectado).
const connections = [];

/**
 * Função para inicializar a sincronização de cenários e tokens.
 * Isso configura eventos para comunicação entre o cliente e o backend, garantindo que todos os movimentos
 * sejam sincronizados em tempo real.
 */
export function initializeSync() {
  // Simula uma conexão de WebSocket do Owlbear Rodeo (ou similar) para sincronizar os dados.
  const socket = new WebSocket('ws://localhost:8080');

  // Adiciona a nova conexão ao array de conexões.
  connections.push(socket);

  // Define eventos do WebSocket.
  socket.onopen = () => {
    console.log('Conexão WebSocket aberta para sincronização de tokens.');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'tokenMove') {
      // Aplica os movimentos recebidos aos tokens.
      applyTokenMovement(data.tokenId, data.newPosition);
    }
  };

  socket.onerror = (error) => {
    console.error('Erro no WebSocket:', error);
  };

  socket.onclose = () => {
    console.log('Conexão WebSocket encerrada.');
  };
}

/**
 * Envia atualizações de movimento de token para todos os clientes conectados.
 * @param {string} tokenId - O ID do token que foi movido.
 * @param {object} newPosition - A nova posição do token { x, y, r }.
 */
export function broadcastTokenMovement(tokenId, newPosition) {
  const message = JSON.stringify({
    type: 'tokenMove',
    tokenId,
    newPosition,
  });

  // Envia a mensagem para todos os clientes conectados.
  connections.forEach((socket) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  });
}

/**
 * Aplica movimentos de tokens em resposta a atualizações recebidas.
 * @param {string} tokenId - O ID do token a ser movido.
 * @param {object} newPosition - A nova posição do token { x, y, r }.
 */
function applyTokenMovement(tokenId, newPosition) {
  const tokenElement = document.querySelector(`[data-token-id="${tokenId}"]`);

  if (!tokenElement) return;

  // Atualiza as coordenadas e a rotação do token na interface.
  tokenElement.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px) rotate(${newPosition.r}deg)`;

  // Atualiza a lógica de espelhamento de movimento usando movementLogic.js.
  if (tokenGroups[tokenId]) {
    tokenGroups[tokenId].forEach((groupedToken) => {
      const vector = groupedToken.vector;
      const updatedPosition = {
        x: newPosition.x * vector.x,
        y: newPosition.y * vector.y,
        r: newPosition.r * vector.r,
      };
      applyTokenMovement(groupedToken.tokenId, updatedPosition);
    });
  }
}
