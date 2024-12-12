import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonDelete from '../components/ButtonDelete';
import ButtonEdit from '../components/ButtonEdit';
import { getData, postData, putData, deleteData } from '../services/wrapperAPI';

const Musicas = () => {
    const [musicas, setMusicas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [novaMusica, setNovaMusica] = useState({ nome: '', segundos: null, musica: null });
    const [musicaEditando, setMusicaEditando] = useState(null);
    const [musicaParaDeletar, setMusicaParaDeletar] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albunsData = await getData('albuns');
                setAlbuns(albunsData);

                const musicasData = await getData('musicas');
                setMusicas(musicasData);
            } catch (err) {
                setError('Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const adicionarMusica = async (e) => {
        e.preventDefault();
        try {
            const musicaCriada = await postData('musicas/', novaMusica);
            setMusicas([...musicas, musicaCriada]);
            setNovaMusica({ nome: '', segundos: null, musica: null });
        } catch (error) {
            console.error('Erro ao adicionar música:', error);
        }
    };

    const abrirModalEdicao = (musica) => {
        setMusicaEditando(musica);
        setShowModal(true);
    };

    const abrirModalDelecao = (musica) => {
        setMusicaParaDeletar(musica);
        setShowModalDelete(true);
    };

    const salvarAlteracoes = async () => {
        try {
            const musicaAtualizada = await putData(`musicas/${musicaEditando.id}/`, musicaEditando);
            setMusicas(musicas.map((musica) => (musica.id === musicaAtualizada.id ? musicaAtualizada : musica)));
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao atualizar música', error);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <ul>
                            <h1>Músicas</h1>
                            {musicas.map((musica) => (
                                <li key={musica.id}>{musica.nome} <ButtonEdit onClick={() => abrirModalEdicao(musica)} /> <ButtonDelete /></li>
                            ))}
                        </ul>
                    </Col>
                    <Col>
                        <h1>Criar música</h1>
                        <Form onSubmit={adicionarMusica}>
                            <Form.Group className='mb-3' controlId='formMusica'>
                                <Form.Label>Nome da música</Form.Label>
                                <Form.Control type="text" placeholder='Digite o nome da música' value={novaMusica.nome} onChange={(e) => setNovaMusica({ ...novaMusica, nome: e.target.value })} required />
                                <Form.Label>Duração da música (segundos)</Form.Label>
                                <Form.Control type="number" placeholder='Digite a duração da música em segundos' value={novaMusica.segundos || ''} onChange={(e) => setNovaMusica({ ...novaMusica, segundos: e.target.value ? parseInt(e.target.value) : null })} required />
                                <Form.Label>Álbum</Form.Label>
                                <Form.Select value={novaMusica.musica || ''} onChange={(e) => setNovaMusica({ ...novaMusica, musica: e.target.value })} required>
                                    <option value="">Selecione um álbum</option>
                                    {albuns.map((musica) => (
                                        <option key={musica.id} value={musica.id}>
                                            {musica.nome} ({musica.ano})
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Adicionar Música
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Música</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome da música</Form.Label>
                            <Form.Control
                                type="text"
                                value={musicaEditando?.nome || ''}
                                onChange={(e) => setMusicaEditando({ ...musicaEditando, nome: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Segundos</Form.Label>
                            <Form.Control
                                type="text"
                                value={musicaEditando?.segundos || ''}
                                onChange={(e) => setMusicaEditando({ ...musicaEditando, segundos: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Álbum</Form.Label>
                            <Form.Select
                                value={musicaEditando?.album || ''}
                                onChange={(e) => setMusicaEditando({ ...musicaEditando, album: e.target.value })}
                                required
                            >
                                <option value="">Selecione um álbum</option>
                                {albuns.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={salvarAlteracoes}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Musicas;
