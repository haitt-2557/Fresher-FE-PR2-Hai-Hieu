/** @format */

import React from 'react';
import { Form, Input, Button, Row, Col, Checkbox, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLoginBoxLine } from 'react-icons/ri';
import { GrGooglePlus } from 'react-icons/gr';
import { SiGnuprivacyguard } from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { Types } from '../../../redux/constants/auth.constant';
import { signup } from '../../../redux/actions/authAction';
export default function Signup() {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const history = useHistory();
	const dispatch = useDispatch();
	const handleSubmit = (values) => {
		dispatch(signup(values, history));
	};
	const googleSuccess = (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: Types.AUTH, payload: { result, token } });
			history.push('/');
		} catch (err) {
			console.log(err);
		}
	};
	const googleError = () => {
		toast.error('Google Sign In was unsuccessful. Try again later', {
			position: toast.POSITION.TOP_RIGHT,
		});
	};
	return (
		<>
			<section className='login'>
				<Row justify='center'>
					<Col lg={12} sm={24} md={12}>
						<Form
							form={form}
							name='register-form'
							labelCol={{
								span: 4,
							}}
							wrapperCol={{
								span: 20,
							}}
							initialValues={{
								remember: true,
							}}
							onFinish={handleSubmit}
							className='login-form'>
							<div className='login-form__icon'>
								<SiGnuprivacyguard />
							</div>
							<h2 className='login-form__title'>{t('register.create')}</h2>
							<Form.Item
								label='First name'
								name='firstname'
								rules={[
									{
										required: true,
										message: t('validate.first'),
										whitespace: true,
									},
								]}>
								<Input placeholder='First name' />
							</Form.Item>
							<Form.Item
								label=' Last name'
								name='lastname'
								rules={[
									{
										required: true,
										message: t('validate.last'),
										whitespace: true,
									},
								]}>
								<Input placeholder='Last name' />
							</Form.Item>
							<Form.Item
								label='Email'
								name='email'
								rules={[
									{
										type: 'email',
										message: t('validate.email.regex'),
									},
									{
										required: true,
										message: t('validate.email.required'),
									},
								]}>
								<Input placeholder='Enter your email' />
							</Form.Item>
							<Form.Item
								label='Password'
								name='password'
								rules={[
									{
										min: 8,
										message: t('validate.password.regex'),
									},
									{
										required: true,
										message: t('validate.password.required'),
									},
								]}>
								<Input.Password placeholder='Enter your password' />
							</Form.Item>

							<Form.Item
								wrapperCol={{
									offset: 4,
									span: 20,
								}}>
								<Button htmlType='submit' className='form-login__btn'>
									{t('register.button register')}
								</Button>
							</Form.Item>
							<Form.Item
								style={{ margin: '5px 0', textAlign: 'center', width: '100%' }}
								wrapperCol={{
									offset: 4,
									span: 20,
								}}>
								<Typography>{t('login.or')}</Typography>
							</Form.Item>
							<GoogleLogin
								clientId='600260365139-7aphliqdh3249olmr38kc4tn3pnb443n.apps.googleusercontent.com'
								render={(renderProps) => (
									<Form.Item
										wrapperCol={{
											offset: 4,
											span: 20,
										}}>
										<Button
											className='form-login__btn'
											onClick={renderProps.onClick}
											icon={<GrGooglePlus className='form-login__btn--icon' />}>
											{t('login.google')}
										</Button>
									</Form.Item>
								)}
								onSuccess={googleSuccess}
								onFailure={googleError}
								cookiePolicy='single_host_origin'
							/>

							<Form.Item
								style={{ margin: '5px 0', textAlign: 'center', width: '100%' }}
								wrapperCol={{
									offset: 4,
									span: 20,
								}}>
								<Link to='/login'>
									<Typography style={{ float: 'right' }}>{`${t('register.already')} Login`}</Typography>
								</Link>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</section>
			<ToastContainer autoClose={3000} />
		</>
	);
}
