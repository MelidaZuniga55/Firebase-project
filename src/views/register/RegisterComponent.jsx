import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../repositories/firebase/config';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '../../assets/css/styles.css';

const schema = yup.object({
    email: yup.string().email("Ingrese un correo válido").required("El correo es obligatorio"),
    password: yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "Debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
        .matches(/[a-z]/, "Debe contener al menos una minúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .matches(/[!@#$%&*?.,_:<>"|]/, "Debe contener un carácter especial"),
    confirm_password: yup.string()
        .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
});

const RegisterComponent = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmitForm = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                console.log("Usuario registrado:", userCredential.user);
                alert("Usuario registrado exitosamente");
                navigate('/login');
            })
            .catch((error) => {
                console.error(error.code, error.message);
                alert("Error al registrar usuario: " + error.message);
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 login-card">
                <h3 className="text-center mb-4">Registro</h3>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" {...register('email')} />
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" {...register('password')} />
                        <p className="text-danger">{errors.password?.message}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmar Contraseña</label>
                        <input type="password" className="form-control" {...register('confirm_password')} />
                        <p className="text-danger">{errors.confirm_password?.message}</p>
                    </div>

                    <button type="submit" className="btn mt-2">Registrarse</button>
                </form>

                <p className="text-center mt-3">
                    ¿Ya tienes cuenta?{' '}
                    <span 
                        style={{ color: "#6A4C93", cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => navigate('/login')}
                    >
                        Iniciar Sesión
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterComponent;
