import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getData, postData, putData, deleteData } from '../services/wrapperAPI'; // Importe a função getData do apiWrapper

const Artistas = () => {
  // Crie um estado para armazenar os dados dos artistas
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novoArtista, setNovoArtista] = useState({ nome: '', local: '', ano_criacao: null });

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

  // Função para adicionar um novo artista
  const adicionarArtista = async (e) => {
    e.preventDefault(); // Previne o reload da página ao submeter o formulário
    try {
      const artistaCriado = await postData('artistas/', novoArtista);
      setArtistas([...artistas, artistaCriado]); // Adiciona o novo artista à lista atual
      setNovoArtista({ nome: '', local: '', ano_criacao: null }); // Reseta o formulário
    } catch (error) {
      console.error('Erro ao adicionar artista:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem de loading enquanto os dados não chegam
  }

  if (error) {
    return <div>{error}</div>; // Exibe o erro caso algo tenha dado errado
  }

  return (
    <div>
      <Container>
        <Row>
          <h1>Artistas</h1>
          <Col>
            <ul>
              {artistas.map((artista) => (
                <li key={artista.id}>{artista.nome} - {artista.local} ({artista.ano_criacao})</li> // Exibe o nome de cada artista
              ))}
            </ul>
          </Col>
          <Col>



            <Form onSubmit={adicionarArtista}>
              <Form.Group className="mb-3" controlId="formArtista">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome" value={novoArtista.nome} onChange={(e) => setNovoArtista({ ...novoArtista, nome: e.target.value })} required />

                <Form.Label>Local</Form.Label>
                <Form.Control type="text" placeholder="Digite o local" value={novoArtista.local} onChange={(e) => setNovoArtista({ ...novoArtista, local: e.target.value })} required />

                <Form.Label>Ano de criação</Form.Label>
                <Form.Control type="number" placeholder="Digite o ano de criação" value={novoArtista.ano_criacao || ''} onChange={(e) => setNovoArtista({ ...novoArtista, ano_criacao: e.target.value ? parseInt(e.target.value) : null })} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Adicionar Artista
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>


    </div>
  );
};

export default Artistas;
