/** @format */

import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import PaymentBreadcrumb from '../component/PaymentBreadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getBill, updateBill } from '../../../../redux/actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TiWarningOutline } from 'react-icons/ti';
import { MdPayment } from 'react-icons/md';
import moment from 'moment';
import 'moment/locale/vi';
import './styles.scss';
const PaymentConfirm = ({ getBill, billData, updateBill, getCartData }) => {
    let history = useHistory();
    const { t } = useTranslation();
    const [billingAddress, setBillingAddress] = useState(1);
    const bill = useSelector((state) => state.paymentReducer.billUpdateData);
    const total = useSelector((state) => state.cart.totalCost);

    const handelUpdateBill = () => {
        const date = moment().format('DD/MM/YYYY');
        updateBill({
            id: bill.id,
            payment: 'Cash on Delivery (COD)',
            billingAddress: billingAddress,
            date,
            isPayment: true,
            type: 'success',
            totalCost: bill.shippingCost + total,
        });
        history.push(`/success/${bill.id}`);
    };

    return (
        <div className='payment-page'>
            <div className='container payment__container'>
                <section className='payments'>
                    <PaymentBreadcrumb />
                    <div className='shipping__info shipping__content'>
                        <div className=' shipping__content--item   '>
                            <div className='shipping__info--inner'>
                                <h4>{t('payments.shipping.Contact')}</h4>
                                <p>{bill.email}</p>
                            </div>
                            <button className='button' onClick={() => history.push('/infoPayment')}>
                                {t('payments.shipping.Change')}
                            </button>
                        </div>
                        <div className=' shipping__content--item'>
                            <div className='shipping__info--inner'>
                                <h4>{t('payments.shipping.Ship to')}</h4>
                                <p>{bill.address}</p>
                            </div>
                            <button className='button' onClick={() => history.push('/infoPayment')}>
                                {t('payments.shipping.Change')}
                            </button>
                        </div>
                        <div className=' shipping__content--item'>
                            <div className='shipping__info--inner'>
                                <h4>{t('payments.payment.Method')}</h4>
                                <p>
                                    {bill.method} &#8226; {bill.shippingCost}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='shipping__title'>
                        <h2>{t('payments.payment.Payment')}</h2>
                        <p>{t('payments.payment.All transactions are secure and encrypted')}</p>
                    </div>
                    <div className='payments__warning shipping__content'>
                        <div className='shipping__info--inner payments__warning--inner'>
                            <TiWarningOutline />
                            <p>{t('payments.payment.This store can only pay with COD')}</p>
                        </div>
                    </div>
                    <div className='payments__content'>
                        <div className='payments__item'>
                            <Radio disabled>{t('payments.payment.Credit card')}</Radio>
                            <MdPayment />
                        </div>
                        <div className='payments__item'>
                            <Radio checked>{t('payments.payment.Cash on Delivery (COD)')}</Radio>
                        </div>
                    </div>
                    <div className='shipping__title'>
                        <h2>{t('payments.payment.Billing address')}</h2>
                        <p>{t('payments.payment.Select the address that matches your card or payment method.')}</p>
                    </div>
                    <div className='payments__content'>
                        <Radio.Group onChange={(e) => setBillingAddress(e.target.value)} value={billingAddress} style={{ width: '100%' }}>
                            <div className='payments__item'>
                                <Radio value='Same as shipping address' onClick={(e) => setBillingAddress(e)}>
                                    {t('payments.payment.Same as shipping address')}
                                </Radio>
                            </div>
                            <div className='payments__item'>
                                <Radio value='Use a different billing address' onClick={(e) => setBillingAddress(e)}>
                                    {t('payments.payment.Use a different billing address')}
                                </Radio>
                            </div>
                        </Radio.Group>
                    </div>
                    <div className='shipping__btn'>
                        <button className='button button-round button-transparent ' onClick={() => handelUpdateBill()}>
                            <span> {t('payments.payment.Complete order')}</span>
                        </button>
                        <button className='button button-round button-transparent' onClick={() => history.push('/shipping')}>
                            <span> {t('payments.payment.Return to shipping')}</span>
                        </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirm);
