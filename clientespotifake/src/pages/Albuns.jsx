import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getData, postData, putData, deleteData } from '../services/wrapperAPI';

const Albuns = () => {
    const [albuns, setAlbuns] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [novoAlbum, setNovoAlbum] = useState({ nome: '', ano: null, artista: null });

    useEffect(() => {
        const fetchAlbuns = async () => {
            try {
                const artistasData = await getData('artistas'); // Busca os artistas
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
            const albumCriado = await postData('albuns/', novoAlbum)
            setAlbuns([...albuns, albumCriado]);
            setNovoAlbum({ nome: '', ano: null, artista: null });
        } catch (error) {
            console.error('Erro ao adicionar álbum', error);
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
                                <li key={album.id}>{album.nome}</li>
                            ))}
                        </ul>
                    </Col>
                    <Col>
                        <h1>Criar álbum</h1>
                        <Form onSubmit={adicionarAlbum}>
                            <Form.Group className="mb-3" controlId="formAlbum">
                                <Form.Label>Nome do álbum</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do álbum" value={novoAlbum.nome} onChange={(e) => setNovoAlbum({ ...novoAlbum, nome: e.target.value })} required />
                                <Form.Label>Ano de lançamento</Form.Label>
                                <Form.Control type="number" placeholder="Digite o ano de lançamento do álbum" value={novoAlbum.ano || ''} onChange={(e) => setNovoAlbum({ ...novoAlbum, ano: e.target.value ? parseInt(e.target.value) : null })} required />
                                <Form.Label>Artista</Form.Label>
                                <Form.Select value={novoAlbum.artista || ''} onChange={(e) => setNovoAlbum({ ...novoAlbum, artista: e.target.value })} required>
                                    <option value="">Selecione um artista</option>
                                    {artistas.map((artista) => (
                                        <option key={artista.id} value={artista.id}>{artista.nome}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Adicionar Álbum
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Albuns;
