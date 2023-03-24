import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { login} from '../../service/authService';

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
        <div className="login">
            <div className="brand-logo"></div>
            <h1 className="titlePage">Login</h1>
            <div className="container">
                <form className="login-form" onSubmit={onLogin} >
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label htmlFor="email">Email: </label>
                            <input
                                className="email"
                                placeholder="Email"
                                type="text"
                                name="email"
                                value={formValue.email}
                                onChange={onFormValueChange}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label htmlFor="password">Password: </label>
                            <input
                                className="password"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={formValue.password}
                                onChange={onFormValueChange}
                            />
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <button className="send">Login</button>
                        </div>
                        <div className="login-info">
                            <p> Don't Have An Account? Click Here! <Link to='/register'>Register</Link> </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};