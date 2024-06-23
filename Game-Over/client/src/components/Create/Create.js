import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { getAllGames, addGame } from '../../service/gameService';
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
        mode:'',
        genre: '',
        imageUrl: '',
        summary: ''
    });

    
  const onAddNewGameSubmit = async (e, body) => {
    e.preventDefault();

    try {
      await addGame(body, auth.accessToken)
      const result = await getAllGames();

      setGameList(result);
      navigate('/profile');
    } catch (err) {
      errorAlert(err.message);
    }
  };

    return (
        <main>
            {errorMessage &&
                <div className='error'>
                    <p>{errorMessage}</p>
                </div>
            }
            <form className='form' onSubmit={(e) => onAddNewGameSubmit(e, formValue)}>
                <p className='brandLogoTwo'></p>
                <h3>Add New Game</h3>
                <p className='formSection'>
                    <i className='fa-solid fa-file-signature'></i>
                    <input
                        className='title'
                        placeholder='Title'
                        type='text'
                        name='title'
                        value={formValue.title}
                        onChange={onFormValueChange}
                    />
                </p>
                <fieldset className='formSection'>
                    <i className='fa-brands fa-hire-a-helper'></i>
                    <select 
                        className='help' 
                        name='help' 
                        value={formValue.help}
                        onChange={onFormValueChange}>
                            <option value='' disabled hidden>Help With</option>
                            <option>Other</option>
                            <option>Location</option>
                            <option>Item</option>
                            <option>Boss</option>
                            <option>Skills</option>
                    </select>
                </fieldset>
                <fieldset className='formSection'>
                    <i className='fa-solid fa-gamepad'></i>
                    <select 
                        className='platform' 
                        name='platform' 
                        value={formValue.platform}
                        onChange={onFormValueChange}>
                            <option value='' disabled hidden>Platform</option>
                            <option>Other</option>
                            <option>Play Station</option>
                            <option>Xbox</option>
                            <option>Nintendo</option>
                            <option>PC</option>
                    </select>
                </fieldset>
                <fieldset className='formSection'>
                    <i className='fa-solid fa-people-group'></i>
                   <select
                    className='mode'
                    name='mode'
                    value={formValue.mode}
                    onChange={onFormValueChange}>
                        <option value='' disabled hidden>Mode</option>
                        <option>Single-Player</option>
                        <option>Multiplayer</option>
                        <option>Both</option>
                    </select>
               </fieldset>
                <fieldset className='formSection'>
                    <i className='fa-solid fa-dna'></i>
                    <input
                        className='genre'
                        placeholder='Genre'
                        type='text'
                        name='genre'
                        value={formValue.genre}
                        onChange={onFormValueChange}
                    />
                </fieldset>
               <fieldset className='formSection'>
                    <i className='fa-regular fa-image'></i>
                    <input
                        className='imageUrl'
                        placeholder='ImageUrl'
                        type='text'
                        name='imageUrl'
                        value={formValue.imageUrl}
                        onChange={onFormValueChange}
                    />
               </fieldset>
               <fieldset className='formSection'>
                    <i className='fa-solid fa-pen-to-square'></i>
                    <textarea
                        className='summary'
                        placeholder='Summary'
                        type='text'
                        name='summary'
                        value={formValue.summary}
                        onChange={onFormValueChange}
                    ></textarea>
               </fieldset>
                <button type='submit' className='send'>Save</button>
            </form>
        </main>
    );
};