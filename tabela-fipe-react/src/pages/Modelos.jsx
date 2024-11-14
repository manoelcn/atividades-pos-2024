import React, { useState, useEffect } from 'react';
import { getModelos } from '../services/fipeApi';

const Modelos = () => {
  const [modelos, setModelos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModelos, setFilteredModelos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadModelos = async () => {
    const codigoMarca = document.getElementById('codigo-marca').value;
    if (!codigoMarca) {
      alert('Por favor, insira o código da marca.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getModelos(codigoMarca);

      if (data && data.modelos && data.modelos.length > 0) {
        setModelos(data.modelos);
        setFilteredModelos(data.modelos);
      } else {
        setError('Nenhum modelo encontrado para o código da marca informado.');
        setModelos([]);
        setFilteredModelos([]);
      }
    } catch (error) {
      setError('Não foi possível carregar os modelos. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = modelos.filter((modelo) =>
      modelo.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredModelos(filtered);
  }, [searchQuery, modelos]);

  return (
    <div className="px-4 py-3 my-5 text-center">
      <div className="container mt-5">
        <h2>Tabela de Modelos</h2>

        <input
          type="text"
          id="codigo-marca"
          className="form-control mb-3"
          placeholder="Código da marca" />

        <input
          type="text"
          id="search-modelo"
          className="form-control mb-3"
          placeholder="Pesquisar modelo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={modelos.length === 0 || isLoading} />

        {error && <div className="alert alert-danger">{error}</div>}

        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Código</th>
              <th>Modelo</th>
            </tr>
          </thead>
          <tbody id="modelo-tbody">
            {filteredModelos.map((modelo) => (
              <tr key={modelo.codigo}>
                <td>{modelo.codigo}</td>
                <td>{modelo.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn btn-primary rounded-pill px-3"
          onClick={handleLoadModelos}
          disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Buscar Modelos'}
        </button>
      </div>
    </div>
  );
};

export default Modelos;
