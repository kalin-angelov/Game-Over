import styles from './Create.module.css';

import { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

export const Create = () => {
    const { onAddNewGameSubmit, errorMessage } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        title: '',
        help: '',
        platform: '',
        genre: '',
        players: '',
        imageUrl: '',
        summary: ''
    });

    return (
        <div className={styles.create}>
            {errorMessage &&
                <div className={styles.error}>
                    <p>{errorMessage}</p>
                </div>
            }
            <div className={styles.brandLogo}></div>
            <form className={styles.createForm} onSubmit={(e) => onAddNewGameSubmit(e, formValue)}>
                <h1>Add New Game</h1>

                <label htmlFor="title">Title: </label>
                <input
                    className={styles.title}
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={formValue.title}
                    onChange={onFormValueChange}
                />

                <label htmlFor="help">Help: </label>
                <select 
                    className={styles.help} 
                    name='help' 
                    value={formValue.help}
                    onChange={onFormValueChange}>
                        <option>Other</option>
                        <option>Location</option>
                        <option>Item</option>
                        <option>Boss</option>
                        <option>Skills</option>
                </select>

                <label htmlFor="platform">Platform: </label>
                <select 
                    className={styles.platform} 
                    name='platform' 
                    value={formValue.platform}
                    onChange={onFormValueChange}>
                        <option>Other</option>
                        <option>PlayStation</option>
                        <option>Xbox</option>
                        <option>Nintendo</option>
                        <option>PC</option>
                </select>

                <label htmlFor="genre">Genre: </label>
                <input
                    className={styles.genre}
                    placeholder="Genre"
                    type="text"
                    name="genre"
                    value={formValue.genre}
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

            </form>
        </div>
    );
};