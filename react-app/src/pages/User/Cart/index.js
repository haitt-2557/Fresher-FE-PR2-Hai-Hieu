/** @format */

import React, { useEffect } from 'react';
import { Table, Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { DeleteOutlined, ExclamationCircleOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteCart, updateCart } from '../../../redux/actions/cart.action';
import { Link } from 'react-router-dom';
const { Column } = Table;
const { confirm } = Modal;
export default function Cart() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const product = useSelector((state) => state.cart);
	const data = product.cartData.map((item) => {
		return { ...item, total: (item.newPrice * item.quantity).toLocaleString('vi-VN') };
	});

	const user = localStorage.getItem('profile');
	let type;

	useEffect(() => {
		document.title = 'Oragin | Cart';
		const body = document.querySelector('#root');
		body.scrollIntoView({ behavior: 'smooth' }, 500);
	}, []);

	function showConfirm(name, item) {
		confirm({
			title: t('cart.Are you sure delete this product?'),
			icon: <ExclamationCircleOutlined />,
			content: name,
			okText: t('cart.Yes'),
			okType: 'danger',
			cancelText: t('cart.No'),
			onOk() {
				dispatch(deleteCart(item));
			},
		});
	}

	function showDeleteAll() {
		confirm({
			title: t('cart.Do you want to delete all products'),
			icon: <ExclamationCircleOutlined />,
			okText: t('cart.Yes'),
			okType: 'danger',
			cancelText: t('cart.No'),
			onOk() {
				dispatch(deleteCart());
			},
		});
	}

	return (
		<>
			<section className='product-banner'>
				<h1 className='product-banner__title'>{t('home.banner.cart')}</h1>
				<p className='product-banner__bread'>{t('home.banner.cart-bread')}</p>
			</section>
			<section className='cart'>
				<Table dataSource={data} rowClassName='cart__table' pagination={{ defaultPageSize: '3' }}>
					<Column
						className='cart__table-header'
						title={t('cart.Product')}
						dataIndex='name'
						key='name'
						render={(name, item) => (
							<div className='cart__table-item'>
								<img src={item.img[0]} alt={item.name} className='item__img' />
								<p className='item__name'>{name}</p>
							</div>
						)}></Column>
					<Column
						className='cart__table-header'
						title={t('cart.Price')}
						dataIndex='newPrice'
						key='newPrice'
						render={(newPrice) => <span>{newPrice.toLocaleString('vi-VN')}</span>}></Column>
					<Column
						className='cart__table-header'
						title={t('cart.Quantity')}
						dataIndex='quantity'
						key='quantity'
						render={(quantity, item, index) => (
							<div className='cart__table-quantity' key={index + 1}>
								<Button icon={<MinusOutlined />} onClick={() => dispatch(updateCart((type = 'decrease'), item))} />
								<span className='quantity__number'>{quantity}</span>
								<Button icon={<PlusOutlined />} onClick={() => dispatch(updateCart((type = 'increase'), item))} />
							</div>
						)}></Column>
					<Column className='cart__table-header' title={t('cart.Total')} dataIndex='total' key='total'></Column>
					<Column
						className='cart__table-header'
						key='id'
						dataIndex='name'
						render={(name, item) => (
							<DeleteOutlined className='cart-drawer__delete' key='tagId' onClick={() => showConfirm(name, item)} />
						)}></Column>
				</Table>
			</section>
			<div className='cart-bottom'>
				<Link to='/shop'>
					<Button className='cart-bottom__continue'>{t('cart.Continue Shopping')}</Button>
				</Link>
				<Button className='cart-bottom__continue' onClick={showDeleteAll} style={{ display: product.cartData.length > 0 ? 'flex' : 'none' }}>
					{t('cart.Clear Cart')}
				</Button>
			</div>
			<div className='cart-bottom__total'>
				<div className='wrap'>
					<h3 className='cart-bottom__total-header'>{t('cart.Total Cart')}</h3>
					<div className='cart-bottom__total-price'>
						<span className='price__sub'>{t('cart.Subtotal')}</span>
						<span className='price__total'>{`${product.totalCost.toLocaleString('vi-VN')} VNĐ`}</span>
					</div>
					<div className='cart-bottom__total-price'>
						<span className='price__sub'>{t('cart.Total')}</span>
						<span className='price__total'>{`${product.totalCost.toLocaleString('vi-VN')} VNĐ`}</span>
					</div>
					<Link to='/payment' className='checkout' style={{ pointerEvents: user && product.cartData.length > 0 ? 'default' : 'none' }}>
						<Button className='checkout-btn' disabled={user && product.cartData.length > 0 ? false : true}>
							{t('cart.Checkout')}
						</Button>
					</Link>
					<div className='need-login' style={{ display: !user && product.cartData.length > 0 ? 'block' : 'none' }}>
						<span>{t('cart.need login')}</span>
						<Link to='/login'>Login</Link>
					</div>
				</div>
			</div>
		</>
	);
}
