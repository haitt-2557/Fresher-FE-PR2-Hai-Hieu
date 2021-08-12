/** @format */

import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from 'react';
import { Select } from 'antd';
import { Button } from '@material-ui/core';
import Vietnam from '../../assets/images/vi.svg';
import English from '../../assets/images/en.svg';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { ToastContainer, toast } from 'react-toastify';
import './styles.scss';
import { useState } from 'react';
import Navbar from './Navbar';
const { Option } = Select;

export default function Header() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	if (user) {
		toast.success(`Welcome ${user.name}`, {
			position: toast.POSITION.TOP_RIGHT,
		});
	}
	const { t, i18n } = useTranslation();
	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang);
	};
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
									<PersonIcon />
									<Button component={Link} to='/login' className='user__loginBtn'>
										{t('Login')}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</header>
			<Container>
				<Navbar onChange={changeLanguage} />
			</Container>
		</>
	);
}
