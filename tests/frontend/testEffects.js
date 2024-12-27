import { applyEffect, removeEffect, getEffectsOnToken, clearEffects } from './effects.js';

// Função auxiliar para assertivas nos testes
function assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        console.error(`Test failed: ${message}\nExpected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`);
    } else {
        console.log(`Test passed: ${message}`);
    }
}

// Teste 1: Aplicar um efeito em um token
function testApplyEffect() {
    clearEffects();
    const tokenId = 'token1';
    const effect = { type: 'glow', intensity: 5 };

    applyEffect(tokenId, effect);
    const effects = getEffectsOnToken(tokenId);

    const expected = [effect];
    assertEqual(effects, expected, 'Effect should be applied to the token.');
}

// Teste 2: Remover um efeito de um token
function testRemoveEffect() {
    clearEffects();
    const tokenId = 'token1';
    const effect = { type: 'glow', intensity: 5 };

    applyEffect(tokenId, effect);
    removeEffect(tokenId, effect);
    const effects = getEffectsOnToken(tokenId);

    const expected = [];
    assertEqual(effects, expected, 'Effect should be removed from the token.');
}

// Teste 3: Aplicar múltiplos efeitos a um token
function testApplyMultipleEffects() {
    clearEffects();
    const tokenId = 'token1';
    const effect1 = { type: 'glow', intensity: 5 };
    const effect2 = { type: 'blur', intensity: 3 };

    applyEffect(tokenId, effect1);
    applyEffect(tokenId, effect2);
    const effects = getEffectsOnToken(tokenId);

    const expected = [effect1, effect2];
    assertEqual(effects, expected, 'Multiple effects should be applied to the token.');
}

// Teste 4: Remover apenas um efeito específico
function testRemoveSpecificEffect() {
    clearEffects();
    const tokenId = 'token1';
    const effect1 = { type: 'glow', intensity: 5 };
    const effect2 = { type: 'blur', intensity: 3 };

    applyEffect(tokenId, effect1);
    applyEffect(tokenId, effect2);
    removeEffect(tokenId, effect1);
    const effects = getEffectsOnToken(tokenId);

    const expected = [effect2];
    assertEqual(effects, expected, 'Only the specified effect should be removed from the token.');
}

// Teste 5: Limpar todos os efeitos de todos os tokens
function testClearEffects() {
    clearEffects();
    const token1 = 'token1';
    const token2 = 'token2';
    const effect1 = { type: 'glow', intensity: 5 };
    const effect2 = { type: 'blur', intensity: 3 };

    applyEffect(token1, effect1);
    applyEffect(token2, effect2);
    clearEffects();

    const effectsToken1 = getEffectsOnToken(token1);
    const effectsToken2 = getEffectsOnToken(token2);

    const expected = undefined; // Não deve haver efeitos após limpeza
    assertEqual(effectsToken1, expected, 'All effects on token1 should be cleared.');
    assertEqual(effectsToken2, expected, 'All effects on token2 should be cleared.');
}

// Rodar todos os testes
function runTests() {
    console.log('Running effects.js tests...');
    testApplyEffect();
    testRemoveEffect();
    testApplyMultipleEffects();
    testRemoveSpecificEffect();
    testClearEffects();
    console.log('All tests completed.');
}

runTests();
