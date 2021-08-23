/** @format */

import { Avatar } from '@material-ui/core';
import { Col, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { BiPurchaseTag } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import './style.scss';
export default function UserSidebar() {
	const users = useSelector((state) => state.auth.authData);
	const { t } = useTranslation();
	const location = useLocation();
	const option = [
		{ name: 'user-info', path: '/profile', icon: <AiOutlineUser className='item__link-icon' /> },
		{ name: 'order-history', path: '/profile/purchases/', icon: <BiPurchaseTag className='item__link-icon' /> },
		{ name: 'change-pass', path: '/profile/password', icon: <RiLockPasswordLine className='item__link-icon' /> },
	];
	return (
		<Col lg={6}>
			<div className='user-side'>
				<div className='user-side__avatar'>
					<Avatar
						className='user-avatar'
						src={users?.user.imageUrl}
						alt={users?.user.name ? users.user.name : users?.user?.firstname + ' ' + users?.user?.lastname}>
						{users.user.name ? users.user.name.charAt(0) : (users?.user?.firstname + ' ' + users?.user?.lastname).charAt(0)}
					</Avatar>
					<div>{users?.user.name ? users.user.name : users?.user?.firstname + ' ' + users?.user?.lastname}</div>
				</div>

				<ul className='user-side__option'>
					{option.map((item, index) => (
						<li className='user-side__option-item' key={index}>
							<Link to={item.path} className={location.pathname === item.path ? 'item__link active' : 'item__link'}>
								{item.icon}
								{t(`Profile.account.${item.name}`)}
							</Link>
						</li>
					))}

					{/* <li className='user-side__option-item'>
						<Link to='/profile/purchase' className='item__link'>
							<BiPurchaseTag className='item__link-icon' />
							{t('Profile.account.order-history')}
						</Link>
					</li>
					<li className='user-side__option-item'>
						<Link to='profile/password' className='item__link'>
							<RiLockPasswordLine className='item__link-icon' />
							{t('Profile.account.change-pass')}
						</Link>
					</li> */}
				</ul>
			</div>
		</Col>
	);
}
