import styles from './Home.module.css';

export const Home = () => {
    return (
        <section >   
            <div className={styles.home}> 
                <p>Here You Can Find Advice On How To Beat The Game That Is Giving You A Hard Time </p>
                
                <img src="images/img.png" alt="homeImage" />
            </div>
        </section>
    );
};