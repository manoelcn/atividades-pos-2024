import React, { useState, useEffect } from 'react';
import { getData } from '../services/wrapperAPI'; // Importe a função getData do apiWrapper

const Artistas = () => {
  // Crie um estado para armazenar os dados dos artistas
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilize o useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const data = await getData('artistas'); // Chama o wrapper para buscar os artistas
        setArtistas(data); // Armazena os dados no estado
      } catch (error) {
        setError('Erro ao carregar artistas'); // Caso haja erro, define uma mensagem
      } finally {
        setLoading(false); // Define o loading como false, independentemente de ter dado erro ou não
      }
    };

    fetchArtistas(); // Chama a função para buscar os dados
  }, []); // O array vazio significa que o useEffect será executado apenas uma vez, ao montar o componente

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem de loading enquanto os dados não chegam
  }

  if (error) {
    return <div>{error}</div>; // Exibe o erro caso algo tenha dado errado
  }

  return (
    <div>
      <h1>Artistas</h1>
      <ul>
        {artistas.map((artista) => (
          <li key={artista.id}>{artista.nome}</li> // Exibe o nome de cada artista
        ))}
      </ul>
    </div>
  );
};

export default Artistas;
