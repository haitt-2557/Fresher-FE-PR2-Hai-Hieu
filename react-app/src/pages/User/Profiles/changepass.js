/** @format */

import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import UserSidebar from '../../../components/User/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import bcrypt from 'bcryptjs';
import './style.scss';
import { updateProfile } from '../../../redux/actions/authAction';
import { toast } from 'react-toastify';
import * as API from '../../../api';

export default function Changepass() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [userInfo, setUserInfo] = useState({});
	const userId = useSelector((state) => state.auth.authData.user.id);
	useEffect(() => {
		async function getUserInfo() {
			const { data } = await API.getUserInfo(userId);
			setUserInfo(data);
		}
		getUserInfo();
	}, [userId]);
	const handleChangePass = async (value) => {
		const isMatch = await bcrypt.compare(value.currentPass, userInfo.password);

		if (isMatch) {
			dispatch(updateProfile({ password: value.newPassConfirm }));
			toast.success(t('Profile.update-password'), {
				position: toast.POSITION.TOP_RIGHT,
			});
			form.resetFields();
		} else {
			toast.error(t('Profile.update-password-fail'), {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	return (
		<div className='profile'>
			<Row gutter={24}>
				<UserSidebar />
				<Col lg={18}>
					<div className='profile__info'>
						<h2 className='profile__info-title'>{t('Profile.change-password')}</h2>
						<p className='profile__info-text'>{t('Profile.pass-text')}</p>
					</div>
					<Form
						form={form}
						name='profile-form'
						labelCol={{
							span: 4,
						}}
						wrapperCol={{
							span: 16,
						}}
						onFinish={handleChangePass}>
						<Form.Item
							name='currentPass'
							label={t('Profile.inner')}
							rules={[
								{
									required: true,
									message: t('validate.password.required'),
								},
								{
									min: 8,
									message: t('validate.password.regex'),
								},
							]}>
							<Input.Password placeholder='Enter your current password' />
						</Form.Item>
						<Form.Item
							name='newPass'
							label={t('Profile.new')}
							rules={[
								{
									required: true,
									message: t('validate.password.required'),
								},
								{
									min: 8,
									message: t('validate.password.regex'),
								},
							]}>
							<Input.Password placeholder='Enter your new password' />
						</Form.Item>
						<Form.Item
							name='newPassConfirm'
							dependencies={['newPass']}
							label={t('Profile.confirm')}
							rules={[
								{
									required: true,
									message: t('validate.password.required'),
								},
								{
									min: 8,
									message: t('validate.password.regex'),
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('newPass') === value) {
											return Promise.resolve();
										}

										return Promise.reject(t('Profile.confirm_pwNew'));
									},
								}),
							]}>
							<Input.Password placeholder='Confirm your new password' />
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 4,
								span: 16,
							}}>
							<Button htmlType='submit'>{t('Profile.submit')}</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
}
