/** @format */

import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import UserSidebar from '../../../components/User/sidebar';
import './style.scss';
import { useHistory } from 'react-router-dom';
export default function Purchase() {
	const data = [];
	const history = useHistory();
	const { t } = useTranslation();
	return (
		<div className='profile'>
			<Row gutter={24}>
				<UserSidebar />
				<Col lg={18}>
					<div className='profile__order'>
						{data.length > 0 ? (
							<Table dataSource={data} rowClassName='profile__order-table' pagination={{ defaultPageSize: '3' }}></Table>
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
