// movementLogic.js

/**
 * Manages token movement and mirroring logic.
 * Responsible for applying transformations and ensuring proper synchronization of movements.
 */

// Store groups of tokens and their configurations
const tokenGroups = new Map(); // Map where key is token ID and value is group configuration

/**
 * Add a token to a mirroring group.
 * @param {string} tokenId - The ID of the token to add.
 * @param {Object} vectorConfig - The vector configuration for mirroring (e.g., { x: 1, y: -1, r: 1 }).
 * @param {string} groupId - The group ID to associate the token with.
 */
export function addTokenToGroup(tokenId, vectorConfig, groupId) {
    if (!tokenGroups.has(groupId)) {
        tokenGroups.set(groupId, []);
    }
    
    tokenGroups.get(groupId).push({ tokenId, vectorConfig });
}

/**
 * Remove a token from its mirroring group.
 * @param {string} tokenId - The ID of the token to remove.
 */
export function removeTokenFromGroup(tokenId) {
    for (const [groupId, tokens] of tokenGroups.entries()) {
        const index = tokens.findIndex(entry => entry.tokenId === tokenId);
        if (index !== -1) {
            tokens.splice(index, 1);
            if (tokens.length === 0) {
                tokenGroups.delete(groupId);
            }
            break;
        }
    }
}

/**
 * Handle token movement and apply transformations to mirrored tokens.
 * @param {string} movedTokenId - The ID of the token being moved.
 * @param {Object} newPosition - The new position of the moved token (e.g., { x: number, y: number, r: number }).
 */
export function handleTokenMovement(movedTokenId, newPosition) {
    for (const [groupId, tokens] of tokenGroups.entries()) {
        const group = tokens.find(entry => entry.tokenId === movedTokenId);
        if (group) {
            tokens.forEach(entry => {
                if (entry.tokenId !== movedTokenId) {
                    const mirroredPosition = applyVectorTransformation(newPosition, entry.vectorConfig);
                    updateTokenPosition(entry.tokenId, mirroredPosition);
                }
            });
            break;
        }
    }
}

/**
 * Apply the vector transformation to a position.
 * @param {Object} position - The original position (e.g., { x: number, y: number, r: number }).
 * @param {Object} vector - The vector configuration (e.g., { x: 1, y: -1, r: 1 }).
 * @returns {Object} - The transformed position.
 */
function applyVectorTransformation(position, vector) {
    return {
        x: position.x * vector.x,
        y: position.y * vector.y,
        r: position.r * vector.r
    };
}

/**
 * Update the position of a token on the board.
 * This function assumes integration with Owlbear's API or DOM structure.
 * @param {string} tokenId - The ID of the token to update.
 * @param {Object} position - The new position (e.g., { x: number, y: number, r: number }).
 */
function updateTokenPosition(tokenId, position) {
    // Implementation depends on Owlbear's API or DOM
    const tokenElement = document.querySelector(`[data-token-id="${tokenId}"]`);
    if (tokenElement) {
        tokenElement.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${position.r}deg)`;
    }
}
