/** @format */

import React, { useEffect } from 'react';
import { Col, Row, Table, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import UserSidebar from '../../../components/User/sidebar';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBill } from '../../../redux/actions';
export default function Purchase() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const userInfo = useSelector((state) => state.auth.authData);
	const order = useSelector((state) => state.paymentReducer.billData);
	const data = Object.values(order);
	useEffect(() => {
		dispatch(getBill({ email: userInfo.user.email }));
	}, [dispatch, userInfo.user.email]);

	const columns = [
		{
			title: 'Product',
			dataIndex: 'cartData',

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
			title: 'Date',
			dataIndex: 'date',
		},
		{
			title: 'Total',
			dataIndex: 'totalCost',
			render: (text) => <span>{`${text.toLocaleString('vi-VN')} VNĐ`}</span>,
		},
	];
	return (
		<div className='profile'>
			<Row gutter={24}>
				<UserSidebar />
				<Col lg={18}>
					<div className='profile__order'>
						{data.length > 0 ? (
							<Table
								dataSource={data}
								columns={columns}
								rowClassName='profile__order-table'
								pagination={{ defaultPageSize: '3' }}></Table>
						) : (
							<div className='profile__order-noOrder '>
								<div className='noOrder__img '>
									<img src='https://i.imgur.com/Drj57qu.png' alt='nonProduct' />
								</div>
								<div className='noOrder__btn'>
									<p>{t('orderHistory.content')}</p>
									<Button onClick={() => history.push('/shop')}>{t('cart.Continue Shopping')}</Button>
								</div>
							</div>
						)}
					</div>
				</Col>
			</Row>
		</div>
	);
}
