import React from 'react';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import styles from './MapPage.module.css';
import classNames from 'classnames/bind';
import { MapNoCardLayout } from './MapNoCardLayout/'
import MapRouteLayout from './MapRouteLayout/'

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
	const { isCard, isCardLoaded, coordinates } = props;
	console.log('------------', isCard)
	const myMapRef = useRef();
	const test = [[30.348308, 59.932573], [30.355483, 59.93168], [30.350019, 59.922859], [30.339609, 59.919693], [30.342747, 59.917104], [30.320473, 59.909069], [30.300603, 59.909234], [30.299499, 59.898466], [30.302343, 59.887851], [30.298358, 59.875588], [30.293599, 59.8747], [30.290602, 59.852339], [30.279596, 59.834648], [30.27679, 59.832989], [30.275081, 59.833692], [30.283282, 59.832596], [30.291613, 59.82616], [30.322928, 59.809261], [30.323901, 59.79261], [30.318439, 59.790863], [30.300942, 59.793364], [30.282353, 59.796571], [30.27744, 59.799996], [30.272183, 59.80065]]

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
		coordinates: state.route.myRouteList,
	};
};

export default connect(mapStateToProps, null)(MapPage);
