import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../img/logo.png';
import { AuthLocal } from '../localStorage/authLocal';

const Header = () => {
	const { localUser, logout } = useContext(AuthLocal);

	return (
		<div className='header'>
			<div className='header_container'>
				<div className='header_logo'>
					<Link to='/'>
						<img src={Logo} alt='' />
					</Link>
				</div>
				<div className='header_info'>
					<span>{localUser?.username}</span>
					{localUser ? (
						<span onClick={logout}>Logout</span>
					) : (
						window.location.replace('/login')
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
