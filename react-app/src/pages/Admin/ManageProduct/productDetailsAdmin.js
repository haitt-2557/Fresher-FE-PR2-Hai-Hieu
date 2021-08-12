import React, { useEffect } from 'react';
import { Layout, Typography, Descriptions, Row, Col, Image, Rate } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { getProductDetail, getSidebar } from '../../../redux/actions';
import { connect } from 'react-redux';
import "./styles.scss";

const { Content } = Layout;
const { Title } = Typography;

const ProductDetailsAdmin = ({
    productDetail,
    getProductDetail,
    getSidebar
}) => {
    let history = useHistory();
    let { id } = useParams();
    const productId = id;
    const product = productDetail.product;

    useEffect(() => {
        getSidebar();
    }, []);

    useEffect(() => {
        getProductDetail(productId);
    }, [productId, getProductDetail])

    function handleClick() {
        history.push("/admin/manage-product");
    }

    return (
        <>
            <Layout style={{ padding: '10px 20px 20px' }}>
                <Title level={4}>Product details</Title>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Row gutter={24}>
                        <Col xs={24} sm={12} md={18} lg={18} xl={6}>
                            <Image
                                width={200}
                                src={product?.img[0]}
                            />
                        </Col>

                        <Col xs={24} sm={12} md={18} lg={18} xl={18}>
                            <Descriptions title={product?.name}>
                                <Descriptions.Item label="Price">{product?.newPrice.toLocaleString()}</Descriptions.Item>
                                <Descriptions.Item label="New">
                                    {product?.news ? "Hot" : "New"}</Descriptions.Item>
                                <Descriptions.Item label="Rating"><Rate tooltips="Rating" value={product?.rate} />
                                </Descriptions.Item>
                                <Descriptions.Item label="Description">
                                    {product?.description}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <a type="link" onClick={handleClick} className="backToList"> Back to product list</a>
                </Content>
            </Layout>
        </>
    )
}

const mapStateToProps = (state) => {
    const { productDetail } = state.productDetailReducer;

    return {
        productDetail,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetail: (params) => dispatch(getProductDetail(params)),
        getSidebar: (params) => dispatch(getSidebar(params)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsAdmin);
