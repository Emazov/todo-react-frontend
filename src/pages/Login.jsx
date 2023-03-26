import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLocal } from '../localStorage/authLocal';

const Login = () => {
	const [inputs, setInputs] = useState({
		username: '',
		password: '',
	});

	const [err, setErr] = useState(null);

	const changeHandler = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const navigate = useNavigate();
	const { login } = useContext(AuthLocal);

	const submitHandler = async (e) => {
		e.preventDefault();
		const auth_btn = document.querySelector('.auth_btn');
		auth_btn.textContent = 'Loading...';
		try {
			await login(inputs);
			setTimeout(() => {
				navigate('/');
			}, 2000);
		} catch (err) {
			setErr(err.response.data);
		}
	};
	return (
		<div className='auth_wrap'>
			<h2 className='auth_title'>Login</h2>
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
					type='password'
					name='password'
					placeholder='Password'
					className='auth_input'
					onChange={changeHandler}
				/>
				<button className='auth_btn' onClick={submitHandler}>
					Login
				</button>
				{err && <p>{err}</p>}
				<span>
					Don't have an account? <Link to='/register'>register</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
