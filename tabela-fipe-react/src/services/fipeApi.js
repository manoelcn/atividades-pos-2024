const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros';

export async function getMarcas() {
    try {
        const response = await fetch(`${BASE_URL}/marcas`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar marcas:', error);
        throw error;
    }
}

export async function getModelos(codigoMarca) {
    try {
        const response = await fetch(`${BASE_URL}/marcas/${codigoMarca}/modelos`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar modelos:', error);
        throw error;
    }
}
