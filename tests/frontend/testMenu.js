import { openMenu, closeMenu, toggleMenu, setMenuOptions, getMenuOptions } from './tokenMenu.js';

// Função auxiliar para assertivas nos testes
function assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        console.error(`Test failed: ${message}\nExpected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`);
    } else {
        console.log(`Test passed: ${message}`);
    }
}

// Teste 1: Abrir o menu
function testOpenMenu() {
    closeMenu(); // Garante que o menu começa fechado
    openMenu();

    const menuState = document.body.classList.contains('menu-open');
    assertEqual(menuState, true, 'Menu should be open after calling openMenu.');
}

// Teste 2: Fechar o menu
function testCloseMenu() {
    openMenu(); // Garante que o menu começa aberto
    closeMenu();

    const menuState = document.body.classList.contains('menu-open');
    assertEqual(menuState, false, 'Menu should be closed after calling closeMenu.');
}

// Teste 3: Alternar o estado do menu
function testToggleMenu() {
    closeMenu(); // Garante que o menu começa fechado
    toggleMenu();

    let menuState = document.body.classList.contains('menu-open');
    assertEqual(menuState, true, 'Menu should be open after calling toggleMenu from a closed state.');

    toggleMenu();
    menuState = document.body.classList.contains('menu-open');
    assertEqual(menuState, false, 'Menu should be closed after calling toggleMenu from an open state.');
}

// Teste 4: Definir opções do menu
function testSetMenuOptions() {
    const options = [
        { label: 'Option 1', action: () => console.log('Option 1 selected') },
        { label: 'Option 2', action: () => console.log('Option 2 selected') },
    ];

    setMenuOptions(options);

    const retrievedOptions = getMenuOptions();
    assertEqual(retrievedOptions, options, 'Menu options should be correctly set and retrieved.');
}

// Teste 5: Acessar opções do menu quando não definidas
function testGetMenuOptionsEmpty() {
    setMenuOptions([]);
    const options = getMenuOptions();

    const expected = [];
    assertEqual(options, expected, 'Menu options should be an empty array when no options are set.');
}

// Rodar todos os testes
function runTests() {
    console.log('Running tokenMenu.js tests...');
    testOpenMenu();
    testCloseMenu();
    testToggleMenu();
    testSetMenuOptions();
    testGetMenuOptionsEmpty();
    console.log('All tests completed.');
}

runTests();
