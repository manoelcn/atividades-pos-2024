import { loadMarcas, filterMarcas } from './marcas.js';
import { loadModelos, filterModelos } from './modelos.js';

document.addEventListener('DOMContentLoaded', () => {

    const loadButtonMarcas = document.getElementById('load-button-marcas');
    const searchMarcaInput = document.getElementById('search-marca');

    if (loadButtonMarcas) {
        loadButtonMarcas.addEventListener('click', loadMarcas);
    }

    if (searchMarcaInput) {
        searchMarcaInput.addEventListener('input', filterMarcas);
    }

    const loadButtonModelos = document.getElementById('load-button-modelos');
    const searchModeloInput = document.getElementById('search-modelo');

    if (loadButtonModelos) {
        loadButtonModelos.addEventListener('click', loadModelos);
    }

    if (searchModeloInput) {
        searchModeloInput.addEventListener('input', filterModelos);
    }
});
