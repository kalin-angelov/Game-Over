import styles from './Home.module.css';

export const Home = () => {
    return (
        <section >   
            <h1>Welcome To Game Over</h1>

            <div className={styles.home}> 
                <img src="images/img.png" alt="homeImage" />
                <p>Here You Can Find Advice On How To Beat The Game That Is Giving You A Hard Time </p>
            </div>
        </section>
    );
};