import styles from "./Register.module.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { register } from "../../service/authService";
import { bodyCheck } from "../../utils/bodyCheck";

export const Register = () => {
    const navigate = useNavigate();
    const { setAuth, setLoader, errorMessage, errorAlert } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        username: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const onRegister = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            const body = bodyCheck(formValue, "USER");
            const response = await register(body);

            setAuth(response);
            setLoader(false);
            navigate('/profile');
        } catch (err) {
            errorAlert(err.message);
            setLoader(false);
        }

    };

    return (
        <div className={styles.register}>
            {errorMessage &&
                <div className={styles.error}>
                    <p>{errorMessage}</p>
                </div>
            }
            <div className={styles.brandLogo}></div>
            <form className={styles.registerForm} onSubmit={onRegister} >
                <h1 >Register Form</h1>
                <div className={styles.formSection}> 
                    <i class="fa-solid fa-user"></i>
                    <input
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formValue.username}
                        onChange={onFormValueChange}
                    />
                </div>               
                <div className={styles.formSection}> 
                    <i class="fa-solid fa-at"></i>
                    <input
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={formValue.email}
                        onChange={onFormValueChange}
                    />
                </div>               
                <div className={styles.formSection}> 
                    <i class="fa-solid fa-key"></i>
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={onFormValueChange}
                    />
                </div>     
                <div className={styles.formSection}> 
                    <i class="fa-solid fa-key"></i>
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        name="rePassword"
                        value={formValue.rePassword}
                        onChange={onFormValueChange}
                    />
                </div>
                <div>
                    <button className={styles.send}>Register</button>
                </div>
                <div className={styles.registerInfo}>
                    <p> Already Have Account? Click Here <i class="fa-regular fa-hand-point-right"> </i> <Link to='/login'>Login</Link> </p>
                </div>
            </form>
        </div>
    );
};