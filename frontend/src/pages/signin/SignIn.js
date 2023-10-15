import React, { Component } from "react";
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../constants/Connect";
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { login } from "../../services/fetch/ApiUtils";
import { useState } from "react";

function SignIn(props) {
    const history = useNavigate();
    const location = useLocation();
    const [formState, setFormState] = React.useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (location.state && location.state.error) {
            setTimeout(() => {
                toast.error(location.state.error, {
                    timeout: 5000
                });
                history.replace({
                    pathname: location.pathname,
                    state: {}
                });
            }, 100);
        }
    }, [location.state, location.pathname, history]);



    if (props.authenticated === true) {
        return <Navigate
            to={{
                pathname: "/dashboard",
                state: { from: location }
            }} />;
    }


    return (
        <>
            <main class="d-flex w-100">
                <div class="container d-flex flex-column">
                    <div class="row vh-100">
                        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                            <div class="d-table-cell align-middle">

                                <div class="text-center mt-4">
                                    <h1 class="h2">Welcome back!</h1>
                                    <p class="lead">
                                        Sign in to your account to continue
                                    </p>
                                </div>

                                <div class="card">
                                    <div class="card-body">
                                        <div class="m-sm-3">
                                            <LoginForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
function LoginForm() {
    const history = useNavigate();
    const [formState, setFormState] = useState({
        email: '',
        password: ''
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

        const loginRequest = { ...formState };

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                toast.success("Bạn đã đăng nhập thành công!!");
                history("/dashboard");
                window.location.reload();
            }).catch(error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label class="form-label">Email</label>
            <input class="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" value={formState.email} onChange={handleInputChange} required />
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input class="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" value={formState.password} onChange={handleInputChange} required />
        </div>
        <div>
            <div class="form-check align-items-center">
                <input id="customControlInline" type="checkbox" class="form-check-input" value="remember-me" name="remember-me" checked />
                <label class="form-check-label text-small" for="customControlInline">Remember me</label>
            </div>
        </div>
        <div class="d-grid gap-2 mt-3">
            <button type="submit" class="btn btn-lg btn-primary">Sign in</button>
        </div>
    </form>
    )
}

export default SignIn;







