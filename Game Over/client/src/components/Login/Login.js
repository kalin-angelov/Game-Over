import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { login } from '../../service/authService';

export const Login = () => {
    const navigate = useNavigate();
    const { setAuth, errorMessage, errorAlert } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        email: '',
        password: ''
    });

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await login(formValue);

            setAuth(result);
            navigate('/profile')
        } catch (err) {
            errorAlert(err.message);
        }
    };

    return (
        <main>
            {errorMessage &&
                <div className='error'>
                    <p>{errorMessage}</p>
                </div>
            }
            <form className='form' onSubmit={onLogin} >
                <p className='brandLogo'></p>
                <h3>Login</h3>
                <p className='formSection'>
                    <i className="fa-solid fa-at"></i>
                    <input
                        className='email'
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={formValue.email}
                        onChange={onFormValueChange}
                    />
                </p>
                <p className='formSection'>
                    <i className="fa-solid fa-key"></i>
                    <input
                        className='password'
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={onFormValueChange}
                    />
                </p>
                <button type='submit' className='send'>Login</button>
                <p> Don't Have An Account? Click Here <i className="fa-regular fa-hand-point-right"> </i> <Link to='/register'>Register</Link> </p>
            </form >
        </main >
    );
};