import { syncMovement, broadcastSync, receiveSync } from './sync.js';

// Função auxiliar para testes
function assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        console.error(`Test failed: ${message}\nExpected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`);
    } else {
        console.log(`Test passed: ${message}`);
    }
}

// Mock para simular tokens
function createMockToken(id, x, y, rotation) {
    return { id, x, y, rotation };
}

// Teste 1: Sincronizar movimento básico
function testSyncMovement() {
    const sourceToken = createMockToken(1, 10, 20, 30);
    const targetToken = createMockToken(2, 0, 0, 0);

    syncMovement(sourceToken, targetToken);

    const expected = { id: 2, x: 10, y: 20, rotation: 30 };
    assertEqual(targetToken, expected, 'Target token should synchronize with source token.');
}

// Teste 2: Broadcast de sincronização
function testBroadcastSync() {
    let syncData = null;

    // Mock da função de enviar dados
    function mockSendSync(data) {
        syncData = data;
    }

    const token = createMockToken(1, 50, 60, 90);
    broadcastSync(token, mockSendSync);

    const expected = { id: 1, x: 50, y: 60, rotation: 90 };
    assertEqual(syncData, expected, 'Broadcast should send correct token data.');
}

// Teste 3: Receber sincronização
function testReceiveSync() {
    const token = createMockToken(1, 0, 0, 0);
    const receivedData = { id: 1, x: 100, y: 200, rotation: 45 };

    receiveSync(token, receivedData);

    const expected = { id: 1, x: 100, y: 200, rotation: 45 };
    assertEqual(token, expected, 'Token should update with received sync data.');
}

// Rodar todos os testes
function runTests() {
    console.log('Running sync.js tests...');
    testSyncMovement();
    testBroadcastSync();
    testReceiveSync();
    console.log('All tests completed.');
}

runTests();
