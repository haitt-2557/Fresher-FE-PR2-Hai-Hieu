/** @format */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Select } from 'antd';
import CustomField from './CustomField';
import { FaStarOfLife } from 'react-icons/fa';
import './styles.scss';
import { connect } from 'react-redux';
import { createProduct, getSidebar, getProductDetail } from '../../../../redux/actions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProductAdmin = ({ getSidebar, sidebarData, createProduct, productDetail }) => {
	const { t } = useTranslation();
	const { Option } = Select;
	let history = useHistory();

	useEffect(() => {
		getSidebar();
	}, [getSidebar]);

	const handleCreateProduct = (values) => {
		console.log(values);
		createProduct({ ...values, newPrice: parseInt(values.newPrice) });
		toast.success('Thêm sản phẩm thành công !', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		history.push('/admin/manage-product');
	};

	return (
		<section className='addProductAdmin'>
			<Row justify='center'>
				<Col xs={18}>
					<div className='addProductAdmin__container container'>
						<h1 className='addProductAdmin__title'>{t('admin.products.More new products')}</h1>
						<Formik
							initialValues={{
								name: productDetail?.product?.name,
								categoryId: productDetail?.product?.categoryId,
								description: productDetail?.product?.description,
								tagId: productDetail?.product?.tagId,
								newPrice: productDetail?.product?.newPrice,
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
								handleCreateProduct(values);
							}}
							enableReinitialize>
							<Form>
								<Row gutter={[24, 16]}>
									<Col xs={24}>
										<CustomField
											name='name'
											type='text'
											label={t("admin.products.Product's name")}
											placeholder={t('admin.products.Enter product name')}
											required
										/>
									</Col>
									<Col xs={24}>
										<CustomField
											name='newPrice'
											type='text'
											label={t('admin.products.Price')}
											placeholder={t('admin.products.Enter unit price')}
											required
										/>
									</Col>
									<Col xs={24}>
										<Row align='middle'>
											<Col md={6}>
												<label className htmlFor='categoryId'>
													{t('admin.products.ProductCategory')}
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
													{t('admin.products.Tag')}
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
									</Col>{' '}
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
											label={t('admin.products.Describe')}
											placeholder={t('admin.products.Enter describe')}
										/>
									</Col>
									<Col xs={24}>
										<Row justify='end' align='middle'>
											<button type='submit' className='button button-primary'>
												{t('admin.products.Add new')}
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
	);
};

const mapStateToProps = (state) => {
	const { sidebarData } = state.categoryReducer;
	const { productDetail } = state.productDetailReducer;

	return { sidebarData, productDetail };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSidebar: (params) => dispatch(getSidebar(params)),
		createProduct: (params) => dispatch(createProduct(params)),
		getProductDetail: (params) => dispatch(getProductDetail(params)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProductAdmin);
