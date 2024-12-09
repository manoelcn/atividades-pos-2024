import React from 'react';
import Card from 'react-bootstrap/Card';

const Index = () => {
    return (
        <div>
            <div class="px-4 py-5 my-5 text-center">
                <div class="col-lg-6 mx-auto">
                    <Card style={{ width: '800px' }} border="0">
                        <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png" />
                        <Card.Body>
                            <Card.Title className='align-items-center'>Versão totalmente original</Card.Title>
                            <Card.Text>
                                Sem criatividade pra escrever alguma coisa aqui.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default Index;