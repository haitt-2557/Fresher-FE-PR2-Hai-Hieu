/** @format */

import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React, { useEffect } from 'react';
import { Avatar, Button, Typography } from '@material-ui/core';
import { Select, Menu, Dropdown } from 'antd';
import Vietnam from '../../assets/images/vi.svg';
import English from '../../assets/images/en.svg';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@material-ui/icons/Person';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { ToastContainer, toast } from 'react-toastify';
import './styles.scss';
import { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
const { Option } = Select;

export default function Header() {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [users, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	useEffect(() => {
		if (location.pathname === '/' && users) {
			const name = users?.user?.firstname + ' ' + users?.user?.lastname;
			if (!users.user?.name) {
				toast.success(`Welcome ${name}`, {
					position: toast.POSITION.TOP_RIGHT,
				});
			} else {
				toast.success(`Welcome ${users.user.name}`, {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
		}
	}, [users, location.pathname]);
	const { t, i18n } = useTranslation();
	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang);
	};
	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		setUser(null);
		history.push('/login');
	};
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);

	const userExpand = (
		<Menu>
			<Menu.Item>
				<Link to='/profile'>
					<Typography variant='h5'>{t('Profile.account.title')}</Typography>
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Typography onClick={logout} variant='h5'>
					{t('Logout')}
				</Typography>
			</Menu.Item>
		</Menu>
	);
	return (
		<>
			<header className='header'>
				<Container
					style={{
						height: '100%',
					}}>
					<div className='header__top'>
						<div className='header__top-infor'>
							<div className='infor__email'>
								<MailIcon />
								<span className='infor__email-address'>ogani@gmail.com</span>
								<span>{t('header_text')}</span>
							</div>
							<div className='infor__option'>
								<div className='infor__option-icon'>
									<FacebookIcon className='icon' />
									<TwitterIcon className='icon' />
									<LinkedInIcon className='icon' />
									<PinterestIcon className='icon' />
								</div>
								<div className='infor__option-language'>
									<Select
										defaultValue='en'
										className='language__select'
										onChange={changeLanguage}>
										<Option value='en'>
											<img
												src={English}
												className='language__select-img'
												alt='en'
											/>
											{t('language.english')}
										</Option>
										<Option value='vi'>
											<img
												src={Vietnam}
												className='language__select-img'
												alt='vi'
											/>
											{t('language.vietnam')}
										</Option>
									</Select>
								</div>
								<div className='infor__option-user'>
									{!users?.user ? (
										<>
											<PersonIcon />
											<Button
												component={Link}
												to='/login'
												className='user__loginBtn'>
												{t('Login')}
											</Button>
										</>
									) : (
										<div className='user__infor'>
											<Avatar
												className='user__infor-avatar'
												src={users?.user.imageUrl}
												alt={
													users?.user.name
														? users.user.name
														: users?.user?.firstname +
														  ' ' +
														  users?.user?.lastname
												}>
												{users.user.name
													? users.user.name.charAt(0)
													: (
															users?.user?.firstname +
															' ' +
															users?.user?.lastname
													  ).charAt(0)}
											</Avatar>
											<Dropdown
												overlay={userExpand}
											>
												<Typography
													className='user__infor-name'
													variant='h5'>
													{users?.user.name
														? users.user.name
														: users?.user?.firstname +
														  ' ' +
														  users?.user?.lastname}
												</Typography>
											</Dropdown>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</Container>
			</header>
			<Container>
				<Navbar onChange={changeLanguage} />
			</Container>
			<ToastContainer autoClose='2500' />
		</>
	);
}
