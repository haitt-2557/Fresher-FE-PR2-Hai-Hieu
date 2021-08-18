import React from 'react'
import { Row, Col } from 'antd';
import {
    Link
} from "react-router-dom";
import './styles.scss';

const Breadcrumb = () => {
    return (
        <>
            <section className="breadcrumb">
                <Row>
                    <Col sm={24} md={24}>
                        <div className="breadcrumb__text">
                            <div className="breadcrumb__option">
                                <Link to="/">Home</Link>
                                <Link to="/">Home</Link>
                                <span>Vegetable’s Package</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default Breadcrumb
