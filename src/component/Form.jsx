import React, { useState, useEffect } from 'react';
import styles from './Styles.module.css';

function FormFunction() {
    const [isTrue, setIsTrue] = useState(true); 
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState('');
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        const existingUser = localStorage.getItem('userData');
        if (existingUser) {
            setRegistered(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        let err = '';

        if (!formData.username || !formData.password) {
            err = 'All fields are required!';
        } else if (isTrue) {
            if (registered) {
                err = 'A user is already registered!';
            } else if (formData.password !== formData.confirmPassword) {
                err = 'Passwords do not match!';
            } else {
                const userData = {
                    username: formData.username,
                    password: formData.password
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                setRegistered(true);
                alert('Registration successful!');
                resetForm();
            }
        } else {
            if (!registered) {
                err = 'No user found! Please register first.';
            } else {
                const storedData = JSON.parse(localStorage.getItem('userData'));
                if (storedData.username === formData.username && storedData.password === formData.password) {
                    alert('Login successful!');
                    resetForm();
                } else {
                    err = 'Invalid username or password!';
                }
            }
        }

        if (err) {
            setErrors(err);
        } else {
            setErrors('');
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <button
                    className={`${styles.btn} ${!isTrue ? styles.active : ''}`}
                    onClick={() => { setIsTrue(false); setErrors(''); }}
                >
                    SignUp
                </button>
                <button
                    className={`${styles.btn} ${isTrue ? styles.active : ''}`}
                    onClick={() => { setIsTrue(true); setErrors(''); }}
                >
                    Register
                </button>

                {errors && <p className={styles.error}>{errors}</p>}

                {isTrue ? (
                    <div className={styles.registerForm}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your email"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button className={styles.submitBtn} onClick={handleSubmit}>
                            Register
                        </button>
                    </div>
                ) : (
                    <div className={styles.signUpForm}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your email"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button className={styles.submitBtn} onClick={handleSubmit}>
                            SignIn
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FormFunction;
