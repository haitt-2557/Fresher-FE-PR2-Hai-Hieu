/** @format */

import { Col, Menu, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { BiFoodMenu } from 'react-icons/bi';
import { AiFillDatabase } from 'react-icons/ai';
import { HiUsers } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
const { Sider } = Layout;
const { SubMenu } = Menu;
export default function AdminSidebar({ collapse }) {
	const { t } = useTranslation();
	return (
		<Sider width={260} className='admin-sidebar' trigger={null} collapsible collapsed={collapse} theme='light'>
			<div>
				<Link to='/admin'>
					<img src={logo} alt='logo' />
				</Link>
			</div>
			<Menu theme='light' mode='inline' style={{ border: 'none', fontSize: '16px' }}>
				<SubMenu key='sub1' icon={<BiFoodMenu />} title={t('product')}>
					<Menu.Item key='1'>
						<Link to='/admin/manage-product'>{t('manage-product')}</Link>
					</Menu.Item>
					<Menu.Item key='2'>
						<Link to='/admin/add-product'>{t('add-product')}</Link>
					</Menu.Item>
				</SubMenu>
				<SubMenu key='sub2' icon={<AiFillDatabase />} title={t('category')}>
					<Menu.Item key='3'>
						<Link to='/admin/manage-category'></Link>
						{t('manage-category')}
					</Menu.Item>
					<Menu.Item key='4'>
						<Link to='/admin/add-category'>{t('add-category')}</Link>
					</Menu.Item>
				</SubMenu>
				<SubMenu key='sub3' icon={<HiUsers />} title={t('user')}>
					<Menu.Item key='5'>
						<Link to='/admin/manage-user'>{t('manage-user')}</Link>
					</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
}
