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

                <div className={styles.formSection}>
                    <i class="fa-solid fa-file-signature"></i>
                    <input
                        className={styles.title}
                        placeholder="Title"
                        type="text"
                        name="title"
                        value={formValue.title}
                        onChange={onFormValueChange}
                    />
                </div>
                <div className={styles.formSection}>
                    <i class="fa-brands fa-hire-a-helper"></i>
                    <select 
                        className={styles.help} 
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
                </div>
                <div className={styles.formSection}>
                    <i class="fa-solid fa-gamepad"></i>
                    <select 
                        className={styles.platform} 
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
                </div>
                <div className={styles.formSection}>
                    <i class="fa-solid fa-dna"></i>
                    <input
                        className={styles.genre}
                        placeholder="Genre"
                        type="text"
                        name="genre"
                        value={formValue.genre}
                        onChange={onFormValueChange}
                    />
                </div>
               <div className={styles.formSection}>
                    <i class="fa-solid fa-people-group"></i>
                    <input
                        className={styles.players}
                        placeholder="Players"
                        type="text"
                        name="players"
                        value={formValue.players}
                        onChange={onFormValueChange}
                    />
               </div>
               <div className={styles.formSection}>
                    <i class="fa-regular fa-image"></i>
                    <input
                        className={styles.imageUrl}
                        placeholder="ImageUrl"
                        type="text"
                        name="imageUrl"
                        value={formValue.imageUrl}
                        onChange={onFormValueChange}
                    />
               </div>
               <div className={styles.formSection}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <textarea
                        className={styles.summary}
                        placeholder="Summary"
                        type="text"
                        name="summary"
                        value={formValue.summary}
                        onChange={onFormValueChange}
                    ></textarea>
               </div>
                <div>
                    <button className={styles.send}>Save</button>
                </div>
            </form>
        </div>
    );
};