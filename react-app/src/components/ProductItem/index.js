import React from "react";
import { useHistory } from "react-router-dom";
import Star from "../Star";
import { IoEyeSharp } from "react-icons/io5";
import { HiShoppingBag, HiHeart } from "react-icons/hi";
import { Tooltip } from "antd";

import "./styles.scss";

const ProductItem = ({ data }) => {
    let history = useHistory();
    let { id, name, rate, newPrice, oldPrice, news, img } = data;
    const sales = oldPrice && Math.ceil((1 - newPrice / oldPrice) * 100);

    return (
        <div className="product-item">
            <div className="product-item__img">
                <a href="#" className="rotate-img">
                    <img src={img[0]} alt="anh" />
                    <img src={img[1]} alt="ANH" />
                </a>
                <div className="product-item__widget">
                    <span className="icon icon-round product-item__widget-icon">
                        <Tooltip placement="top" title="WISHLIST">
                            <HiHeart />
                        </Tooltip>
                    </span>
                    <span className="icon icon-round product-item__widget-icon" >
                        <Tooltip placement="top" title="ADD TO CARD">
                            <HiShoppingBag />
                        </Tooltip>
                    </span>

                    <span className="icon icon-round product-item__widget-icon" onClick={() => history.push(`/product/${id}`)}
                    >
                        <Tooltip placement="top" title="QUICKVIEW">
                            <IoEyeSharp />
                        </Tooltip>
                    </span>
                </div>
                {news && <span className="product-item--new ">New</span>}
                {oldPrice && <span className="product-item--sale">{sales} %</span>}
            </div>

            <div className="product-item__content">
                <h3 className="product-item__name">{name}</h3>
                <div className="product-item__rate">
                    <Star rate={rate}></Star>
                </div>
                <div className="product-item__price">
                    <span className="product-item__price--new">{`$${newPrice.toLocaleString()}`}</span>
                    {oldPrice && (
                        <span className="product-item__price--old">{` $${oldPrice.toLocaleString()}`}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
