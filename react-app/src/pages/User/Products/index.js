/** @format */

import { Row, Col, Pagination, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../../components/ProductItem/index';
import { getProducts, getTotalProducts, getProductHome } from '../../../redux/actions';
import { CHANGE_PAGE } from '../../../redux/constants';
import Slide from '../Home/Slide';
import Sidebar from '../../../components/Sidebar/index';
import noProduct from '../../../assets/images/no-product.jpg';
import './style.scss';
import { IoGrid } from 'react-icons/io5';
import { AiOutlineUnorderedList } from 'react-icons/ai';
const { Option } = Select;
export default function Product() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const params = useSelector((state) => state.productReducer.params);
	const productSlider = useSelector((state) => state.productReducer.productHome);
	const productLimit = useSelector((state) => state.productReducer.productsData);
	const pagination = useSelector((state) => state.productReducer.pagination);

	useEffect(() => {
		const body = document.querySelector('#root');
		body.scrollIntoView({ behavior: 'smooth' }, 500);
		document.title = 'Oragin | Shop';
		dispatch(getProducts({ page: 1, limit: 9 }));
		dispatch(getProductHome({}));
	}, [dispatch]);
	const handleChangePage = async (currentPage, currentSize) => {
		// const product = productTotal.slice(currentPage * currentSize - currentSize, currentPage * currentSize);
		// const payload = {
		// 	product: product,
		// 	currentPage: currentPage,
		// 	limit: currentSize,
		// };
		// dispatch({ type: CHANGE_PAGE, payload: payload });
		dispatch(getProducts({ page: currentPage, limit: currentSize }));
	};
	const handleChangeSort = (value) => {
		if (value === 'featured') {
			delete params.sort;
			dispatch(getProducts(params));
		} else {
			dispatch(getProducts({ ...params, sort: value }));
		}
	};
	return (
		<>
			<section className='product-banner'>
				<h1 className='product-banner__title'>{t('home.banner.Banner')}</h1>
				<p className='product-banner__bread'>{t('home.banner.Banner-bread')}</p>
			</section>
			<section className='product'>
				<Row gutter={16}>
					<Col lg={6} md={6} sm={24}>
						<Sidebar />
					</Col>
					<Col lg={18} md={18} sm={24}>
						<div className='product__main'>
							<h1 className='product__main-title'>{t('sale')}</h1>
							<div className='product__main-sale'>
								<Slide data={productSlider.sale} type='product' page='product' xl={4} lg={4} md={3} sm={2} xs={2}></Slide>
							</div>
							<div className='product__main-list'>
								<div className='list__filter'>
									<div className='list__filter-sort'>
										<span>{t('products.sort by')}</span>
										<Select onChange={handleChangeSort} style={{ width: '140px' }} defaultValue='featured'>
											<Option value='featured'>{t('products.Featured')}</Option>
											<Option value='bestSelling'>{t('products.Best Selling')}</Option>
											<Option value='priceLowToHigh'>{t('products.Price, low to high')}</Option>
											<Option value='priceHighToLow'>{t('products.Price, high to low')}</Option>
											<Option value='date'>{t('products.Date, new to old')}</Option>
										</Select>
									</div>
									<div className='list__filter-result'>
										<span>{`${pagination.total} ${t('products.found')}`}</span>
									</div>
									<div className='list__filter-icon'>
										<IoGrid style={{ marginRight: '10px', cursor: 'pointer' }} />
										<AiOutlineUnorderedList style={{ cursor: 'pointer' }} />
									</div>
								</div>
								<div className='list__product'>
									<Row gutter={[16, 18]}>
										{productLimit.length > 0 ? (
											productLimit.map((item, index) => (
												<Col lg={8} md={12} sm={24} xs={24} key={`item-${index}`}>
													<ProductCard data={item}></ProductCard>
												</Col>
											))
										) : (
											<img src={noProduct} alt='no-product' className='list__notFound' />
										)}
									</Row>
								</div>
								<Pagination
									showSizeChanger
									defaultCurrent={pagination.currentPage}
									defaultPageSize={pagination.limit}
									pageSizeOptions={[9, 12, 24, 48]}
									total={pagination.total}
									onChange={handleChangePage}
								/>
							</div>
						</div>
					</Col>
				</Row>
			</section>
		</>
	);
}
