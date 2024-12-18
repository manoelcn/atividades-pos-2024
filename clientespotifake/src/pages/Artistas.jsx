import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonDelete from '../components/ButtonDelete';
import ButtonEdit from '../components/ButtonEdit';
import { getData, postData, putData, deleteData } from '../services/wrapperAPI'; // Importe a função getData do apiWrapper

const Artistas = () => {
  // Crie um estado para armazenar os dados dos artistas
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novoArtista, setNovoArtista] = useState({ nome: '', local: '', ano_criacao: null });
  const [artistaEditando, setArtistaEditando] = useState(null);
  const [artistaParaDeletar, setArtistaParaDeletar] = useState(null);
  // Estados para o modal de edição
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);


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

  // Função para abrir o modal e configurar o artista em edição
  const abrirModalEdicao = (artista) => {
    setArtistaEditando(artista);
    setShowModal(true);
  };

  const abrirModalDelecao = (artista) => {
    setArtistaParaDeletar(artista);
    setShowModalDelete(true);
  };

  // Função para salvar as alterações feitas no modal
  const salvarAlteracoes = async () => {
    try {
      const artistaAtualizado = await putData(`artistas/${artistaEditando.id}/`, artistaEditando);
      setArtistas(artistas.map((artista) => (artista.id === artistaAtualizado.id ? artistaAtualizado : artista)));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao atualizar artista:', error);
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
          <Col>
            <h1>Artistas</h1>
            <ul>
              {artistas.map((artista) => (
                <li key={artista.id}>{artista.nome} <ButtonEdit onClick={() => abrirModalEdicao(artista)} /> <ButtonDelete onClick={() => abrirModalDelecao(artista)} /></li> // Exibe o nome de cada artista
              ))}
            </ul>
          </Col>
          <Col>
            <h1>Criar artista</h1>
            <Form onSubmit={adicionarArtista}>
              <Form.Group className="mb-3" controlId="formArtista">
                <Form.Label>Nome do artista</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome do artista" value={novoArtista.nome} onChange={(e) => setNovoArtista({ ...novoArtista, nome: e.target.value })} required />
                <Form.Label>Local</Form.Label>
                <Form.Control type="text" placeholder="Digite o local" value={novoArtista.local} onChange={(e) => setNovoArtista({ ...novoArtista, local: e.target.value })} required />
                <Form.Label>Ano de criação</Form.Label>
                <Form.Control type="number" placeholder="Digite o ano de criação" value={novoArtista.ano_criacao || ''} onChange={(e) => setNovoArtista({ ...novoArtista, ano_criacao: e.target.value ? parseInt(e.target.value) : null })} />
              </Form.Group>
              <Button variant="success" type="submit">
                Adicionar Artista
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Artista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={artistaEditando?.nome || ''}
                onChange={(e) => setArtistaEditando({ ...artistaEditando, nome: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Local</Form.Label>
              <Form.Control
                type="text"
                value={artistaEditando?.local || ''}
                onChange={(e) => setArtistaEditando({ ...artistaEditando, local: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ano de Criação</Form.Label>
              <Form.Control
                type="number"
                value={artistaEditando?.ano_criacao || ''}
                onChange={(e) =>
                  setArtistaEditando({
                    ...artistaEditando,
                    ano_criacao: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={salvarAlteracoes}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Deleção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {artistaParaDeletar && (
            <p>Tem certeza que deseja deletar o artista "{artistaParaDeletar.nome}"?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              try {
                await deleteData(`artistas/${artistaParaDeletar.id}/`);
                setArtistas(artistas.filter((a) => a.id !== artistaParaDeletar.id));
                setShowModalDelete(false);
              } catch (error) {
                console.error('Erro ao deletar o artista:', error);
              }
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Artistas;
