import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
    const { onLogin } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        email: '',
        password: ''
    });

    return (
        <div id="contact" className="login">
            <div className="brand-logo"></div>
            <h1 className="titlePage">Login</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className="login-form" onSubmit={(e) => onLogin(e, formValue)} >
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

            </div>
        </div>
    );
};
