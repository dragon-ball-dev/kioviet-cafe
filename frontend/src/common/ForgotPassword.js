import React, { Component } from "react";
import './ForgotPassword.css';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { forgotPassword } from "../services/fetch/ApiUtils";
import { toast } from "react-toastify";

function ForgotPassword() {
    return (
        <>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 order-md-2">
                            <img src="../../assets/img/undraw_file_sync_ot38.svg" alt="Image" className="img-fluid" />
                        </div>
                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3>Forgot Password</h3>
                                        <p className="mb-4">Fill in the email of the page you logged in on our website.</p>
                                    </div>
                                    <ForgotPasswordForm />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}




function ForgotPasswordForm() {
    const history = useNavigate();
    const [formState, setFormState] = useState({
        email: '',
    });

    const handleInputChange = event => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        setFormState(prevState => ({
            ...prevState,
            [inputName]: inputValue
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        const emailRequest = { ...formState };

        forgotPassword(emailRequest)
        .then(response => {
            toast.success(response.message);
            history("/");
        }).catch(error => {
            toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
        });


    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group first">
                <span>Email</span>
                <input type="email" className="form-control" name="email" value={formState.email} onChange={handleInputChange} required />

            </div>
            <input type="submit" value="Send Request" className="btn text-white btn-block " style={{ background: "#38d39f" }} />
        </form>
    )
}

export default ForgotPassword;