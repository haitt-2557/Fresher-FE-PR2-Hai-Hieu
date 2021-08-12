/** @format */

import { Layout, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import AdminSidebar from './Sidebar/sidebar';
import './style.scss';
const { Header, Content, Sider } = Layout;
export default function HomeAdmin({ children }) {
	console.log(children);
	const [collapse, setCollapse] = useState(false);
	return (
		<Layout>
			<Layout>
				<AdminSidebar collapse={collapse} />
				<Layout>
					<Header className='header'></Header>
					<Content>{children}</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
