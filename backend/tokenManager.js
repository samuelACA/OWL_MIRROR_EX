import { applyMovementLogic } from './movementLogic.js';

const tokenGroups = new Map(); // Armazena os grupos de tokens e suas configurações de vetores

/**
 * Adiciona um token a um grupo específico, criando o grupo se necessário.
 * @param {string} leaderTokenId - ID do token que será referência inicial do grupo.
 * @param {string} targetTokenId - ID do token que será adicionado ao grupo.
 * @param {Object} vector - Vetor de movimento no formato { x, y, r }.
 */
export function addTokenToGroup(leaderTokenId, targetTokenId, vector) {
  if (!tokenGroups.has(leaderTokenId)) {
    tokenGroups.set(leaderTokenId, { tokens: new Map(), leaderTokenId });
  }

  const group = tokenGroups.get(leaderTokenId);
  group.tokens.set(targetTokenId, vector);
}

/**
 * Remove um token de seu grupo atual.
 * @param {string} tokenId - ID do token a ser removido.
 */
export function removeTokenFromGroup(tokenId) {
  for (const [leaderId, group] of tokenGroups.entries()) {
    if (group.tokens.has(tokenId)) {
      group.tokens.delete(tokenId);

      // Se o grupo não tiver mais tokens, removemos o grupo.
      if (group.tokens.size === 0) {
        tokenGroups.delete(leaderId);
      }
      return;
    }
  }
}

/**
 * Retorna o grupo ao qual o token pertence.
 * @param {string} tokenId - ID do token.
 * @returns {Object|null} O grupo do token ou null se não estiver em um grupo.
 */
export function getGroupForToken(tokenId) {
  for (const group of tokenGroups.values()) {
    if (group.tokens.has(tokenId)) {
      return group;
    }
  }
  return null;
}

/**
 * Processa o movimento de um token e aplica as regras do grupo.
 * @param {string} movedTokenId - ID do token que foi movido.
 * @param {Object} movement - Objeto contendo { x, y, r }.
 */
export function processTokenMovement(movedTokenId, movement) {
  const group = getGroupForToken(movedTokenId);
  if (!group) return; // Token não faz parte de um grupo

  for (const [tokenId, vector] of group.tokens.entries()) {
    if (tokenId === movedTokenId) continue; // Ignorar o token que iniciou o movimento

    const adjustedMovement = applyMovementLogic(movement, vector);
    updateTokenPosition(tokenId, adjustedMovement);
  }
}

/**
 * Atualiza a posição de um token (essa função seria conectada ao sistema de movimentação do Owlbear).
 * @param {string} tokenId - ID do token a ser atualizado.
 * @param {Object} movement - Objeto contendo { x, y, r }.
 */
function updateTokenPosition(tokenId, movement) {
  const tokenElement = document.querySelector(`[data-token-id="${tokenId}"]`);
  if (!tokenElement) return;

  const currentX = parseFloat(tokenElement.getAttribute('data-x')) || 0;
  const currentY = parseFloat(tokenElement.getAttribute('data-y')) || 0;
  const currentR = parseFloat(tokenElement.getAttribute('data-rotation')) || 0;

  tokenElement.setAttribute('data-x', currentX + movement.x);
  tokenElement.setAttribute('data-y', currentY + movement.y);
  tokenElement.setAttribute('data-rotation', currentR + movement.r);

  // Atualiza visualmente o token
  tokenElement.style.transform = `translate(${currentX + movement.x}px, ${currentY + movement.y}px) rotate(${currentR + movement.r}deg)`;
}

/**
 * Retorna todos os grupos de tokens (para fins de depuração ou administração).
 * @returns {Map} Um mapa de todos os grupos.
 */
export function getAllGroups() {
  return tokenGroups;
}
