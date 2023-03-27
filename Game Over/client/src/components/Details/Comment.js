import styles from './Details.module.css';

export const Comment = ({
    user,
    text
}) => {
    return (
        <div className={styles.commentsInfo}>
            <img src="/images/userPic.png" alt="userPic" />

            <h3>{user}:</h3>
            <p>{text}</p>
        </div>
    );
};