// Função para carregar as marcas de carro usando async/await
async function loadMarcas() {
    console.log('Carregando marcas...'); // Adicione isto para verificar se a função é chamada
    try {
        const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
        const response = await fetch(url); // Espera a resposta da API
        const marcas = await response.json(); // Espera a conversão para JSON

        const marcaTbody = document.getElementById('marca-tbody');
        marcaTbody.innerHTML = ''; // Limpa o corpo da tabela anterior

        // Itera sobre as marcas e cria as linhas da tabela
        marcas.forEach((marca) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td>${marca.codigo}</td>
                        <td>${marca.nome}</td>
                    `;
            marcaTbody.appendChild(row);
        });

    } catch (error) {
        console.error('Erro ao buscar as marcas:', error);
        alert('Não foi possível carregar as marcas.');
    }
}

// Função para filtrar as marcas com base na pesquisa
function filterMarcas() {
    const input = document.getElementById('search-marca').value.toLowerCase();
    const rows = document.querySelectorAll('#marca-tbody tr');

    rows.forEach((row) => {
        const marcaName = row.cells[1].textContent.toLowerCase();
        if (marcaName.includes(input)) {
            row.style.display = ''; // Exibe a linha se a marca corresponder
        } else {
            row.style.display = 'none'; // Oculta a linha se a marca não corresponder
        }
    });
}


// Função para carregar os modelos de carro usando async/await
async function loadModelos() {
    const codigoMarca = document.getElementById('codigo-marca').value;

    if (!codigoMarca) {
        alert('Por favor, insira o código da marca.');
        return;
    }

    try {
        const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`;
        const response = await fetch(url); // Espera a resposta da API
        const data = await response.json(); // Espera a conversão para JSON

        const modeloTbody = document.getElementById('modelo-tbody');
        modeloTbody.innerHTML = ''; // Limpa o corpo da tabela anterior

        // Itera sobre os modelos e cria as linhas da tabela
        data.modelos.forEach((modelo) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${modelo.codigo}</td>
                <td>${modelo.nome}</td>
            `;
            modeloTbody.appendChild(row);
        });

    } catch (error) {
        console.error('Erro ao buscar os modelos:', error);
        alert('Não foi possível carregar os modelos.');
    }
}

// Função para filtrar os modelos com base na pesquisa
function filterModelos() {
    const input = document.getElementById('search-modelo').value.toLowerCase();
    const rows = document.querySelectorAll('#modelo-tbody tr');

    rows.forEach((row) => {
        const modeloName = row.cells[1].textContent.toLowerCase();
        if (modeloName.includes(input)) {
            row.style.display = ''; // Exibe a linha se o modelo corresponder
        } else {
            row.style.display = 'none'; // Oculta a linha se o modelo não corresponder
        }
    });
}

// Adiciona eventos de clique e entrada
document.getElementById('load-button-marcas').addEventListener('click', loadMarcas);
document.getElementById('search-marca').addEventListener('input', filterMarcas);

// Adiciona eventos de clique e entrada
document.getElementById('load-button-modelos').addEventListener('click', loadModelos);
document.getElementById('search-modelo').addEventListener('input', filterModelos);

/* diego, javascript não faz o menor sentido kkkkkkkkkkk.
    a ordem em que coloco os eventos influencia o funcionamento deles. 
    por exemplo, caso eu coloque os eventos para chamar as funções loadMarcas e filterMarcas primeiro, 
    os eventos que chamam as funções loadModelos e filterModelos não funcionam, e vice-versa. 
    não sabia o que fazer para funcionar(nem o chatgpt), por isso coloquei o código no html mesmo :)
    separar as funções em dois arquivos diferentes também funciona.

    obs: o problema pode ser eu que não sei nada de javascript ksksksksksks
*/