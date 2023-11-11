import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { getAll, addOne } from '../../service/gameService';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

export const Create = () => {
    const navigate = useNavigate();
    const { 
        errorMessage,
        errorAlert,
        setGameList,
        auth
    } = useContext(AuthContext);

    const { formValue, onFormValueChange } = useForm({
        title: '',
        help: '',
        platform: '',
        genre: '',
        players: '',
        imageUrl: '',
        summary: ''
    });

    
  const onAddNewGameSubmit = async (e, body) => {
    e.preventDefault();

    body.players = Number(body.players);
    try {
      await addOne(body, auth.accessToken)
      const result = await getAll();

      setGameList(result);
      navigate('/profile');
    } catch (err) {
      errorAlert(err.message);
    }
  };

    return (
        <section>
            {errorMessage &&
                <div className='error'>
                    <p>{errorMessage}</p>
                </div>
            }
            <form className='form' onSubmit={(e) => onAddNewGameSubmit(e, formValue)}>
                <p className='brandLogoTwo'></p>
                <h3>Add New Game</h3>
                <p className='formSection'>
                    <i className="fa-solid fa-file-signature"></i>
                    <input
                        className='title'
                        placeholder="Title"
                        type="text"
                        name="title"
                        value={formValue.title}
                        onChange={onFormValueChange}
                    />
                </p>
                <p className='formSection'>
                    <i className="fa-brands fa-hire-a-helper"></i>
                    <select 
                        className='help' 
                        name='help' 
                        value={formValue.help}
                        onChange={onFormValueChange}>
                            <option value="" disabled hidden>Help With</option>
                            <option>Other</option>
                            <option>Location</option>
                            <option>Item</option>
                            <option>Boss</option>
                            <option>Skills</option>
                    </select>
                </p>
                <p className='formSection'>
                    <i className="fa-solid fa-gamepad"></i>
                    <select 
                        className='platform' 
                        name='platform' 
                        value={formValue.platform}
                        onChange={onFormValueChange}>
                            <option value="" disabled hidden>Platform</option>
                            <option>Other</option>
                            <option>PlayStation</option>
                            <option>Xbox</option>
                            <option>Nintendo</option>
                            <option>PC</option>
                    </select>
                </p>
                <p className='formSection'>
                    <i className="fa-solid fa-dna"></i>
                    <input
                        className='genre'
                        placeholder="Genre"
                        type="text"
                        name="genre"
                        value={formValue.genre}
                        onChange={onFormValueChange}
                    />
                </p>
               <p className='formSection'>
                    <i className="fa-solid fa-people-group"></i>
                    <input
                        className='players'
                        placeholder="Players"
                        type="text"
                        name="players"
                        value={formValue.players}
                        onChange={onFormValueChange}
                    />
               </p>
               <p className='formSection'>
                    <i className="fa-regular fa-image"></i>
                    <input
                        className='imageUrl'
                        placeholder="ImageUrl"
                        type="text"
                        name="imageUrl"
                        value={formValue.imageUrl}
                        onChange={onFormValueChange}
                    />
               </p>
               <p className='formSection'>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <textarea
                        className='summary'
                        placeholder="Summary"
                        type="text"
                        name="summary"
                        value={formValue.summary}
                        onChange={onFormValueChange}
                    ></textarea>
               </p>
                <button type='submit' className='send'>Save</button>
            </form>
        </section>
    );
};