import styles from './Login.module.css';
 
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { login } from '../../service/authService';

export const Login = () => {
    const navigate = useNavigate();
    const { setAuth, setLoader } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        email: '',
        password: ''
    });

    const onLogin = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            const result = await login(formValue);

            setAuth(result);
            setLoader(false);
            navigate('/catalog')
        } catch (err) {
            console.log(`Error: ${err}`);
            setLoader(false);
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.brandLogo}></div>

            <form className={styles.loginForm} onSubmit={onLogin} >
                <h1>Login</h1>

                <label htmlFor="email">Email: </label>
                <input
                    className={styles.email}
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={formValue.email}
                    onChange={onFormValueChange}
                />

                <label htmlFor="password">Password: </label>
                <input
                    className={styles.password}
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formValue.password}
                    onChange={onFormValueChange}
                />

                <article >
                    <button className={styles.send}>Login</button>
                </article>
                <div className={styles.loginInfo}>
                    <p> Don't Have An Account? Click Here! <Link to='/register'>Register</Link> </p>
                </div>        
            </form >
        </div >
    );
};