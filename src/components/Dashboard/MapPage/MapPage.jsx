import React from 'react';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import styles from './MapPage.module.css';
import classNames from 'classnames/bind';
import { MapNoCardLayout } from './MapNoCardLayout/'
import { MapRouteLayout } from './MapRouteLayout/'

const st = classNames.bind(styles);

const MapPage = (props) => {
	const { isCard, isCardLoaded } = props;
	console.log('------------', isCard)
	const myMapRef = useRef();
	useEffect(() => {
		let map = null;

		mapboxgl.accessToken =
			'pk.eyJ1IjoidGVyYXRyb24iLCJhIjoiY2s4c3dyOGZ4MDNoMjNlbGtvYzJ3NzBsciJ9.h0f9Px2X_1Go39lBV5kq7Q';
		map = new mapboxgl.Map({
			container: myMapRef.current || '',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [30.2656504, 59.8029126],
			zoom: 15,
		});
	});

	return (
		<>

			{!isCardLoaded ? (
				<div className={st('overlay-loader')} >
					<div className={st('loader')} >
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>)
				: (isCard ? <MapRouteLayout /> : <MapNoCardLayout />)}

			<div className={st('map-page')} ref={myMapRef}>

			</div>
		</>
	);
};

export const mapStateToProps = (state) => {
	return {
		isCard: state.profile.isCard,
		isCardLoaded: state.profile.isCardLoaded,
	};
};

export default connect(mapStateToProps, null)(MapPage);
