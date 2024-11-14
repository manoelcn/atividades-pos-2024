import React, { useState, useEffect } from 'react';
import { loadMarcas, filterMarcas } from '../services/marcasService';

const Marcas = () => {
    const [marcas, setMarcas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMarcas, setFilteredMarcas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMarcas = async () => {
        try {
            const data = await loadMarcas();
            setMarcas(data);
            setFilteredMarcas(data);
        } catch (error) {
            console.error('Erro ao carregar marcas:', error);
        }
    };

    useEffect(() => {
        setFilteredMarcas(filterMarcas(marcas, searchQuery));
    }, [searchQuery, marcas]);

    return (
        <div className="px-4 py-3 my-5 text-center">
            <div className="container mt-5">
                <h2>Tabela de Marcas</h2>

                <input
                    type="text"
                    id="search-marca"
                    className="form-control mb-3"
                    placeholder="Pesquisar marca..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={marcas.length === 0} />

                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Código</th>
                            <th>Marca</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMarcas.map((marca) => (
                            <tr key={marca.codigo}>
                                <td>{marca.codigo}</td>
                                <td>{marca.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button
                    className="btn btn-primary rounded-pill px-3"
                    onClick={handleLoadMarcas}
                    disabled={isLoading}>
                    {isLoading ? 'Carregando...' : 'Buscar Marcas'}
                </button>
            </div>
        </div>
    );
};

export default Marcas;
