import { getMarcas } from './fipeApi.js';

export async function loadMarcas() {
    console.log('Carregando marcas...');
    try {
        const marcas = await getMarcas();
        const marcaTbody = document.getElementById('marca-tbody');
        marcaTbody.innerHTML = '';

        marcas.forEach((marca) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${marca.codigo}</td>
                <td>${marca.nome}</td>
            `;
            marcaTbody.appendChild(row);
        });
    } catch (error) {
        alert('Não foi possível carregar as marcas.');
    }
}

export function filterMarcas() {
    const input = document.getElementById('search-marca').value.toLowerCase();
    const rows = document.querySelectorAll('#marca-tbody tr');

    rows.forEach((row) => {
        const marcaName = row.cells[1].textContent.toLowerCase();
        row.style.display = marcaName.includes(input) ? '' : 'none';
    });
}
