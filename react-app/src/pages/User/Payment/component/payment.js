/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Checkbox, Row, Col, Select } from 'antd';
import * as Yup from 'yup';
import CustomField from './CustomField';
import VietNam from '../../../../assets/images/vi.svg';
import English from '../../../../assets/images/en.svg';
import PaymentBreadcrumb from '../component/PaymentBreadcrumb';
import { createBill, getInfo } from '../../../../redux/actions';
import './styles.scss';
import InfoCart from '../../../../components/InfoCart';
import { useTranslation } from 'react-i18next';

const Payment = ({ getInfo, infoUser, createBill }) => {
	const { t } = useTranslation();
	const product = useSelector((state) => state.cart);
	const data = product.cartData.map((item) => {
		return { ...item, total: (item.newPrice * item.quantity).toLocaleString('vi-VN') };
	});
	const history = useHistory();
	const { Option } = Select;
	const [valueSelect, setValueSelect] = useState('vi');
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		getInfo({ email: user.user.email });
	}, [getInfo, user.user.email]);
	const handleSubmitForm = (values) => {
		const { firstName, lastName, ...other } = values;
		const paymentCode = `ARYA${infoUser.id}${Math.floor(Math.random() * values.zipCode + infoUser.id)}`;
		const dataForm = {
			name: `${firstName} ${lastName}`,
			country: valueSelect,
			dataCart: [...data],
			paymentCode,
			...other,
		};
		createBill(dataForm);
		history.push('/shipping');
	};
	return (
		<div className='payment-page'>
			<div className='container payment__container'>
				<section className='information'>
					<PaymentBreadcrumb />
					<Formik
						initialValues={{
							email: infoUser?.email || '',
							firstName: infoUser?.firstname || '',
							lastName: infoUser?.lastname || '',
							address: infoUser?.address || '',
							zipCode: infoUser?.zipCode || '',
							phone: infoUser?.phone || '',
							check: true,
						}}
						validationSchema={Yup.object({
							email: Yup.string()
								.required('Vui lòng nhập trường này')
								.max(50, 'Tên không được vượt quá 50 kí tự')
								.email('Email không hợp lệ'),
							firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Vui lòng nhập trường này'),
							lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Vui lòng nhập trường này'),
							phone: Yup.string()
								.matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ')
								.required('Vui lòng nhập trường này'),
							address: Yup.string().required('Vui lòng nhập trường này').max(50, 'Tên không được vượt quá 50 kí tự'),
							zipCode: Yup.string().matches(/([0-9]{6})/, 'ZIP code phải chứa 6 chữ số'),
						})}
						onSubmit={(values) => handleSubmitForm(values, valueSelect)}
						enableReinitialize>
						<Form>
							<Row gutter={[24, 16]}>
								<Col md={14} sm={24} lg={14}>
									<Col sm={24}>
										<CustomField name='email' type='email' label='Email ' />
									</Col>
									<Col sm={24} style={{ marginTop: '15px' }}>
										<div className='form__control'>
											<Field
												type='checkbox'
												name='check'
												render={({ field }) => <Checkbox {...field}>Keep me up to date on news and offers</Checkbox>}
											/>
										</div>
									</Col>

									<Col sm={24} style={{ marginTop: '15px' }}>
										<CustomField name='firstName' type='text' label='First name ' />
									</Col>

									<Col sm={24} style={{ marginTop: '15px' }}>
										<CustomField name='lastName' type='text' label='Last name ' />
									</Col>
									<Col sm={24} style={{ marginTop: '15px' }}>
										<CustomField name='address' type='text' label='Address ' />
									</Col>
									<Col sm={24} style={{ marginTop: '15px' }}>
										<CustomField name='phone' type='text' label='Phone ' placeholder='(84)...' />
									</Col>
									<Col sm={6} style={{ marginTop: '15px' }}>
										<div className='form__control'>
											<label htmlFor='title'>Country/region</label>
											<Field
												name='country'
												render={({ field }) => (
													<Select
														{...field}
														defaultValue='vi'
														style={{ width: '100%' }}
														className='form__control--select user__select'
														onChange={(value) => setValueSelect(value)}>
														<Option value='vi'>
															<img src={VietNam} className='user__select-img' alt='vi' />
															<span>Viet Nam</span>
														</Option>
														<Option value='en'>
															<img src={English} className='user__select-img' alt='en' />
															<span>England</span>
														</Option>
													</Select>
												)}
											/>
										</div>
									</Col>
									<Col sm={24} style={{ marginTop: '15px' }}>
										<CustomField name='zipCode' type='text' label='ZIP code ' />
									</Col>
									<Col style={{ marginTop: '15px' }}>
										<button type='submit' className='button button-round--lg button-primary'>
											{t('continue')}
										</button>
										<button
											type='button'
											className='button button-round--lg button-transparent'
											onClick={() => history.push('/cart')}>
											{t('cart-return')}
										</button>
									</Col>
								</Col>
								<Col md={10} sm={24} lg={10}>
									<InfoCart />
								</Col>
							</Row>
						</Form>
					</Formik>
				</section>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const { infoUser } = state.accountReducer;
	const { billData } = state.paymentReducer;
	return { infoUser, billData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getInfo: (params) => dispatch(getInfo(params)),
		createBill: (params) => dispatch(createBill(params)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
