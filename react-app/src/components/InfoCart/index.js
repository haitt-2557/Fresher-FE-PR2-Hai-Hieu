/** @format */

import React from 'react';
import { Input, Badge, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography } from 'antd';

import './styles.scss';
const { Text } = Typography;

const InfoCart = () => {
	const product = useSelector((state) => state.cart);
	const data = product.cartData.map((item) => {
		return { ...item, total: (item.newPrice * item.quantity).toLocaleString('vi-VN') };
	});
	const location = useLocation();
	const renderCartData = (data) => {
		return data.map((item, index) => (
			<tr className='infoCart__cart--item'>
				<td className='infoCart__cart--img'>
					<Badge count={item.quantity}>
						<Avatar shape='square' src={item.img[0]} size='large' style={{ width: '6rem' }} />
					</Badge>
				</td>
				<td className='infoCart__cart--name-price'>
					<Text level={2} strong>
						{item.name}
					</Text>
					<Text level={1} strong>
						{(item.newPrice * item.quantity).toLocaleString()}
					</Text>
				</td>
			</tr>
		));
	};

	return (
		<section className='infoCart'>
			<div className=' infoCart__container'>
				<table className='infoCart__cart'>{renderCartData(data)}</table>
				<div className='infoCart__discount'>
					<form>
						<Input className='input' type='text' placeholder='Discount code'></Input>
						<button className='button' type='button'>
							Apply
						</button>
					</form>
				</div>
				<div className='infoCart__price'>
					<div className='infoCart__price--item'>
						<h4>Subtotal</h4>
						<p>{product.totalCost.toLocaleString()}</p>
					</div>

					<div className='infoCart__price--item'>
						<h4>Shipping</h4>
						<p>
							{(location.pathname === '/payment' ? 'Calculated at next step' : 0) ||
								(location.pathname === '/shipping' ? parseInt(20000).toLocaleString() : 0) ||
								(location.pathname === '/paymentConfirm' ? parseInt(20000).toLocaleString() : 0)}
						</p>
					</div>

					<div className='infoCart__price--total infoCart__price--item'>
						<h4>Total</h4>
						<p>
							<span>
								{(
									product.totalCost + (location.pathname === '/shipping' || location.pathname === '/paymentConfirm' ? 20000 : 0)
								).toLocaleString()}
							</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InfoCart;
