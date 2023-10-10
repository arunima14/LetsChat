import React, { useState, useEffect } from 'react'
import { usePostLoginMutation, usePostSignupMutation } from '../../state/api';
import { Navigate } from 'react-router-dom';

const Login = ({ setUser, setSecret}) => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [triggerLogin, resultLogin] = usePostLoginMutation();
    const [triggerSignup] = usePostSignupMutation();


    const handleLogin = () => {
        triggerLogin({ username, password});
        // <Navigate to='/chat' />
    };

    const handleRegister = () => {
        triggerSignup({ username, password});
    };

    useEffect(() => {
        if(resultLogin.data?.response){
            setUser(username);
            setSecret(password);
        }
    }, [resultLogin.data]);

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h2 className='title'>Let's Chat</h2>
                <p className='register-change' onClick={() => setIsRegistered(!isRegistered)}>
                    {isRegistered ? "Already a user?" : "Create Account!"}
                </p>

                <div className=''>
                    <input className='login-input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />

                    <input className='login-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='login-actions'>
                    {isRegistered ? (
                        <button type='button' onClick={handleRegister}>Register</button>
                    ) : (
                        <button type='button' onClick={handleLogin}>Login</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login