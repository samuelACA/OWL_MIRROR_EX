// controls.js

import { addTokenToGroup, removeTokenFromGroup, updateTokenGroupVectors } from "./tokenManager.js";
import { syncTokenPositions } from "./sync.js";

/**
 * Adiciona controles de espelhamento ao menu de configuração do token.
 * @param {Object} token - O token selecionado.
 */
export function addMirrorControls(token) {
  const menu = document.getElementById("token-config-menu");
  if (!menu) return;

  // Criação do botão "Mirror"
  const mirrorButton = document.createElement("button");
  mirrorButton.textContent = "Mirror";
  mirrorButton.className = "mirror-button";
  
  // Adicionar evento ao botão "Mirror"
  mirrorButton.addEventListener("click", () => {
    handleMirrorButtonClick(token, mirrorButton);
  });

  menu.appendChild(mirrorButton);
}

/**
 * Lida com o clique no botão "Mirror".
 * @param {Object} token - O token inicial.
 * @param {HTMLButtonElement} mirrorButton - O botão clicado.
 */
function handleMirrorButtonClick(token, mirrorButton) {
  if (mirrorButton.textContent === "Mirror") {
    // Modo de seleção de outro token
    enableTokenSelection((selectedToken) => {
      if (!selectedToken) return;

      // Adicionar o token ao grupo de espelhamento
      addTokenToGroup(token, selectedToken);

      // Atualizar o botão
      mirrorButton.textContent = "Brake Mirror";
      addVectorControls(token, selectedToken);
    });
  } else {
    // Remover o token do grupo de espelhamento
    removeTokenFromGroup(token);

    // Atualizar o botão
    mirrorButton.textContent = "Mirror";
    removeVectorControls(token);
  }
}

/**
 * Habilita a seleção de outro token para espelhamento.
 * @param {Function} callback - Função chamada quando um token é selecionado.
 */
function enableTokenSelection(callback) {
  alert("Selecione um token para conectar ao espelhamento.");

  const handleTokenClick = (event) => {
    const selectedToken = getTokenFromEvent(event);
    document.removeEventListener("click", handleTokenClick);
    callback(selectedToken);
  };

  document.addEventListener("click", handleTokenClick);
}

/**
 * Adiciona controles de vetores ao menu de configuração do token.
 * @param {Object} token - O token inicial.
 * @param {Object} mirroredToken - O token espelhado.
 */
function addVectorControls(token, mirroredToken) {
  const menu = document.getElementById("token-config-menu");
  if (!menu) return;

  const vectorControls = document.createElement("div");
  vectorControls.className = "vector-controls";

  // Vetores X, Y e R
  ["x", "y", "r"].forEach((axis) => {
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = axis.toUpperCase();
    input.value = axis === "r" ? 1 : 0; // Valores padrão

    input.addEventListener("input", () => {
      const x = parseFloat(vectorControls.querySelector("input[placeholder='X']").value) || 0;
      const y = parseFloat(vectorControls.querySelector("input[placeholder='Y']").value) || 0;
      const r = parseFloat(vectorControls.querySelector("input[placeholder='R']").value) || 1;

      updateTokenGroupVectors(token, mirroredToken, { x, y, r });
      syncTokenPositions();
    });

    vectorControls.appendChild(input);
  });

  menu.appendChild(vectorControls);
}

/**
 * Remove os controles de vetores do menu de configuração do token.
 * @param {Object} token - O token para o qual os controles serão removidos.
 */
function removeVectorControls(token) {
  const menu = document.getElementById("token-config-menu");
  if (!menu) return;

  const vectorControls = menu.querySelector(".vector-controls");
  if (vectorControls) menu.removeChild(vectorControls);
}

/**
 * Obtém o token associado a um evento de clique.
 * @param {Event} event - O evento de clique.
 * @returns {Object|null} - O token associado ou null.
 */
function getTokenFromEvent(event) {
  const tokenElement = event.target.closest(".token");
  return tokenElement ? tokenElement.tokenData : null;
}
