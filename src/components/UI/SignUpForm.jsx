import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormHeading } from "../UI/FormHeading";
import { SignInputs } from "../UI/SignInputs";
import { SubmitButton } from "../UI/SubmitButton";

export function SignUpForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
    
            const formData = {
                name: name,
                username: username,
                email: email,
                password: password,
            };
    
            const response = await fetch('https://attimo-backend.vercel.app/public/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok');
            }
    
            // Registro exitoso, redirigir a la página deseada
            console.log('Registration successful');
            navigate('/Questions'); // Redirigir a la página deseada después del registro exitoso
    
        } catch (error) {
            console.error('Error registering user:', error.message);
            setError(error.message); // Mostrar el mensaje de error específico
        }
    };
    

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="sign-up-form forms-authentification px-10 py-0 w-full h-full flex flex-col justify-center gap-8 col-[1_/_2] row-[1_/_2] transition-opacity duration-[0.02s] delay-[0.3s] mx-auto my-0 opacity-0 pointer-events-none">
            <FormHeading title="Get Started" subHeading="Already have an account?" linkText="Sign In" />
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <SignInputs type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <SignInputs type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <SignInputs type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <SignInputs type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <SubmitButton value="Sign Up" subHeading="By signing up, I agree to the " linkText="Terms of services" />
        </form>
    );
}
