import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getData, postData } from '../services/wrapperAPI';

const Musicas = () => {
    const [musicas, setMusicas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [novaMusica, setNovaMusica] = useState({ nome: '', segundos: null, album: null });
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
            setNovaMusica({ nome: '', segundos: null, album: null });
        } catch (error) {
            console.error('Erro ao adicionar música:', error);
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
                                <li key={musica.id}>
                                    {musica.nome} - {musica.segundos}s - Álbum: {albuns.find((a) => a.id === musica.album)?.nome || 'Desconhecido'}
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col>
                        <h1>Adicionar músicas</h1>


                        <Form onSubmit={adicionarMusica}>
                            <Form.Group className='mb-3' controlId='formMusica'>
                                <Form.Label>Nome da música</Form.Label>
                                <Form.Control type="text" value={novaMusica.nome} onChange={(e) => setNovaMusica({ ...novaMusica, nome: e.target.value })} required />

                                <Form.Label>Duração (segundos)</Form.Label>
                                <Form.Control type="number"
                                    value={novaMusica.segundos || ''}
                                    onChange={(e) => setNovaMusica({ ...novaMusica, segundos: e.target.value ? parseInt(e.target.value) : null })}
                                    required />

                                <Form.Label>Álbum</Form.Label>
                                <Form.Select value={novaMusica.album || ''}
                                    onChange={(e) => setNovaMusica({ ...novaMusica, album: e.target.value })}
                                    required>
                                    <option value="">Selecione um álbum</option>
                                    {albuns.map((album) => (
                                        <option key={album.id} value={album.id}>
                                            {album.nome} ({album.ano})
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
        </div>
    );
};

export default Musicas;
