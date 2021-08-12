/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Input, Empty, Typography, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { getProducts, deleteProduct, getSidebar, getTotalProducts, getProductDetail } from '../../../redux/actions';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import RenderProductModal from './rederProductModal';

import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const { Title } = Typography;

const ProductList = ({ getProducts, deleteProduct, productsData, getSidebar, sidebarData, totalProduct, getTotalProducts, params }) => {
	const { t } = useTranslation();
	const [current, setCurrent] = useState(1);
	const [isDeleted, setIsDeleted] = useState(false);
	const [searchKey, setSearchKey] = useState();
	let history = useHistory();

	const [visible, setVisible] = useState(false);
	const [productId, setProductId] = useState('');
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = React.useState('Content of the modal');

	useEffect(() => {
		getSidebar();
	}, [getSidebar]);

	useEffect(() => {
		getProducts({ page: current, limit: 10, searchKey: searchKey, sortId: true });
		getTotalProducts({ searchKey: searchKey });
	}, [current, searchKey, isDeleted, getProducts, getTotalProducts]);

	const { Search } = Input;

	function confirm(data) {
		Modal.confirm({
			title: 'Confirm',
			content: (
				<p>
					Do you want to delete this product <span style={{ fontWeight: 600 }}>{data.name}</span> ?
				</p>
			),
			okText: 'OK',
			cancelText: 'CANCEL',
			onOk() {
				setIsDeleted(!isDeleted);
				deleteProduct({ id: data.id });
			},
			onCancel() {},
		});
	}

	const handleChange = (value) => {
		const valueInput = value;
		getProducts({ ...params, name: valueInput });
		getTotalProducts({ ...params, name: valueInput });
	};

	const handelChangePage = (page) => {
		setCurrent(page);
	};

	const renderLocationProduct = () => {
		const start = (current - 1) * 12 + 1;
		let end;
		if (productsData.length >= 12) {
			end = (current - 1) * 12 + 12;
		} else end = start + productsData.length - 1;
		return `${start} - ${end}`;
	};

	const getInfo = (id) => {
		setProductId(id);
		showModal();
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		setModalText('The modal will be closed after two seconds');
		setConfirmLoading(true);
		setTimeout(() => {
			setVisible(false);
			setConfirmLoading(false);
		}, 2000);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<>
			<Modal title='Update product' visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
				<RenderProductModal productId={productId} />
			</Modal>

			<section className='admin__listUser admin__products fadeIn'>
				<div className='container'>
					<Title level={4}>Product list</Title>

					<div className='admin__listUser--btn'>
						<div className='admin__listUser--btn-search'>
							<Search placeholder='input search text' onSearch={handleChange} enterButton />
						</div>
					</div>
					<div className='admin__listUser--tableNormal'>
						<table>
							<thead>
								<tr>
									<td>Key</td>
									<td>Name</td>
									<td>Price</td>
									<td>Category</td>
									<td>Tag</td>
									<td>Action</td>
								</tr>
							</thead>
							<tbody>
								{totalProduct?.length > 0 ? (
									productsData?.map((item, index) => (
										<>
											<tr>
												<td>{index + 1}</td>
												<td>{item.name}</td>
												<td>{item.newPrice.toLocaleString()}</td>
												<td>{sidebarData?.categoryData?.find((itemCategory) => itemCategory.id === item.categoryId).name}</td>
												<td>{sidebarData?.tagsData?.find((itemTag) => itemTag.id === item.tagId).name}</td>
												<td>
													<EyeOutlined
														style={{ fontSize: '18px', color: '#08c', marginRight: '10px' }}
														onClick={() => history.push(`/admin/productDetailsAdmin/${item.id}`)}
													/>

													<EditOutlined
														style={{ fontSize: '18px', color: '#52c41a', marginRight: '10px' }}
														onClick={() => getInfo(item.id)}
													/>

													<DeleteOutlined style={{ fontSize: '18px', color: '#eb2f96' }} onClick={() => confirm(item)} />
												</td>
											</tr>
										</>
									))
								) : (
									<Empty />
								)}
							</tbody>
						</table>
					</div>
					<div className='admin__listUser--pagination'>
						{totalProduct?.length > 10 && (
							<section className='pagination'>
								<div className='pagination__result'>
									{t('products.Showing')} {renderLocationProduct()} {t('products.of')} {totalProduct.length} {t('products.result')}
								</div>
								<Pagination current={current} onChange={handelChangePage} total={totalProduct?.length} defaultPageSize={10} />
							</section>
						)}
					</div>
				</div>
				<ToastContainer />
			</section>
		</>
	);
};

const mapStateToProps = (state) => {
	const { deleteProduct, productsData, totalProduct, params } = state.productReducer;
	const { sidebarData } = state.categoryReducer;
	const { productDetail } = state.productDetailReducer;

	return {
		deleteProduct,
		productsData,
		sidebarData,
		totalProduct,
		params,
		productDetail,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getProducts: (params) => dispatch(getProducts(params)),
		getTotalProducts: (params) => dispatch(getTotalProducts(params)),
		deleteProduct: (params) => dispatch(deleteProduct(params)),
		getSidebar: (params) => dispatch(getSidebar(params)),
		getProductDetail: (params) => dispatch(getProductDetail(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
