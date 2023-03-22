import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";


export const Register = () => {
    const { onRegister } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        username: '',
        email: '',
        password: '',
        rePassword: '',
    });

    return (
        <div id="contact" className="register">
            <div className="brand-logo"></div>
            <h1 className="titlePage">Register Form</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className="register-form" onSubmit={(e) => onRegister(e, formValue)} >
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label htmlFor="username">Username: </label>
                                    <input 
                                        className="username"
                                        placeholder="Username" 
                                        type="text" 
                                        name="username" 
                                        value={formValue.username} 
                                        onChange={onFormValueChange} 
                                    />
                                </div>
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
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label htmlFor="rePassword">Confirm Password: </label>
                                    <input 
                                        className="rePassword" 
                                        placeholder="Confirm Password" 
                                        type="password" 
                                        name="rePassword" 
                                        value={formValue.rePassword} 
                                        onChange={onFormValueChange} 
                                    />
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <button className="send">Register</button>
                                </div>
                                <div className="register-info">
                                    <p> Already Have Account? Click Here! <Link to='/login'>Login</Link> </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};
