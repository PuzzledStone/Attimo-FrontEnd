import React from "react";
import PropTypes from 'prop-types';

export function SignInputs({ type, name, value, onChange, isActive }) {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    return (
        <div className="input-wrap relative h-[37px] mb-8">
            <input 
                type={type}
                name={name}
                minLength={type === 'password' ? '6' : '4'} // Ajustamos la longitud mínima aquí según el tipo
                className={`input-field absolute duration-300 w-full h-full text-[0.95rem] text-clr-dark-blue transition-[0.4s] p-0 border-b-clr-light-gray border-b border-solid bg-none outline-none bg-transparent dark:text-clr-white/80 ${isActive ? 'active' : ''}`}
                autoComplete="off"
                required
                value={value} // Usamos value para el valor controlado
                onChange={onChange} // Manejador onChange para actualizar el valor
            />
            <label className="absolute -translate-y-2/4 text-[0.95rem] duration-300 text-clr-light-gray dark:text-clr-white pointer-events-none transition-[0.4s] left-0 top-2/4">{formattedName}</label>
        </div>
    );
}

SignInputs.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    isActive: PropTypes.bool,
};

SignInputs.defaultProps = {
    value: "",
    isActive: false,
};
