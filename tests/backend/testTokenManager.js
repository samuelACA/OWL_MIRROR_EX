import { addTokenToGroup, removeTokenFromGroup, getTokenGroup, clearTokenGroups } from './tokenManager.js';

// Função auxiliar para testes
function assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        console.error(`Test failed: ${message}\nExpected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`);
    } else {
        console.log(`Test passed: ${message}`);
    }
}

// Teste 1: Adicionar um token a um grupo
function testAddTokenToGroup() {
    clearTokenGroups();
    const tokenId = 'token1';
    const groupId = 'group1';

    addTokenToGroup(tokenId, groupId);
    const group = getTokenGroup(groupId);

    const expected = [tokenId];
    assertEqual(group, expected, 'Token should be added to the group.');
}

// Teste 2: Remover um token de um grupo
function testRemoveTokenFromGroup() {
    clearTokenGroups();
    const tokenId = 'token1';
    const groupId = 'group1';

    addTokenToGroup(tokenId, groupId);
    removeTokenFromGroup(tokenId, groupId);
    const group = getTokenGroup(groupId);

    const expected = [];
    assertEqual(group, expected, 'Token should be removed from the group.');
}

// Teste 3: Adicionar múltiplos tokens ao mesmo grupo
function testAddMultipleTokensToGroup() {
    clearTokenGroups();
    const token1 = 'token1';
    const token2 = 'token2';
    const groupId = 'group1';

    addTokenToGroup(token1, groupId);
    addTokenToGroup(token2, groupId);
    const group = getTokenGroup(groupId);

    const expected = [token1, token2];
    assertEqual(group, expected, 'Multiple tokens should be added to the group.');
}

// Teste 4: Adicionar um token a um novo grupo
function testAddTokenToNewGroup() {
    clearTokenGroups();
    const tokenId = 'token1';
    const groupId1 = 'group1';
    const groupId2 = 'group2';

    addTokenToGroup(tokenId, groupId1);
    addTokenToGroup(tokenId, groupId2);
    const group1 = getTokenGroup(groupId1);
    const group2 = getTokenGroup(groupId2);

    const expectedGroup1 = [];
    const expectedGroup2 = [tokenId];

    assertEqual(group1, expectedGroup1, 'Token should be removed from the first group.');
    assertEqual(group2, expectedGroup2, 'Token should be added to the new group.');
}

// Teste 5: Limpar todos os grupos de tokens
function testClearTokenGroups() {
    clearTokenGroups();
    const token1 = 'token1';
    const token2 = 'token2';
    const groupId = 'group1';

    addTokenToGroup(token1, groupId);
    addTokenToGroup(token2, groupId);
    clearTokenGroups();
    const group = getTokenGroup(groupId);

    const expected = undefined; // Grupo não deve existir após limpeza
    assertEqual(group, expected, 'All token groups should be cleared.');
}

// Rodar todos os testes
function runTests() {
    console.log('Running tokenManager.js tests...');
    testAddTokenToGroup();
    testRemoveTokenFromGroup();
    testAddMultipleTokensToGroup();
    testAddTokenToNewGroup();
    testClearTokenGroups();
    console.log('All tests completed.');
}

runTests();
