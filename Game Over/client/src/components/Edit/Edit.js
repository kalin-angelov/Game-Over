import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { getAllGames, updateGame } from '../../service/gameService';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

export const Edit = () => {
    const { 
        errorMessage,
        errorAlert,
        setGameList,
        auth,
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const { gameId } = useParams();
    const location = useLocation();
    const game = location.state;
    const { formValue, onFormValueChange } = useForm(game);

    const onEditSubmit = async (e, body, id) => {
        e.preventDefault();

        body.players = Number(body.players);
        try {
            await updateGame(id, body, auth.accessToken)
            const result = await getAllGames();

            setGameList(result);
            navigate(`/details/${gameId}`);
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
            <form className='form' onSubmit={(e) => onEditSubmit(e, formValue, gameId)}>
                <p className='brandLogoTwo'></p>
                <h3>Edit Game</h3>
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
                        <option>Play Station</option>
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
            </form >
        </main>
    );
};