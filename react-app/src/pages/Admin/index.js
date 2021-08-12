/** @format */

import { Layout, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import AdminSidebar from './Sidebar/sidebar';
import './style.scss';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Avatar, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { Header, Content } = Layout;
export default function HomeAdmin({ children }) {
	const [collapse, setCollapse] = useState(false);
	const users = useSelector((state) => state.auth.authData);
	const dispatch = useDispatch();
	const history = useHistory();
	const { t } = useTranslation();
	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		history.push('/login');
	};
	const adminExpand = (
		<Menu>
			<Menu.Item key={2}>
				<Typography onClick={logout} variant='h5'>
					{t('Logout')}
				</Typography>
			</Menu.Item>
		</Menu>
	);
	return (
		<Layout>
			<Layout>
				<AdminSidebar collapse={collapse} />
				<Layout>
					<Header className='header'>
						<div className='header__icon' onClick={() => setCollapse(!collapse)}>
							{collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						</div>
						<div className='header__avatar'>
							<Avatar className='' src={users?.user.imageUrl} alt={users?.user.name}>
								{users?.user.name ? users.user.name.charAt(0) : (users?.user?.firstname + ' ' + users?.user?.lastname).charAt(0)}
							</Avatar>
							<Dropdown overlay={adminExpand}>
								<Typography className='header__avatar-name' variant='h5'>
									{users?.user.name ? users.user.name : users?.user?.firstname + ' ' + users?.user?.lastname}
								</Typography>
							</Dropdown>
						</div>
					</Header>
					<Content style={{ margin: '15px', height: '100vh' }}>{children}</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
