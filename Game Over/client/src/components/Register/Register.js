import styles from './Register.module.css';

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { register } from '../../service/authService';


export const Register = () => {
    const navigate = useNavigate();
    const { setAuth, setLoader } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        username: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const onRegister = async (e) => {
        e.preventDefault();
        setLoader(true);

        const { rePassword, ...bodyData } = formValue;

        if (rePassword !== bodyData.password) {
            setLoader(false);
            return;
        }

        try {
            const response = await register(bodyData);

            setAuth(response);
            setLoader(false);
            navigate('/catalog');
        } catch (err) {
            console.log(`Error: ${err}`);
            setLoader(false);
        }

    };

    return (
        <div className={styles.register}>
            <div className={styles.brandLogo}></div>

            <form className={styles.registerForm} onSubmit={onRegister} >
                <h1 >Register Form</h1>

                <label htmlFor="username">Username: </label>
                <input
                    className={styles.username}
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={formValue.username}
                    onChange={onFormValueChange}
                />

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

                <label htmlFor="rePassword">Confirm Password: </label>
                <input
                    className={styles.rePassword}
                    placeholder="Confirm Password"
                    type="password"
                    name="rePassword"
                    value={formValue.rePassword}
                    onChange={onFormValueChange}
                />

                <div>
                    <button className={styles.send}>Register</button>
                </div>
                <div className={styles.registerInfo}>
                    <p> Already Have Account? Click Here! <Link to='/login'>Login</Link> </p>
                </div>
            </form>
        </div>
    );
};