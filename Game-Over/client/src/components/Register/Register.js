import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { register } from "../../service/authService";
import { bodyCheck } from "../../utils/bodyCheck";

export const Register = () => {
    const navigate = useNavigate();
    const { setAuth, errorMessage, errorAlert } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        username: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const onRegister = async (e) => {
        e.preventDefault();

        try {
            const body = bodyCheck(formValue, "USER");
            const response = await register(body);

            setAuth(response);
            navigate('/profile');
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
            <form className='form' onSubmit={onRegister} >
                <p className='brandLogoTwo'></p>
                <h3>Register Form</h3>
                <fieldset className='formSection'> 
                    <i className="fa-solid fa-user"></i>
                    <input
                        placeholder="Username"
                        type="text"
                        name="username"
                        required
                        value={formValue.username}
                        onChange={onFormValueChange}
                    />
                </fieldset>               
                <fieldset className='formSection'> 
                    <i className="fa-solid fa-at"></i>
                    <input
                        placeholder="Email"
                        type="text"
                        name="email"
                        required
                        value={formValue.email}
                        onChange={onFormValueChange}
                    />
                </fieldset>               
                <fieldset className='formSection'> 
                    <i className="fa-solid fa-key"></i>
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        required
                        value={formValue.password}
                        onChange={onFormValueChange}
                    />
                </fieldset>     
                <fieldset className='formSection'> 
                    <i className="fa-solid fa-key"></i>
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        name="rePassword"
                        required
                        value={formValue.rePassword}
                        onChange={onFormValueChange}
                    />
                </fieldset>
                <button type='submit' className='send'>Register</button>
                <p> Already Have Account? Click Here <i className="fa-regular fa-hand-point-right"> </i> <Link to='/login'>Login</Link> </p>
            </form>
        </main>
    );
};