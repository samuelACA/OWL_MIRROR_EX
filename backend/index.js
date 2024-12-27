// index.js - Entry point of the extension

// Wait until the Owlbear Rodeo environment is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Mirror Movement Extension loaded.");

    // Hook into the Owlbear Rodeo interface
    initializeExtension();
});

function initializeExtension() {
    // Add listeners for token context menus to insert the "Mirror" button
    observeTokenContextMenu();

    // Set up data structures to manage mirrored groups
    window.mirrorGroups = {}; // { groupId: { tokens: [], vectors: [] } }

    console.log("Extension initialized and ready.");
}

function observeTokenContextMenu() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const addedNodes = mutation.addedNodes;

            addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.classList.contains("context-menu")) {
                    enhanceContextMenu(node);
                }
            });
        });
    });

    // Observe the entire document for context menus
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

function enhanceContextMenu(contextMenu) {
    // Check if it's a token menu
    const tokenElement = contextMenu.closest("[data-token-id]");
    if (!tokenElement) return;

    const tokenId = tokenElement.dataset.tokenId;

    // Add the "Mirror" or "Break Mirror" option to the menu
    const mirrorOption = document.createElement("div");
    mirrorOption.className = "context-menu-item";
    mirrorOption.textContent = window.mirrorGroups[tokenId] ? "Break Mirror" : "Mirror Movement";

    mirrorOption.addEventListener("click", () => {
        if (window.mirrorGroups[tokenId]) {
            breakMirror(tokenId);
        } else {
            startMirrorConfiguration(tokenId);
        }
        contextMenu.remove(); // Close the menu
    });

    contextMenu.appendChild(mirrorOption);
}

function startMirrorConfiguration(tokenId) {
    console.log(`Starting mirror configuration for token ${tokenId}`);

    // Highlight token and wait for another selection
    highlightToken(tokenId);
    window.selectedMirrorToken = tokenId;

    document.addEventListener("click", handleMirrorSelection);
}

function handleMirrorSelection(event) {
    const tokenElement = event.target.closest("[data-token-id]");

    if (tokenElement) {
        const targetTokenId = tokenElement.dataset.tokenId;

        if (targetTokenId !== window.selectedMirrorToken) {
            console.log(`Linking ${window.selectedMirrorToken} to ${targetTokenId}`);
            createMirrorLink(window.selectedMirrorToken, targetTokenId);

            // Reset highlight and clean up
            removeHighlight(window.selectedMirrorToken);
            window.selectedMirrorToken = null;
            document.removeEventListener("click", handleMirrorSelection);
        }
    }
}

function createMirrorLink(sourceTokenId, targetTokenId) {
    console.log(`Creating mirror link between ${sourceTokenId} and ${targetTokenId}`);

    // Assign both tokens to a new or existing group
    let groupId = Object.keys(window.mirrorGroups).find((id) =>
        window.mirrorGroups[id].tokens.includes(sourceTokenId)
    );

    if (!groupId) {
        groupId = `group-${Date.now()}`;
        window.mirrorGroups[groupId] = { tokens: [], vectors: [] };
    }

    if (!window.mirrorGroups[groupId].tokens.includes(targetTokenId)) {
        window.mirrorGroups[groupId].tokens.push(targetTokenId);
        window.mirrorGroups[groupId].tokens.push(sourceTokenId);
        window.mirrorGroups[groupId].vectors.push({ x: 1, y: 1, r: 1 });
    }

    console.log("Mirror group updated:", window.mirrorGroups[groupId]);
}

function breakMirror(tokenId) {
    console.log(`Breaking mirror for token ${tokenId}`);

    // Remove token from its mirror group
    const groupId = Object.keys(window.mirrorGroups).find((id) =>
        window.mirrorGroups[id].tokens.includes(tokenId)
    );

    if (groupId) {
        window.mirrorGroups[groupId].tokens = window.mirrorGroups[groupId].tokens.filter(
            (id) => id !== tokenId
        );

        // If the group is empty, delete it
        if (window.mirrorGroups[groupId].tokens.length === 0) {
            delete window.mirrorGroups[groupId];
        }
    }

    console.log("Mirror groups updated:", window.mirrorGroups);
}

function highlightToken(tokenId) {
    const tokenElement = document.querySelector(`[data-token-id="${tokenId}"]`);
    if (tokenElement) {
        tokenElement.classList.add("highlighted-token");
    }
}

function removeHighlight(tokenId) {
    const tokenElement = document.querySelector(`[data-token-id="${tokenId}"]`);
    if (tokenElement) {
        tokenElement.classList.remove("highlighted-token");
    }
}
