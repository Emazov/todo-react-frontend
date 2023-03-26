import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
	const [inputs, setInputs] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [err, setErr] = useState(null);

	const changeHandler = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await axios.post('/auth/register', inputs);
			navigate('/login');
		} catch (err) {
			setErr(err.response.data);
		}
	};

	return (
		<div className='auth_wrap'>
			<h2 className='auth_title'>Register</h2>
			<form action='' className='auth_form'>
				<input
					required
					type='text'
					name='username'
					placeholder='Username'
					className='auth_input'
					onChange={changeHandler}
				/>
				<input
					required
					type='email'
					name='email'
					placeholder='Email'
					className='auth_input'
					onChange={changeHandler}
				/>
				<input
					required
					type='password'
					name='password'
					placeholder='Password'
					className='auth_input'
					onChange={changeHandler}
				/>
				<button className='auth_btn' onClick={submitHandler}>
					Register
				</button>
				{err && <p>{err}</p>}
				<span>
					Already have an account? <Link to='/login'>login</Link>
				</span>
			</form>
		</div>
	);
};

export default Register;
