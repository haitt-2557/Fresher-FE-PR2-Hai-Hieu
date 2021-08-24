import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Checkbox, Input, Row, Col, Select } from "antd";
import * as Yup from "yup";
import CustomField from "./CustomField";
import VietNam from "../../../../assets/images/vi.svg";
import English from "../../../../assets/images/en.svg";
import PaymentBreadcrumb from '../component/PaymentBreadcrumb';
import { createBill, getInfo } from "../../../../redux/actions";
import "./styles.scss";

const Payment = ({ getInfo, infoUser, createBill }) => {
    const product = useSelector((state) => state.cart);
    const data = product.cartData.map((item) => {
        return { ...item, total: (item.newPrice * item.quantity).toLocaleString('vi-VN') };
    });
    let history = useHistory();
    const { Option } = Select;
    const [valueSelect, setValueSelect] = useState("vi");
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        getInfo({ email: user.user.email });
    }, []);
    const handleSubmitForm = (values) => {
        const { firstName, lastName, ...other } = values;
        const paymentCode = `ARYA${infoUser.id}${Math.floor(Math.random() * values.zipCode + infoUser.id)}`;
        const dataForm = {
            user: user.user.email,
            name: `${firstName} ${lastName}`,
            country: valueSelect,
            dataCart: [...data],
            userId: infoUser.id,
            paymentCode,
            ...other,
        };
        createBill({ ...dataForm });
        history.push("/shipping");
    };
    return (
        <div className="payment-page">
            <div className="container payment__container">
                <section className="information">
                    <PaymentBreadcrumb />
                    <Formik
                        initialValues={{
                            email: infoUser?.email || "",
                            firstName: infoUser?.firstname || "",
                            lastName: infoUser?.lastname || "",
                            address: infoUser?.address || "",
                            zipCode: infoUser?.zipCode || "",
                            phone: infoUser?.phone || "",
                            check: true,
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .required("Vui lòng nhập trường này")
                                .max(50, "Tên không được vượt quá 50 kí tự")
                                .email("Email không hợp lệ"),
                            firstName: Yup.string()
                                .max(15, "Must be 15 characters or less")
                                .required("Vui lòng nhập trường này"),
                            lastName: Yup.string()
                                .max(20, "Must be 20 characters or less")
                                .required("Vui lòng nhập trường này"),
                            phone: Yup.string()
                                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ")
                                .required("Vui lòng nhập trường này"),
                            address: Yup.string()
                                .required("Vui lòng nhập trường này")
                                .max(50, "Tên không được vượt quá 50 kí tự"),
                            zipCode: Yup.string().matches(/([0-9]{6})/, "ZIP code phải chứa 6 chữ số"),
                        })}
                        onSubmit={(values) => handleSubmitForm(values, valueSelect)}
                        enableReinitialize
                    >
                        <Form>
                            <Row gutter={[24, 16]}>
                                <Col xs={24}>
                                    <CustomField name="email" type="email" label="Email " />
                                </Col>
                                <Col xs={24}>
                                    <div className="form__control">
                                        <Field
                                            type="checkbox"
                                            name="check"
                                            render={({ field }) => (
                                                <Checkbox {...field}>
                                                    Keep me up to date on news and offers
                                                </Checkbox>
                                            )}
                                        />
                                    </div>
                                </Col>

                                <Col sm={12} xs={24}>
                                    <CustomField name="firstName" type="text" label="First name " />
                                </Col>

                                <Col sm={12} xs={24}>
                                    <CustomField name="lastName" type="text" label="Last name " />
                                </Col>
                                <Col sm={15} xs={24}>
                                    <CustomField name="address" type="text" label="Address " />
                                </Col>
                                <Col sm={9} xs={24}>
                                    <CustomField name="phone" type="text" label="Phone " placeholder="(84)..." />
                                </Col>
                                <Col sm={9} xs={24}>
                                    <div className="form__control">
                                        <label htmlFor="title">Country/region</label>
                                        <Field
                                            name="country"
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    defaultValue="vi"
                                                    style={{ width: "100%" }}
                                                    className="form__control--select user__select"
                                                    onChange={(value) => setValueSelect(value)}
                                                >
                                                    <Option value="vi">
                                                        <img
                                                            src={VietNam}
                                                            className='user__select-img' alt='vi'
                                                        />
                                                        <span>Viet Nam</span>
                                                    </Option>
                                                    <Option value="en">
                                                        <img
                                                            src={English}
                                                            className='user__select-img' alt='en'
                                                        />
                                                        <span>England</span>
                                                    </Option>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </Col>
                                <Col sm={15} xs={24}>
                                    <CustomField name="zipCode" type="text" label="ZIP code " />
                                </Col>
                                <Col>
                                    <button type="submit" className="button button-round--lg button-primary">
                                        Tiếp tục
                                    </button>
                                    <button
                                        type="button"
                                        className="button button-round--lg button-transparent"
                                    >
                                        Quay lại giỏ hàng
                                    </button>
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
