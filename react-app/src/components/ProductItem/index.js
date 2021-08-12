/** @format */

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Star from '../Star';
import { IoEyeSharp } from 'react-icons/io5';
import { HiShoppingBag, HiHeart } from 'react-icons/hi';
import { Tooltip } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import addToCart from '../../redux/actions/cart.action';
import { useTranslation } from 'react-i18next';
import { addWish } from '../../redux/actions/wishlist.action';

const ProductItem = ({ data }) => {
	const { t } = useTranslation();
	let history = useHistory();
	let { id, name, rate, newPrice, oldPrice, news, img } = data;
	const sales = oldPrice && Math.ceil((1 - newPrice / oldPrice) * 100);
	const dispatch = useDispatch();
	const userInfo = JSON.parse(localStorage.getItem('profile'));
	const itemWish = useSelector((state) => state.wish.wishList);
	const handleAddToCart = (item) => {
		toast.success(t('Add cart success'), {
			position: toast.POSITION.TOP_RIGHT,
		});
		dispatch(addToCart(item));
	};
	const handleAddToWish = (item) => {
		if (userInfo) {
			dispatch(addWish(item));
		} else {
			toast.warning(t('required-login'), {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	return (
		<div className='product-item'>
			<div className='product-item__img'>
				<Link to={`/product/${id}`} className='rotate-img'>
					<img src={img[0]} alt='anh' />
					<img src={img[1]} alt='ANH' />
				</Link>
				<div className='product-item__widget'>
					<span className='icon icon-round product-item__widget-icon'>
						<Tooltip placement='top' title='WISHLIST' onClick={() => handleAddToWish(data)}>
							<HiHeart />
						</Tooltip>
					</span>
					<span className='icon icon-round product-item__widget-icon'>
						<Tooltip placement='top' title='ADD TO CARD' onClick={() => handleAddToCart(data)}>
							<HiShoppingBag />
						</Tooltip>
					</span>
					<span className='icon icon-round product-item__widget-icon' onClick={() => history.push(`/product/${id}`)}>
						<Tooltip placement='top' title='QUICKVIEW'>
							<IoEyeSharp />
						</Tooltip>
					</span>
				</div>
				{news && <span className='product-item--new '>New</span>}
				{oldPrice && <span className='product-item--sale'> - {sales} %</span>}
			</div>
			<div className='product-item__content'>
				<h3 className='product-item__name'>{name}</h3>
				<div className='product-item__rate'>
					<Star rate={rate}></Star>
				</div>
				<div className='product-item__price'>
					<span className='product-item__price--new'>{`$${newPrice.toLocaleString()}`}</span>
					{oldPrice && <span className='product-item__price--old'>{` $${oldPrice.toLocaleString()}`}</span>}
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
