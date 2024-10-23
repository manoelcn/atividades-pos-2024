import { getModelos } from './fipeApi.js';

export async function loadModelos() {
    const codigoMarca = document.getElementById('codigo-marca').value;
    if (!codigoMarca) {
        alert('Por favor, insira o código da marca.');
        return;
    }

    try {
        const data = await getModelos(codigoMarca);
        const modeloTbody = document.getElementById('modelo-tbody');
        modeloTbody.innerHTML = '';

        data.modelos.forEach((modelo) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${modelo.codigo}</td>
                <td>${modelo.nome}</td>
            `;
            modeloTbody.appendChild(row);
        });
    } catch (error) {
        alert('Não foi possível carregar os modelos.');
    }
}

export function filterModelos() {
    const input = document.getElementById('search-modelo').value.toLowerCase();
    const rows = document.querySelectorAll('#modelo-tbody tr');

    rows.forEach((row) => {
        const modeloName = row.cells[1].textContent.toLowerCase();
        row.style.display = modeloName.includes(input) ? '' : 'none';
    });
}
