import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import Button from 'react-bootstrap/Button';

const ButtonDelete = ({ onClick }) => {
    return (
        <Button variant='danger' onClick={onClick}>
            <i class="bi bi-trash" />
        </Button>
    );
};

export default ButtonDelete;