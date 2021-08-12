/** @format */

import React, { useEffect, useState } from 'react';
import { Slider, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getSidebar, getTotalProducts } from '../../redux/actions';
import './style.scss';
export default function Sidebar() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSidebar({}));
	}, [dispatch]);
	const [price, setPrice] = useState([10000, 200000]);
	const [index, setIndex] = useState(false);
	const params = useSelector((state) => state.productReducer.params);
	const category = useSelector((state) => state.categoryReducer.sidebarData);
	const handleChangePrice = (value) => {
		setPrice(value);
		dispatch(getProducts({ ...params, price: value }));
		// dispatch(getTotalProducts({ ...params, price: value }));
	};
	const handleFilterCategory = (cate) => {
		if (cate) {
			dispatch(getProducts({ ...params, category: cate.id }));
			// dispatch(getTotalProducts({ ...params, category: cate.id }));
		} else {
			delete params.category;
			dispatch(getProducts({ ...params }));
			// dispatch(getTotalProducts({ ...params }));
		}
	};
	const handleFilterTag = (tag, i) => {
		if (i !== index) {
			setIndex(i);
			dispatch(getProducts({ ...params, tag: tag }));
			// dispatch(getTotalProducts({ ...params, tag: tag }));
		} else {
			delete params.tag;
			setIndex(null);
			dispatch(getProducts({ ...params }));
			// dispatch(getTotalProducts({ ...params }));
		}
	};
	return (
		<div className='product__sidebar'>
			<h1 className='product__sidebar-title'>{t('Categories.Title')}</h1>
			<Menu style={{ border: 'none', marginTop: 24 }}>
				<Menu.Item key={'all'} className='list__item' onClick={handleFilterCategory}>
					{t('All Product')}
				</Menu.Item>
				{category?.categoryData?.map((item, index) => (
					<Menu.Item key={index} className='list__item' onClick={() => handleFilterCategory(item)}>
						{t(`Product_Category.${item.name}`)}
					</Menu.Item>
				))}
			</Menu>
			<h1 className='product__sidebar-title'>{t('price')}</h1>
			<Slider range min={10000} max={200000} defaultValue={[10000, 200000]} onChange={handleChangePrice}></Slider>
			<div className='product__sidebar-price'>
				<span>{price[0].toLocaleString('vi-VN')}</span>
				<span>{price[1].toLocaleString('vi-VN')}</span>
			</div>
			<h1 className='product__sidebar-title'>{t('tags.Tag')}</h1>
			<div className='product__sidebar-tag'>
				{category?.tagsData?.map((item, i) => (
					<div key={i} className={index === i ? 'tag__item active' : 'tag__item'} onClick={() => handleFilterTag(item.id, i)}>
						{t(`tags.${item.name}`)}
					</div>
				))}
			</div>
		</div>
	);
}
