import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import Button from 'react-bootstrap/Button';

const ButtonEdit = ({ onClick }) => {
    return (
        <Button variant="warning" onClick={onClick}>
            <i class="bi bi-pencil-square" />
        </Button>
    );
};

export default ButtonEdit;