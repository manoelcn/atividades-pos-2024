import { useEffect, useState } from "react";
import { getData } from '../services/wrapperAPI';


const Musicas = () => {
    const [musicas, setMusicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMusicas = async () => {
            try {
                const data = await getData('musicas');
                setMusicas(data);
            } catch (error) {
                setError('Erro ao carregar músicas');
            } finally {
                setLoading(false);
            }
        };
    
        fetchMusicas();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Músicas</h1>
            <ul>
                {musicas.map((musica) => (
                    <li key={musica.id}>{musica.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default Musicas;