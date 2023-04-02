import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useForm } from '../../hooks/useForm';

export const EditCommentModal = ({
  commentInfo,
  showEditCommentModal,
  setShowEditCommentModal,
  onSubmitEditComment
}) => {
  const { formValue, onFormValueChange } = useForm(commentInfo);
  const handleClose = () => setShowEditCommentModal(false);

  return (
    <>
      <Modal show={showEditCommentModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => onSubmitEditComment(e, formValue)}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="text"
                rows={5}
                value={formValue.text}
                onChange={onFormValueChange}
              />
            </Form.Group>
            <button className='send' onClick={handleClose}>
              Save Changes
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}