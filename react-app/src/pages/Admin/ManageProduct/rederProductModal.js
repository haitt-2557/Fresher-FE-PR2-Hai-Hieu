/** @format */

import React, { useEffect } from 'react';
import { Row, Col, Select } from 'antd';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import CustomField from './AddProduct/CustomField';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaStarOfLife } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { updateProduct, getProductDetail, getSidebar } from '../../../redux/actions';
import { toast } from 'react-toastify';
import './AddProduct/styles.scss';

const RenderProductModal = ({ sidebarData, productDetail, productId, getProductDetail, updateProduct }) => {
	const { t } = useTranslation();

	const { Option } = Select;

	const product = productDetail.product;

	useEffect(() => {
		getSidebar();
		getProductDetail(productId);
	}, [productId, getProductDetail]);

	const handleEditProduct = (values) => {
		const data = { id: productId, ...values, newPrice: parseInt(values.newPrice) };
		updateProduct({ ...data });
		toast.success('Cập nhật sản phẩm thành công !', {
			position: 'top-right',
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<>
			<section className='addProductAdmin'>
				<Row justify='center'>
					<Col xs={18}>
						<div className='addProductAdmin__container container'>
							<Formik
								initialValues={{
									name: product?.name,
									categoryId: product?.categoryId,
									description: product?.description,
									tagId: product?.tagId,
									newPrice: product?.newPrice,
									img: product?.img,
								}}
								validationSchema={Yup.object({
									name: Yup.string().max(50, t('validate.name.max')).required(t('validate.name.required')),
									categoryId: Yup.string().required(t('validate.category.required')),
									tagId: Yup.string().required(t('validate.tag.required')),
									newPrice: Yup.string()
										.required(t('validate.price.required'))
										.matches(/(^(1|2|3|4|5|6|7|8|9)+[0-9]{4,8}$)/, t('validate.price.regex')),
								})}
								onSubmit={(values) => {
									handleEditProduct(values);
								}}
								enableReinitialize>
								<Form>
									<Row gutter={[24, 16]}>
										<Col xs={24}>
											<CustomField
												name='name'
												type='text'
												label='Name'
												placeholder={t('admin.products.Enter product name')}
												required
											/>
										</Col>
										<Col xs={24}>
											<CustomField
												name='newPrice'
												type='text'
												label='Price'
												placeholder={t('admin.products.Enter unit price')}
												required
											/>
										</Col>
										<Col xs={24}>
											<Row align='middle'>
												<Col md={6}>
													<label className htmlFor='categoryId'>
														Category
														<FaStarOfLife />
													</label>
												</Col>

												<Col md={18}>
													<Field
														name='categoryId'
														id='categoryId'
														render={(FieldProps) => (
															<Select
																{...FieldProps.field}
																style={{ width: '100%' }}
																className='form__control--select'
																placeholder={t('admin.products.Select product line')}
																onChange={(value) => FieldProps.form.setFieldValue(FieldProps.field.name, value)}>
																{sidebarData?.categoryData?.map((item) => (
																	<Option key={item.id} value={item.id}>
																		{item.name}
																	</Option>
																))}
															</Select>
														)}
													/>
													<div className='text-danger'>
														<ErrorMessage name='categoryId' />
													</div>
												</Col>
											</Row>
										</Col>

										<Col xs={24}>
											<Row align='middle'>
												<Col md={6}>
													<label htmlFor='tagId'>
														Tag
														<FaStarOfLife />
													</label>
												</Col>
												<Col md={18}>
													<Field
														name='tagId'
														id='tagId'
														type='select'
														render={(FieldProps) => (
															<Select
																{...FieldProps.field}
																style={{ width: '100%' }}
																className='form__control--select'
																placeholder={t('admin.products.Select tag')}
																onChange={(value) => FieldProps.form.setFieldValue(FieldProps.field.name, value)}>
																{sidebarData?.tagsData?.map((item) => (
																	<Option value={item.id}>{item.name}</Option>
																))}
															</Select>
														)}
													/>
													<div className='text-danger'>
														<ErrorMessage name='tagId' />
													</div>
												</Col>
											</Row>
										</Col>

										<Col xs={24}>
											<Row align='middle'>
												<Col xs={24}>
													<CustomField name='img' type='text' label='Image' placeholder='' required />
												</Col>
											</Row>
										</Col>

										<Col xs={24}>
											<CustomField
												name='description'
												type='textarea'
												label='Description'
												placeholder={t('admin.products.Enter describe')}
											/>
										</Col>

										<Col xs={24}>
											<Row justify='end' align='middle'>
												<button type='submit' className='button button-round--lg button-primary'>
													Update
												</button>
											</Row>
										</Col>
									</Row>
								</Form>
							</Formik>
						</div>
					</Col>
				</Row>
			</section>
		</>
	);
};

const mapStateToProps = (state) => {
	const { productsData, params } = state.productReducer;
	const { sidebarData } = state.categoryReducer;
	const { productDetail } = state.productDetailReducer;

	return {
		productsData,
		sidebarData,
		productDetail,
		params,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getSidebar: (params) => dispatch(getSidebar(params)),
		getProductDetail: (params) => dispatch(getProductDetail(params)),
		updateProduct: (params) => dispatch(updateProduct(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderProductModal);
