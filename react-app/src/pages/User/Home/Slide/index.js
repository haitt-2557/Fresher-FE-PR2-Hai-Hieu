/** @format */

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductItem from '../../../../components/ProductItem';

import './style.scss';
import { Col, Row } from 'antd';
import useWindowDimensions from '../../../../utils/index';

const Slide = ({ data, type, xl, lg, md, sm, xs, page }) => {
	const { width } = useWindowDimensions();

	const slidesToShow = () => {
		if (width > 992) return xl;
		else if (width > 850) return lg;
		else if (width > 768) return md;
		else if (width > 500) return sm;
		else return xs;
	};

	const settings = {
		dots: type === 'slideShow' || page === 'product' ? true : false,
		infinite: true,
		speed: type === 'slideShow' ? 1000 : 800,
		slidesToShow: type === 'slideShow' ? 1 : slidesToShow(),
		slidesToScroll: 1,
		autoplay: true,
		swipe: true,
		arrows: true,
		autoplaySpeed: 3500,
		cssEase: 'ease-in-out',
		centerPadding: '10px',
	};

	const slideShow = (item, index) => {
		return (
			<div key={1}>
				<div className='slideShow__img' style={{ backgroundImage: `url(${item.img})` }} key={`slideShow-${index}`}>
					<div className={`slideShow__content  slideShow__content--${index + 1}`}>
						<h4>{item.thumbnail}</h4>
						<h2>
							{item.title[0]} <br /> {item.title[1]}
						</h2>
						<button className='button button-round--lg button-primary'>SHOP NOW</button>
					</div>
				</div>
			</div>
		);
	};

	const slideCategory = (item, index) => {
		return (
			<div className='slide-category__item' key={`category-${item.id}`}>
				<a href='/' className='slide-category__img'>
					<img src={item.img} alt='anh category'></img>
				</a>
				<div className='slide-category__content'>
					<h4 className='slide-category__title'>{item.name}</h4>
				</div>
			</div>
		);
	};

	const slideProduct = (data, currentPage) => {
		let tempArr = [];
		for (let i = 0; i < data?.length; i += 2) {
			const carouselContent = data.slice(i, i + 2);

			carouselContent.length === 2 && tempArr.push(carouselContent);
		}
		if (currentPage && currentPage === 'product') {
			return tempArr.map((element, index) =>
				element.map((item) => (
					<Row key={`row-${item.id}`} gutter={[16, 16]}>
						<Col sm={24} className='slide-product__col' key={`col-${element.id}-${index}`}>
							<ProductItem data={item}> </ProductItem>
						</Col>
					</Row>
				)),
			);
		} else {
			return tempArr.map((element, index) => (
				<Row key={`row-${element.id}-${index}`} gutter={[16, 16]}>
					<Col sm={24} key={`col-${index}+1`}>
						{element.map((item, index) => (
							<Row key={`rows-${item.id} + ${index}`} gutter={[16, 16]}>
								<Col sm={24} className='slide-product__col' key={`col-child-${item.id}-${index + 1}`}>
									<ProductItem data={item}> </ProductItem>
								</Col>
							</Row>
						))}
					</Col>
				</Row>
			));
		}
	};

	return (
		<div className={`slide ${type === 'slideShow' ? 'slideShow' : type === 'category' ? 'slide-category' : 'slide-product'}`}>
			<Slider {...settings}>
				{type === 'slideShow' || type === 'category'
					? data?.map((item, index) => (type === 'slideShow' ? slideShow(item, index) : slideCategory(item, index)))
					: slideProduct(data, page)}
			</Slider>
		</div>
	);
};

export default Slide;
