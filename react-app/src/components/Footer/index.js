/** @format */

import React from 'react';
import { Container } from '@material-ui/core';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './style.scss';
import { useTranslation } from 'react-i18next';
const { Search } = Input;
export default function Footer() {
	const { t } = useTranslation();
	const footerData = [
		{
			id: 1,
			name: 'Useful Links',
			list: ['About Us', 'About Our Shop', 'Secure Shopping', 'Delivery infomation', 'Privacy Policy', 'Our Sitemap'],
		},
		{
			id: 2,
			name: 'About Us',
			list: ['Who We Are', 'Our Services', 'Projects', 'Contact', 'Innovation', 'Testimonials'],
		},
	];
	return (
		<footer className='footer'>
			<Container>
				<Row>
					<Col lg={8} md={24} xs={24}>
						<div className='footer__infor'>
							<img src={logo} alt='logo' className='footer__infor-logo' />
							<p className='footer__infor-address'>{t('footer.Address')}</p>
							<p className='footer__infor-phone'>{t('footer.Phone')}: +65 11.188.888</p>
							<p className='footer__infor-email'>{t('footer.Email')}: ogani@gmail.com</p>
						</div>
					</Col>
					{footerData.map((item) => (
						<Col lg={4} md={12} xs={24} key={item.id}>
							<div className='footer__item'>
								<h3 className='footer__item-head'>{t(`footer.${item.name}`)}</h3>
								{item.list.map((item, index) => (
									<Link to='#' key={index + 1}>
										<p className='footer__item-text'>{t(`footer.${item}`)}</p>
									</Link>
								))}
							</div>
						</Col>
					))}
					<Col lg={8} md={24} xs={24}>
						<div className='footer__subcribe'>
							<h3 className='footer__subcribe-head'>{t('footer.Subcribe')}</h3>
							<p className='footer__subcribe-text'>{t('footer.Text')}</p>
							<Search
								placeholder={t('footer.Placeholder')}
								enterButton={t('footer.Subcribe_btn')}
								size='large'
								className='footer__subcribe-btn '
							/>
							<div className='footer__subcribe-icon'>
								<Link to='' className='icon__custom'>
									<FaFacebookF />
								</Link>
								<Link to='' className='icon__custom'>
									<FiInstagram />
								</Link>
								<Link to='' className='icon__custom'>
									<FaLinkedinIn />
								</Link>
								<Link to='' className='icon__custom'>
									<FaPinterestP />
								</Link>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}
