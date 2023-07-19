import styles from './Login.module.css';

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { login } from '../../service/authService';

export const Login = () => {
    const navigate = useNavigate();
    const { setAuth, setLoader, errorMessage, errorAlert } = useContext(AuthContext);
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
            navigate('/profile')
        } catch (err) {
            errorAlert(err.message);
            setLoader(false);
        }
    };

    return (
        <div className={styles.login}>
            {errorMessage &&
                <div className={styles.error}>
                    <p>{errorMessage}</p>
                </div>
            }
            <div className={styles.brandLogo}></div>
            <form className={styles.loginForm} onSubmit={onLogin} >
                <h1>Login</h1>
                <div className={styles.formSection}>
                    <i className="fa-solid fa-at"></i>
                    <input
                        className={styles.email}
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={formValue.email}
                        onChange={onFormValueChange}
                    />
                </div>
                <div className={styles.formSection}>
                    <i className="fa-solid fa-key"></i>
                    <input
                        className={styles.password}
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={onFormValueChange}
                    />
                </div>
                <div >
                    <button className={styles.send}>Login</button>
                </div>
                <div className={styles.loginInfo}>
                    <p> Don't Have An Account? Click Here <i className="fa-regular fa-hand-point-right"> </i> <Link to='/register'>Register</Link> </p>
                </div>
            </form >
        </div >
    );
};