/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBill, updateBill } from '../../../redux/actions';
import { Table, Select } from 'antd';

import './style.scss';
import useCustomSearch from '../CustomSearch';
const { Option } = Select;
export default function ManageOrder() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBill({}));
	}, [dispatch]);
	const order = useSelector((state) => state.paymentReducer.billData);
	const data = Object.values(order);

	const handleChange = (id, value) => {
		dispatch(updateBill({ id, Status: value }));
	};
	const columns = [
		{
			title: 'No',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'User Name',
			dataIndex: 'name',
			key: 'name',
			...useCustomSearch('name'),
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'User Email',
			dataIndex: 'email',
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'User Address',
			dataIndex: 'address',
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Date',
			dataIndex: 'date',
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Product',
			dataIndex: 'cartData',
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend', 'ascend'],
			render: (text, record) =>
				record?.dataCart?.map((item, index) => (
					<div key={index} className='product-admin'>
						<img src={item.img[0]} alt={item.name} className='product-admin__image' />
						<div className='product-admin__info'>
							<p>{item.name}</p>
							<p>{`x ${item.quantity}`}</p>
						</div>
						<p>{`${item.newPrice.toLocaleString('vi-VN')} VNĐ`}</p>
					</div>
				)),
		},
		{
			title: 'Status',
			dataIndex: 'id',
			render: (id, item) => (
				<Select defaultValue={item?.Status ? item.Status : 'Not Done'} style={{ width: 105 }} onChange={(value) => handleChange(id, value)}>
					<Option value='Not Done'>Not Done</Option>
					<Option value='Done'>Done</Option>
				</Select>
			),
		},
	];
	return (
		<div className='order'>
			<h1>Manage Orders</h1>
			<Table columns={columns} dataSource={data} rowKey='id' rowClassName='order__row'></Table>
		</div>
	);
}
