/** @format */

import { Menu, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
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
			<Link to='/admin'>
				<div className='logo'></div>
			</Link>
			<Menu theme='light' mode='inline' style={{ border: 'none', fontSize: '16px' }}>
				<SubMenu key='sub1' icon={<BiFoodMenu />} title={t('product')}>
					<Menu.Item key='1'>
						<Link to='/admin/manage-product'>{t('manage-product')}</Link>
					</Menu.Item>
					<Menu.Item key='2'>
						<Link to='/admin/productCreateAdmin'>{t('add-product')}</Link>
					</Menu.Item>
				</SubMenu>
				<SubMenu key='sub2' icon={<AiFillDatabase />} title={t('order')}>
					<Menu.Item key='3'>
						<Link to='/admin/manage-order'></Link>
						{t('manage-order')}
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
