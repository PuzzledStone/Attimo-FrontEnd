import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormHeading } from "./FormHeading";
import { SignInputs } from "../UI/SignInputs";
import { SubmitButton } from "../UI/SubmitButton";

export function SignInForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://attimo-backend.vercel.app/public/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/attimo');
            } else {
                
                setError('Incorrect credentials. Please try again.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Network error. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="forms-authentification sign-in-form login-forms px-10 py-0 w-full h-full flex flex-col justify-center gap-8 col-[1_/_2] row-[1_/_2] transition-opacity duration-[0.02s] delay-[0.3s] mx-auto my-0">
            <FormHeading title="Welcome Back" subHeading="Not registered yet?" linkText="Sign Up" />
            {error && <p className="text-red-500">{error}</p>}
            {loading && (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}
            <div>
                <SignInputs type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />  
                <SignInputs type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
            </div>
            <SubmitButton value="Sign In" subHeading="Forgot your password?" linkText="Recover it" link="/recoverPassword" disabled={loading} />
        </form>
    );
}

