import React from 'react';
import { Header } from '../Header';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRef } from 'react';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import { Logo } from '../shared/Logo';
import { LoginForm } from '../LoginPage/LoginForm';

export const MapPage = (props) => {
	const authContext = useContext(AuthContext);
	const myMapRef = useRef();

	const getPage = (page) => {
		props.getPage(page);
	};

	useEffect(() => {
		if (authContext.isLoggedIn) {
			mapboxgl.accessToken =
				'pk.eyJ1IjoidGVyYXRyb24iLCJhIjoiY2s4c3dyOGZ4MDNoMjNlbGtvYzJ3NzBsciJ9.h0f9Px2X_1Go39lBV5kq7Q';
			let map = new mapboxgl.Map({
				container: myMapRef.current || '',
				style: 'mapbox://styles/mapbox/streets-v9',
				center: [30.2656504, 59.8029126],
				zoom: 15,
			});
		}
	});

	return (
		<>
			{authContext.isLoggedIn ? (
				<div className="app">
					<Header getPage={getPage} />
					<div className="map-page" ref={myMapRef}></div>
				</div>
			) : (
				<div className="app">
					<Header getPage={getPage} />
					<div className="login-page">
						<Logo />
						<LoginForm getPage={getPage} />
					</div>
				</div>
			)}
		</>
	);
};

MapPage.propTypes = {
	getPage: PropTypes.func,
};
