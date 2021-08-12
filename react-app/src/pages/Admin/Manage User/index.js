/** @format */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Select, Modal, Button } from 'antd';
import useCustomSearch from '../CustomSearch';
import { changeRole, deleteUser, getUser } from '../../../redux/actions';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './style.scss';
import { useTranslation } from 'react-i18next';
const { Option } = Select;
const { confirm } = Modal;
export default function ManaUser() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getUser({}));
	}, [dispatch]);
	const user = useSelector((state) => state.accountReducer.user);
	const data = Object.values(user);

	const columns = [
		{
			title: 'N.o',
			key: 'id',
			dataIndex: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			...useCustomSearch('name'),
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			...useCustomSearch('email'),
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: ' Address',
			dataIndex: 'address',
			key: 'address',
			...useCustomSearch('address'),
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			...useCustomSearch('phone'),
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Birdthday',
			dataIndex: 'birthday',
			key: 'birthday',
			...useCustomSearch('birthday'),
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
			render: (role, user) => (
				<Select defaultValue={user?.role} style={{ width: 85 }} onChange={(value) => dispatch(changeRole({ id: user.id, role: value }))}>
					<Option value='user'>User</Option>
					<Option value='admin'>Admin</Option>
				</Select>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			dataIndex: 'name',
			render: (name, user) => (
				<Space>
					<Button className='delete-btn' type='danger' disabled={user?.role === 'user' ? false : true}>
						<DeleteOutlined
							style={{
								cursor: user?.role === 'user' ? 'pointer' : 'no-drop',
								fontSize: 18,
							}}
							onClick={() => showConfirm(name, user)}
						/>
					</Button>
				</Space>
			),
		},
	];

	function showConfirm(name, user) {
		confirm({
			title: t('cart.Are you sure delete this product?'),
			icon: <ExclamationCircleOutlined />,
			content: name,
			okText: t('cart.Yes'),
			okType: 'danger',
			cancelText: t('cart.No'),
			onOk() {
				dispatch(deleteUser({ id: user.id }));
			},
		});
	}

	return (
		<div className='user'>
			<h1>Manage Users</h1>
			<Table columns={columns} dataSource={data} rowKey='id' rowClassName='user__row'></Table>
		</div>
	);
}
