/** @format */

import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { Row, Col, Tabs, Input, Button, Comment, Tooltip, List, Collapse, Rate, Form, InputNumber, Pagination } from 'antd';
import moment from 'moment';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, HeartOutlined } from '@ant-design/icons';
import Star from '../../../components/Star';
import Slide from '../Home/Slide';
import { getProductDetail, getProductHome, createComment, getComment } from '../../../redux/actions';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import addToCart from '../../../redux/actions/cart.action';

const ProductDetails = ({
    getProductHome,
    productHome,
    productDetail,
    getProductDetail,
    match,
    comments,
    getComment,
    listComment,
    countComment,
    createComment,
}) => {
    const { t } = useTranslation();
    const product = productDetail.product;

    const productId = match.params.id;
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem('profile')));
    const [rateValue, setRateValue] = useState(0);
    const [isShowFormComment, setIsShowFormComment] = useState(false);
    const [isPayment, setIsPayment] = useState(true);
    const [current, setCurrent] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const { TabPane } = Tabs;
    const { Panel } = Collapse;

    const success = (value) => toast.success(`${value}`);
    const error = (value) => toast.error(`${value}`);
    const dispatch = useDispatch();

    useEffect(() => {
        const body = document.querySelector('#root');
        body.scrollIntoView({ behavior: 'smooth' }, 500);
        getProductHome();
        getProductDetail(productId);
        getComment({
            id: productId,
            page: current,
            limit: 10,
        });
    }, [productId, getProductHome, getProductDetail, listComment, current, getComment]);

    comments.reverse();

    function onChange(value) {
        setQuantity(value);
    }

    function addProductToCart(item) {
        dispatch(addToCart(item, quantity));
    }
    function callback(key) {
        setIsShowFormComment(!isShowFormComment);
    }

    function handleChangRate(value) {
        setRateValue(value);
    }

    const handleSubmitFormComment = (value) => {
        if (isPayment === true) {
            createComment({
                ...value,
                idUser: info.id,
                idProduct: productId,
                name: info.user.name ? info.name : info.user.firstname + ' ' + info.user.lastname,
                datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
                rate: rateValue,
            });

            success('Thanks for your comment!');
            setIsShowFormComment(false);
            setRateValue(0);
        } else {
            error("You didn't bought this product ago !");
            setIsShowFormComment(false);
        }
    };

    const renderProductDetail = () => {
        return (
            <>
                <section className='productDetail'>
                    <Row gutter={24}>
                        <Col md={10} sm={24} lg={10}>
                            <div className='productDetail__tabs'>
                                <div className='productDetail__tabs--img'>
                                    <Tabs tabPosition='bottom' defaultActiveKey='1'>
                                        {product?.img?.map((item, index) => (
                                            <>
                                                <TabPane
                                                    tab={
                                                        <div className='productDetail__tabs--img-bot'>
                                                            <img src={item} alt='Oganic' />
                                                        </div>
                                                    }
                                                    key={index + 1}>
                                                    <div className={`productDetail__tabs--img-top`}>
                                                        <img src={item} alt='Oganic' />
                                                    </div>
                                                </TabPane>
                                            </>
                                        ))}
                                    </Tabs>
                                </div>
                            </div>
                        </Col>

                        <Col md={12} sm={24} lg={12}>
                            <div className='productDetail__content'>
                                <div className='product__details__text'>
                                    <h3>{product?.name}</h3>
                                    <div className='product__details__rating'>
                                        <Star rate={product?.rate}></Star>
                                        <span>(18 {t('productDetail.review')})</span>
                                    </div>
                                    <div className='product__details__price'>
                                        {product?.newPrice.toLocaleString()}
                                        <span className='oldPrice'> {product?.oldPrice ? product?.oldPrice.toLocaleString() : ''} </span>
                                    </div>
                                    <p>{product?.description}</p>

                                    <Row>
                                        <div className='product__details__quantity'>
                                            <div className='quantity'>
                                                <div className='pro-qty'>
                                                    <InputNumber min={1} max={100} defaultValue={1} onChange={onChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <button href='#' className='button button-round button-primary' onClick={() => addProductToCart(product)}>
                                            {t('productDetail.addToCart')}
                                        </button>
                                        <HeartOutlined />
                                    </Row>
                                    <ul>
                                        <li>
                                            <b>{t('productDetail.Availability')}</b> <span>{t('productDetail.Availability__stock')}</span>
                                        </li>
                                        <li>
                                            <b></b>{' '}
                                            <span>
                                                {t('productDetail.ExpressShipping')} <br />
                                                <samp>{t('productDetail.FreePickup')}</samp>
                                            </span>
                                        </li>
                                        <li>
                                            <b>{t('productDetail.Weight')}</b> <span>0.5 kg</span>
                                        </li>
                                        <li>
                                            <b>{t('productDetail.Share')}</b>
                                            <div className='share'>
                                                <FacebookOutlined />
                                                <TwitterOutlined />
                                                <InstagramOutlined />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24} sm={24} lg={24}>
                            <div className='productDetail__reviews'>
                                <Tabs defaultActiveKey='1'>
                                    <TabPane tab='Description' key='1'>
                                        <div className='productDetail__reviews-desc'>
                                            <h6>Products Infomation</h6>
                                            <p>
                                                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci
                                                porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat.
                                                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget
                                                malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id
                                                imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.
                                                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in
                                                faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
                                                vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                                            </p>
                                            <p>
                                                Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras
                                                ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor
                                                lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet
                                                quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                                                vehicula elementum sed sit amet dui. Proin eget tortor risus.
                                            </p>
                                        </div>
                                    </TabPane>
                                    <TabPane tab='Infomation' key='2'>
                                        <div className='productDetail__reviews-desc'>
                                            <h6>Products Infomation</h6>
                                            <p>
                                                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci
                                                porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat.
                                                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget
                                                malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id
                                                imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.
                                                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in
                                                faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
                                                vel, ullamcorper sit amet ligula. Proin eget tortor risus.
                                            </p>
                                        </div>
                                    </TabPane>
                                    <TabPane tab={`Reviews (${countComment})`} key='3'>
                                        <div className='review__content'>
                                            <p className='review__content-header'>{t('productDetail.Review__customer')}</p>
                                            <Rate disabled defaultValue={5} />
                                            <Collapse
                                                activeKey={`${isShowFormComment === true ? 1 : ''}`}
                                                destroyInactivePanel
                                                ghost
                                                bordered={false}
                                                onChange={callback}
                                                style={{ display: info ? 'block' : 'none' }}>
                                                <Panel
                                                    showArrow={false}
                                                    header={<p className='write__content'>{t('productDetail.Review')}</p>}
                                                    key='1'>
                                                    <div className='review__content--form'>
                                                        <Form onFinish={handleSubmitFormComment}>
                                                            <p>{t('productDetail.Review__rating')}</p>
                                                            <Rate onChange={(value) => handleChangRate(value)} />
                                                            <p>{t('productDetail.Review__title')}</p>
                                                            <Form.Item
                                                                name='title'
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: t('productDetail.Review__validate.title'),
                                                                    },
                                                                ]}>
                                                                <Input />
                                                            </Form.Item>
                                                            <p>{t('productDetail.Review__body')}</p>
                                                            <Form.Item
                                                                name='content'
                                                                rules={[
                                                                    {
                                                                        max: 1000,
                                                                        message: t('productDetail.Review__validate.content'),
                                                                    },
                                                                ]}>
                                                                <Input.TextArea />
                                                            </Form.Item>
                                                            <Form.Item>
                                                                <Button type='primary' htmlType='submit'>
                                                                    {t('productDetail.Review__submit')}
                                                                </Button>
                                                            </Form.Item>
                                                        </Form>
                                                    </div>
                                                </Panel>
                                            </Collapse>
                                            <List
                                                className='comment-list'
                                                header={`${countComment} replies`}
                                                itemLayout='horizontal'
                                                dataSource={comments}
                                                renderItem={(item) => (
                                                    <li>
                                                        <Comment
                                                            author={item.name}
                                                            avatar={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                                            content={
                                                                <>
                                                                    <div>
                                                                        <Rate disabled value={item.rate} />
                                                                    </div>
                                                                    <div>
                                                                        <p>{item.title}</p>
                                                                        <span>{item.content}</span>
                                                                    </div>
                                                                </>
                                                            }
                                                            datetime={
                                                                <Tooltip title={item.datetime}>
                                                                    <span>{item.datetime}</span>
                                                                </Tooltip>
                                                            }
                                                            rate={item.rate}
                                                        />
                                                    </li>
                                                )}
                                            />
                                            {countComment > 0 && (
                                                <Pagination
                                                    total={countComment}
                                                    defaultCurrent={1}
                                                    current={current}
                                                    onChange={(page) => {
                                                        setCurrent(page);
                                                        window.scrollTo(0, 0);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24} sm={24} lg={24}>
                            <div className='productDetail__recent'>
                                <div className='section-title'>
                                    <h2>{t('productDetail.RecentProduct')}</h2>
                                </div>
                            </div>
                        </Col>

                        <Col md={24} sm={24} lg={24}>
                            <Slide data={productHome.special} type='product' xl={4} lg={4} md={3} sm={2} xs={2}></Slide>
                        </Col>
                    </Row>
                </section>
            </>
        );
    };

    return (
        <>
            <Breadcrumb />
            {renderProductDetail()}
        </>
    );
};

const mapStateToProps = (state) => {
    const { productDetail, comments, listComment, countComment } = state.productDetailReducer;
    const { productHome } = state.productReducer;

    return {
        productDetail,
        productHome,
        comments,
        listComment,
        countComment,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProductHome: (params) => dispatch(getProductHome(params)),
        getProductDetail: (params) => dispatch(getProductDetail(params)),
        createComment: (params) => dispatch(createComment(params)),
        getComment: (params) => dispatch(getComment(params)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
