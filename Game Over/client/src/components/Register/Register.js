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
        <section>
            {errorMessage &&
                <div className='error'>
                    <p>{errorMessage}</p>
                </div>
            }
            <form className='form' onSubmit={onRegister} >
                <p className='brandLogoTwo'></p>
                <h3>Register Form</h3>
                <p className='formSection'> 
                    <i className="fa-solid fa-user"></i>
                    <input
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formValue.username}
                        onChange={onFormValueChange}
                    />
                </p>               
                <p className='formSection'> 
                    <i className="fa-solid fa-at"></i>
                    <input
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
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={onFormValueChange}
                    />
                </p>     
                <p className='formSection'> 
                    <i className="fa-solid fa-key"></i>
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        name="rePassword"
                        value={formValue.rePassword}
                        onChange={onFormValueChange}
                    />
                </p>
                <button type='submit' className='send'>Register</button>
                <p> Already Have Account? Click Here <i className="fa-regular fa-hand-point-right"> </i> <Link to='/login'>Login</Link> </p>
            </form>
        </section>
    );
};