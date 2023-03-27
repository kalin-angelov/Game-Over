import styles from './Edit.module.css';

import { useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

export const Edit = () => {
    const { onEditSubmit } = useContext(AuthContext);
    const { gameId } = useParams();
    const location = useLocation();
    const game = location.state;

    const { formValue, onFormValueChange } = useForm(game);

    return (
        <div className={styles.edit}>
            <div className={styles.brandLogo}></div>
            <form className={styles.editForm} onSubmit={(e) => onEditSubmit(e, formValue, gameId)}>
                <h1>Edit Game</h1>

                <label htmlFor="title">Title: </label>
                <input
                    className={styles.title}
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={formValue.title}
                    onChange={onFormValueChange}
                />

                <label htmlFor="genre">Genre: </label>
                <input
                    className={styles.genre}
                    placeholder="Genre"
                    type="text"
                    name="genre"
                    value={formValue.genre}
                    onChange={onFormValueChange}
                />

                <label htmlFor="platform">Platform: </label>
                <input
                    className={styles.platform}
                    placeholder="Platform"
                    type="text"
                    name="platform"
                    value={formValue.platform}
                    onChange={onFormValueChange}
                />

                <label htmlFor="players">Number Of Players: </label>
                <input
                    className={styles.players}
                    placeholder="Players"
                    type="text"
                    name="players"
                    value={formValue.players}
                    onChange={onFormValueChange}
                />

                <label htmlFor="imageUrl">ImageUrl: </label>
                <input
                    className={styles.imageUrl}
                    placeholder="ImageUrl"
                    type="text"
                    name="imageUrl"
                    value={formValue.imageUrl}
                    onChange={onFormValueChange}
                />

                <label htmlFor="summary">Summary: </label>
                <textarea
                    className={styles.summary}
                    placeholder="Summary"
                    type="text"
                    name="summary"
                    value={formValue.summary}
                    onChange={onFormValueChange}
                ></textarea>

                <article>
                    <button className={styles.send}>Save</button>
                </article>
            </form >
        </div>
    );
};