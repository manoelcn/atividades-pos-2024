const BASE_URL = "http://localhost:8000";  // URL API

// Função para realizar as requisições GET
const getRequest = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
    }
};

// Função para realizar as requisições POST, PUT, DELETE
const postRequest = async (endpoint, method, data) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
    }
};
