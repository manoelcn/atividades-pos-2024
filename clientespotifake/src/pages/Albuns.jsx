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

const Albuns = () => {
    const [albuns, setAlbuns] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [novoAlbum, setNovoAlbum] = useState({ nome: '', ano: null, artista: null });
    const [albumEditando, setAlbumEditando] = useState(null);
    const [albumParaDeletar, setAlbumParaDeletar] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAlbuns = async () => {
            try {
                const artistasData = await getData('artistas');
                setArtistas(artistasData);

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

    const adicionarAlbum = async (e) => {
        e.preventDefault();
        try {
            const albumCriado = await postData('albuns/', novoAlbum);
            setAlbuns([...albuns, albumCriado]);
            setNovoAlbum({ nome: '', ano: null, artista: null });
        } catch (error) {
            console.error('Erro ao adicionar álbum', error);
        }
    };

    const abrirModalEdicao = (album) => {
        setAlbumEditando(album);
        setShowModal(true);
    };

    const abrirModalDelecao = (album) => {
        setAlbumParaDeletar(album);
        setShowModalDelete(true);
    };

    const salvarAlteracoes = async () => {
        try {
            const albumAtualizado = await putData(`albuns/${albumEditando.id}/`, albumEditando);
            setAlbuns(albuns.map((album) => (album.id === albumAtualizado.id ? albumAtualizado : album)));
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao atualizar álbum:', error);
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
                        <h1>Álbuns</h1>
                        <ul>
                            {albuns.map((album) => (
                                <li key={album.id}>
                                    {album.nome}{' '}
                                    <ButtonEdit onClick={() => abrirModalEdicao(album)} />{' '}
                                    <ButtonDelete onClick={() => abrirModalDelecao(album)} />
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col>
                        <h1>Criar álbum</h1>
                        <Form onSubmit={adicionarAlbum}>
                            <Form.Group className="mb-3" controlId="formAlbum">
                                <Form.Label>Nome do álbum</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome do álbum"
                                    value={novoAlbum.nome}
                                    onChange={(e) => setNovoAlbum({ ...novoAlbum, nome: e.target.value })}
                                    required
                                />
                                <Form.Label>Ano de lançamento</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Digite o ano de lançamento do álbum"
                                    value={novoAlbum.ano || ''}
                                    onChange={(e) => setNovoAlbum({ ...novoAlbum, ano: e.target.value ? parseInt(e.target.value) : null })}
                                    required
                                />
                                <Form.Label>Artista</Form.Label>
                                <Form.Select
                                    value={novoAlbum.artista || ''}
                                    onChange={(e) => setNovoAlbum({ ...novoAlbum, artista: e.target.value })}
                                    required
                                >
                                    <option value="">Selecione um artista</option>
                                    {artistas.map((artista) => (
                                        <option key={artista.id} value={artista.id}>
                                            {artista.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Adicionar Álbum
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            {/* Modal de Edição */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Álbum</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome do álbum</Form.Label>
                            <Form.Control
                                type="text"
                                value={albumEditando?.nome || ''}
                                onChange={(e) => setAlbumEditando({ ...albumEditando, nome: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ano de lançamento</Form.Label>
                            <Form.Control
                                type="number"
                                value={albumEditando?.ano || ''}
                                onChange={(e) =>
                                    setAlbumEditando({ ...albumEditando, ano: e.target.value ? parseInt(e.target.value) : null })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Artista</Form.Label>
                            <Form.Select
                                value={albumEditando?.artista || ''}
                                onChange={(e) => setAlbumEditando({ ...albumEditando, artista: e.target.value })}
                                required
                            >
                                <option value="">Selecione um artista</option>
                                {artistas.map((artista) => (
                                    <option key={artista.id} value={artista.id}>
                                        {artista.nome}
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
                    {albumParaDeletar && (
                        <p>Tem certeza que deseja deletar o artista "{albumParaDeletar.nome}"?</p>
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
                                await deleteData(`albuns/${albumParaDeletar.id}/`);
                                setAlbuns(albuns.filter((a) => a.id !== albumParaDeletar.id));
                                setShowModalDelete(false);
                            } catch (error) {
                                console.error('Erro ao deletar o álbum:', error);
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

export default Albuns;
