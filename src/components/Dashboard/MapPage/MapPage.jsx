import React from 'react';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { MapNoCardLayout } from './MapNoCardLayout/'
import MapRouteLayout from './MapRouteLayout/'
import styles from './MapPage.module.css';
import { Preloader } from '../../shared/Preloader';

const st = classNames.bind(styles);

export const drawRoute = (map, coordinates) => {
	map.flyTo({
		center: coordinates[0],
		zoom: 15
	});

	map.addLayer({
		id: "route",
		type: "line",
		source: {
			type: "geojson",
			data: {
				type: "Feature",
				properties: {},
				geometry: {
					type: "LineString",
					coordinates
				}
			}
		},
		layout: {
			"line-join": "round",
			"line-cap": "round"
		},
		paint: {
			"line-color": "#ffc617",
			"line-width": 8
		}
	});
	console.log('----Функция отработала', coordinates)
};

const MapPage = (props) => {
	const { isCard, isCardLoading, coordinates } = props;
	console.log('------------', isCard)
	const myMapRef = useRef();

	useEffect(() => {
		let map;
		mapboxgl.accessToken =
			'pk.eyJ1IjoidGVyYXRyb24iLCJhIjoiY2s4c3dyOGZ4MDNoMjNlbGtvYzJ3NzBsciJ9.h0f9Px2X_1Go39lBV5kq7Q';
		map = new mapboxgl.Map({
			container: myMapRef.current || '',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [30.2656504, 59.8029126],
			zoom: 15,
		});

		map.on('style.load', () => drawRoute(map, coordinates))
	});

	return (
		<>

			{isCardLoading ? (<Preloader />)
				: (isCard ? <MapRouteLayout /> : <MapNoCardLayout />)}

			<div className={st('map-page')} ref={myMapRef}>

			</div>
		</>
	);
};

export const mapStateToProps = (state) => {
	return {
		isCard: state.profile.isCard,
		isCardLoading: state.profile.isCardLoading,
		coordinates: state.route.myRouteList,
	};
};

export default connect(mapStateToProps, null)(MapPage);
