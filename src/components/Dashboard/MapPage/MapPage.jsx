import React from 'react';
import Header from '../Header';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';

const MapPage = () => {
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

	return <div className="map-page" ref={myMapRef}></div>;
};

MapPage.propTypes = {
	getPage: PropTypes.func,
};

export default connect(null, null)(MapPage);
