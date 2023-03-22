import { Modal, Button } from 'react-bootstrap';
import { useParams } from  'react-router-dom';

export const DeleteButton = ({
    showDelete,
    onDeleteGame,
    onClickCloseDelete
}) => {
    const {gameId} = useParams();

    return (
        <>
            <Modal show={showDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure You Want To Delete This Post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClickCloseDelete} >Close</Button>
                    <Button variant="primary" onClick={() => onDeleteGame(gameId)} >Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}