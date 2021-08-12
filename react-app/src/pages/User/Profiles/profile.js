/** @format */

import { Col, Row, Form, Input, Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import UserSidebar from '../../../components/User/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import './style.scss';
import { updateProfile } from '../../../redux/actions/authAction';
import moment from 'moment';
import { toast } from 'react-toastify';
export default function Profile() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const handleSubmit = (value) => {
		dispatch(updateProfile(value));
		toast.success(t('Profile.update-success'), {
			position: toast.POSITION.TOP_RIGHT,
		});
	};
	const users = useSelector((state) => state.auth.authData);
	return (
		<div className='profile'>
			<Row gutter={24}>
				<UserSidebar />
				<Col lg={18}>
					<div className='profile__info'>
						<h2 className='profile__info-title'>{t('Profile.my-profile')}</h2>
						<p className='profile__info-text'>{t('Profile.profile-text')}</p>
					</div>
					<Form
						form={form}
						name='profile-form'
						labelCol={{
							span: 3,
						}}
						wrapperCol={{
							span: 15,
						}}
						onFinish={handleSubmit}
						initialValues={{
							firstname: users.user.firstname,
							lastname: users.user.lastname,
							email: users.user.email,
							address: users.user?.address,
							phone: users.user?.phone,
							imageUrl: users.user?.imageUrl,
							birthday: moment(users.user?.birthday),
						}}
						className='profile-form'>
						<Form.Item
							label={t('Profile.account.first')}
							name='firstname'
							rules={[
								{
									required: true,
									message: t('validate.first'),
								},
							]}>
							<Input placeholder='Enter your Fist Name' allowClear />
						</Form.Item>
						<Form.Item
							label={t('Profile.account.last')}
							name='lastname'
							rules={[
								{
									required: true,
									message: t('validate.last'),
								},
							]}>
							<Input placeholder='Enter your Last Name' allowClear />
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
							<Input />
						</Form.Item>
						<Form.Item
							label={t('Profile.account.phone')}
							name='phone'
							rules={[
								{
									required: true,
									message: t('validate.phone.required'),
								},
							]}>
							<Input placeholder='Enter your phone number' allowClear />
						</Form.Item>
						<Form.Item label={t('Profile.account.birthday')} name='birthday'>
							<DatePicker format='DD/MM/YYYY' />
						</Form.Item>
						<Form.Item
							label={t('Profile.account.address')}
							name='address'
							rules={[{ required: true, message: t('validate.address.required') }]}>
							<Input placeholder='Enter your address' allowClear></Input>
						</Form.Item>
						<Form.Item label='Image URL' name='imageUrl'>
							<Input placeholder='Enter your Image URL' allowClear></Input>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 3,
								span: 16,
							}}>
							<Button htmlType='submit' className='form-login__btn'>
								{t('Profile.account.save')}
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
}
