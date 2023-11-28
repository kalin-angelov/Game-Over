import styles from './Profile.module.css';

export const SelectProfileImage = ({ onSelectProfileImage }) => {

    return(
        <article className={styles.selectSection} >
            <button onClick={onSelectProfileImage}><img src='images/profileImages/AC.jpg' alt='AC Image' /></button>
            <button onClick={onSelectProfileImage}><img src='images/profileImages/Master-Chef.jpg' alt='Master-Chef Image' /></button>
            <button onClick={onSelectProfileImage}><img src='images/profileImages/Pokemon.jpg' alt='Pokemon Image' /></button>
            <button onClick={onSelectProfileImage}><img src='images/profileImages/Spider-Man.jpg' alt='Spider-Man Image' /></button>
            <button onClick={onSelectProfileImage}><img src='images/profileImages/Spider-Man2.jpg' alt='Spider-Man 2 Image' /></button>
            <button onClick={onSelectProfileImage}><img src='images/profileImages/Zelda.jpg' alt='Zelda Image' /></button> 
        </article>
    );
};