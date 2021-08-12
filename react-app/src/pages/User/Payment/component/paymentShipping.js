/** @format */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PaymentBreadcrumb from '../component/PaymentBreadcrumb';
import { Radio } from 'antd';
import { connect, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getBill, updateBill } from '../../../../redux/actions';
import './styles.scss';
const Shipping = ({ getBill, billData, updateBill }) => {
	const bill = useSelector((state) => state.paymentReducer);
	let history = useHistory();
	const { t } = useTranslation();

	const handelUpdateBill = async () => {
		await updateBill({
			id: bill.billInitData.id,
			method: 'Standard',
			shippingCost: 20000,
		});
		history.push('/paymentConfirm');
	};

	return (
		<div className='payment-page'>
			<div className='container payment__container'>
				<section className='shipping'>
					<PaymentBreadcrumb />
					<div className='shipping__container'>
						<div className='shipping__info shipping__content'>
							<div className='shipping__content--item'>
								<div className='shipping__info--inner'>
									<h4>{t('payments.shipping.Contact')}</h4>
									<p>{bill.billInitData.email}</p>
								</div>
								<button className='button' onClick={() => history.push('/payment')}>
									{t('payments.shipping.Change')}
								</button>
							</div>
							<div className=' shipping__content--item'>
								<div className='shipping__info--inner'>
									<h4>{t('payments.shipping.Ship to')}</h4>
									<p>{bill.billInitData.address}</p>
								</div>
								<button className='button' onClick={() => history.push('/payment')}>
									{t('payments.shipping.Change')}
								</button>
							</div>
						</div>

						<div className='shipping__title'>
							<h3>{t('payments.shipping.Shipping method')}</h3>
						</div>
						<div className='shipping__method shipping__content  '>
							<div className='shipping__content--item'>
								<Radio checked>{t('payments.shipping.Standard')}</Radio>
								<p>20.000 VND</p>
							</div>
						</div>
						<div className='shipping__btn'>
							<button className='button button button-round button-transparent ' onClick={() => handelUpdateBill()}>
								<span> {t('payments.shipping.Continue to payment')}</span>
							</button>
							<button className='button button-round button-transparent' onClick={() => history.push('/shipping')}>
								<span> {t('payments.shipping.Return to information')}</span>
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const { billData } = state.paymentReducer;

	return { billData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getBill: (params) => dispatch(getBill(params)),
		updateBill: (params) => dispatch(updateBill(params)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
