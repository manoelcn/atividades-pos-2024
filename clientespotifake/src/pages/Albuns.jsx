import React, { useState, useEffect } from 'react';
import { getData } from '../services/wrapperAPI';

const Albuns = () => {
    const [albuns, setAlbuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbuns = async () => {
            try {
                const data = await getData('albuns');
                setAlbuns(data);
            } catch (error) {
                setError('Erro ao carregar álbuns');
            } finally {
                setLoading(false);
            }
        };
        
        fetchAlbuns();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    
    return (
        <div>
            <h1>Álbuns</h1>
            <ul>
                {albuns.map((album) => (
                    <li key={album.id}>{album.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default Albuns;