import { getMarcas } from './fipeApi';

export async function loadMarcas() {
    try {
        const marcas = await getMarcas();
        return marcas;
    } catch (error) {
        alert('Não foi possível carregar as marcas.');
        throw error;
    }
}

export function filterMarcas(marcas, searchQuery) {
    return marcas.filter((marca) => 
        marca.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
}
