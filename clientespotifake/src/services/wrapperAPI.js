const API_BASE_URL = 'http://127.0.0.1:8000'; // URL base da API

// Função para realizar requisições GET
export const getData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados de ${endpoint}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição GET:', error);
        throw error;
    }
};

// Função para realizar requisições POST
export const postData = async (endpoint, body) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar dados para ${endpoint}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição POST:', error);
        throw error;
    }
};

// Função para realizar requisições PUT
export const putData = async (endpoint, body) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar dados em ${endpoint}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição PUT:', error);
        throw error;
    }
};

// Função para realizar requisições DELETE
export const deleteData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar dados de ${endpoint}: ${response.statusText}`);
        }

        return { message: 'Deletado com sucesso' };
    } catch (error) {
        console.error('Erro na requisição DELETE:', error);
        throw error;
    }
};
