import { applyMovement, invertVector, calculateNewPosition } from './movementLogic.js';

// Função auxiliar para testes
function assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        console.error(`Test failed: ${message}\nExpected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`);
    } else {
        console.log(`Test passed: ${message}`);
    }
}

// Teste 1: Movimentação básica
function testApplyMovement() {
    const token = { x: 0, y: 0, rotation: 0 };
    const movement = { x: 5, y: 10, rotation: 15 };

    applyMovement(token, movement);

    const expected = { x: 5, y: 10, rotation: 15 };
    assertEqual(token, expected, 'Basic movement should update the token position and rotation.');
}

// Teste 2: Vetores invertidos
function testInvertVector() {
    const vector = { x: 5, y: -10, rotation: 45 };
    const inverted = invertVector(vector);

    const expected = { x: -5, y: 10, rotation: -45 };
    assertEqual(inverted, expected, 'Inverted vector should have all components negated.');
}

// Teste 3: Cálculo de nova posição com vetor
function testCalculateNewPosition() {
    const initialPosition = { x: 10, y: 20, rotation: 30 };
    const vector = { x: 5, y: -10, rotation: 15 };

    const newPosition = calculateNewPosition(initialPosition, vector);

    const expected = { x: 15, y: 10, rotation: 45 };
    assertEqual(newPosition, expected, 'New position should correctly apply the vector to the initial position.');
}

// Rodar todos os testes
function runTests() {
    console.log('Running movementLogic tests...');
    testApplyMovement();
    testInvertVector();
    testCalculateNewPosition();
    console.log('All tests completed.');
}

runTests();
