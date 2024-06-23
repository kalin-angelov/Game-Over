import { useForm } from '../../hooks/useForm';

export const EditCommentModal = ({
  commentInfo,
  onEditComment
}) => {
  const { formValue, onFormValueChange } = useForm(commentInfo);

  return (
    <form onSubmit={(e) => onEditComment(e, formValue)}>
      <label htmlFor="editComment" style={{display: 'none'}}></label>
      <textarea
        name="text" 
        id="editComment" 
        type='test' 
        role='textbox' 
        cols="30" 
        rows="10"
        value={formValue.text}
        onChange={onFormValueChange}
      ></textarea>
      <button type='submit'>Save</button>
    </form>
  );
};