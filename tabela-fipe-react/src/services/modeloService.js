import { getModelos } from './fipeApi';

export async function loadModelos(codigoMarca) {
    if (!codigoMarca) {
        throw new Error('Código da marca é necessário para carregar modelos.');
    }
    try {
        const data = await getModelos(codigoMarca);
        return data.modelos;
    } catch (error) {
        alert('Não foi possível carregar os modelos.');
        throw error;
    }
}

export function filterModelos(modelos, searchQuery) {
    return modelos.filter((modelo) => 
        modelo.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
}
