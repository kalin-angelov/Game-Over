import { Modal, Button } from 'react-bootstrap';

export const DeleteButton = ({
    _id,
    showDelete,
    onDeleteGame,
    onClickCloseDelete
}) => {
    return (
        <>
            <Modal show={showDelete} onHide={onClickCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure You Want To Delete This Post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClickCloseDelete} >Close</Button>
                    <Button variant="primary" onClick={() => onDeleteGame(_id)} >Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}