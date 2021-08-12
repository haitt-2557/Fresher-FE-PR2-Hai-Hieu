/** @format */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Avatar, Typography } from '@material-ui/core';
import { FiMenu } from 'react-icons/fi';
import logo from '../../../assets/images/logo.png';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Menu, Drawer, Dropdown, Button } from 'antd';
import './style.scss';
import { Select } from 'antd';
import Vietnam from '../../../assets/images/vi.svg';
import English from '../../../assets/images/en.svg';
import PersonIcon from '@material-ui/icons/Person';
import { MinusOutlined, PlusOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import product from '../../../assets/images/cat-4.jpg';
const { Option } = Select;
const navbarData = [
	{
		id: 1,
		name: 'Home',
		path: '/',
	},
	{
		id: 2,
		name: 'Shop',
		path: '/shop',
	},
	{
		id: 3,
		name: 'Pages',
		dropdown: [
			{
				id: 1,
				name: 'Shoping Cart',
				path: '/cart',
			},
			{
				id: 2,
				name: 'Checkout',
				path: '/checkout',
			},
			{
				id: 3,
				name: 'Blog',
				path: '/blog',
			},
		],
	},
	{
		id: 4,
		name: 'Blog',
		path: '/blog',
	},
	{
		id: 5,
		name: 'Contact',
		path: '/contact',
	},
];

export default function Navbar({ onChange, users, userExpand }) {
	const { t } = useTranslation();
	const location = useLocation();
	const [visible, setVisible] = useState(false);
	const [visibleMobile, setVisibleMobile] = useState(false);
	const [quantity, setQuantity] = useState(0);
	const menu = (data) => {
		return data.map((item, index) =>
			!item.dropdown ? (
				<Link to={item.path} key={`item-${index + 5}`} className={location.pathname === item.path ? 'navbar__menu-item active' : 'navbar__menu-item'}>
					{t(item.name)}
				</Link>
			) : (
				<span className='navbar__menu-item navbar__menu-item--hasChild' key={`key+${index}`}>
					{t(item.name)}
					<Menu className='drop__menu'>
						{item.dropdown.map((drop, index) => (
							<Menu.Item key={`drop-${drop.id + 1 + index}`}>
								<Link to={drop.path} className='drop__menu-link' key={`item-${index}`}>
									{t(drop.name)}
								</Link>
							</Menu.Item>
						))}
					</Menu>
				</span>
			),
		);
	};
	const menuMobile = (data) => {
		return (
			<div className='menu__item'>
				{data.map((item, index) =>
					!item.dropdown ? (
						<Link to={item.path} key={`link-${index + 1}`} className={location.pathname === item.path ? 'menu__item-link active' : 'menu__item-link'}>
							{t(item.name)}
						</Link>
					) : (
						<span className='menu__item-link menu__item-link--hasChild' key={`key+${index + 1}`}>
							{item.name}
							<Menu className='menu__item-drop'>
								{item.dropdown.map((drop, index) => (
									<Menu.Item key={`menu-${drop.id + 1 + index}`}>
										<Link to={drop.path} className='drop__link' key={index * 2 + 10}>
											{t(drop.name)}
										</Link>
									</Menu.Item>
								))}
							</Menu>
						</span>
					),
				)}
			</div>
		);
	};
	const onShowDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};
	const onShowMobile = () => {
		setVisibleMobile(true);
	};
	const onCloseMobile = () => {
		setVisibleMobile(false);
	};
	return (
		<div className='navbar'>
			<Link to='/'>
				<img src={logo} className='navbar__logo' alt='logo' />
			</Link>
			<div className='navbar__menu'>{menu(navbarData)}</div>
			<div className='navbar__cart'>
				<div className='navbar__cart-icon'>
					<div className='icon__wish'>
						<FavoriteIcon className='icon__wish-icon' />
						<span className='icon__wish-number'>1</span>
					</div>
					<div className='icon__cart site-drawer-render-in-current-wrapper'>
						<ShoppingCartIcon className='icon__cart-icon' onClick={onShowDrawer} />
						<span className='icon__cart-number'>1</span>
						<Drawer title={t('Cart')} width={360} placement='right' closable={false} onClose={onClose} visible={visible} getContainer={false}>
							<div className='cart-drawer'>
								<div className='cart-drawer__product'>
									<img src={product} alt='Product' className='cart-drawer__product-img' />
									<div className='cart-drawer__product-desc'>
										<h3 className='desc__title'>Milk</h3>
										<span className='desc__price'>$169</span>
										<div className='desc__quantity'>
											<Button icon={<MinusOutlined />} />
											<span className='desc__quantity-number'>1</span>
											<Button icon={<PlusOutlined />} />
										</div>
									</div>
								</div>
								<DeleteOutlined className='cart-drawer__delete' />
							</div>
							<div className='drawer-footer'>
								<div className='drawer-footer__total'>
									<span className='drawer-footer__total-text'>{t('cart.Total')}</span>
									<span className='drawer-footer__total-price'>$169.00</span>
								</div>
								<Link to='/cart' onClick={onClose}>
									<Button shape='round' icon={<ShoppingCartOutlined />} size='large' className='drawer-footer__btn'>
										{t('Cart')}
									</Button>
								</Link>
							</div>
						</Drawer>
					</div>
				</div>
			</div>
			<div className='navbar__mobile'>
				<div className='navbar__mobile' onClick={onShowMobile}>
					<FiMenu />
				</div>
				<Drawer width={320} placement='left' closable={false} onClose={onCloseMobile} visible={visibleMobile} getContainer={false}>
					<div className='navbar__mobile-logo'>
						<img src={logo} alt='logo' />
					</div>
					<div className='navbar__mobile-user'>
						<Select defaultValue='en' className='user__select' onChange={onChange}>
							<Option value='en'>
								<img src={English} className='user__select-img' alt='en' />
								{t('language.english')}
							</Option>
							<Option value='vi'>
								<img src={Vietnam} className='user__select-img' alt='vi' />
								{t('language.vietnam')}
							</Option>
						</Select>
						<div className='user__info'>
							{!users?.user ? (
								<>
									<PersonIcon />
									<Link to='/login' className='user__info-btn' onClick={onCloseMobile}>
										{t('Login')}
									</Link>
								</>
							) : (
								<div className='user__infor'>
									<Avatar className='user__infor-avatar' src={users?.user.imageUrl} alt={users?.user.name ? users.user.name : users?.user?.firstname + ' ' + users?.user?.lastname}>
										{users.user.name ? users.user.name.charAt(0) : (users?.user?.firstname + ' ' + users?.user?.lastname).charAt(0)}
									</Avatar>
									<Dropdown overlay={userExpand}>
										<Typography className='user__infor-name' variant='h5'>
											{users?.user.name ? users.user.name : users?.user?.firstname + ' ' + users?.user?.lastname}
										</Typography>
									</Dropdown>
								</div>
							)}
						</div>
					</div>
					<div className='navbar__mobile-menu'>{menuMobile(navbarData)}</div>
				</Drawer>
			</div>
		</div>
	);
}
