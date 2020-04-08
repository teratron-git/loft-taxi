import React from 'react';
import { Header } from '../Header';
import mapboxgl from 'mapbox-gl';

export class MapPage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};

	myMapRef = React.createRef();

	componentDidMount() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoidGVyYXRyb24iLCJhIjoiY2s4c3dyOGZ4MDNoMjNlbGtvYzJ3NzBsciJ9.h0f9Px2X_1Go39lBV5kq7Q';
		this.map = new mapboxgl.Map({
			container: this.myMapRef.current,
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [30.2656504, 59.8029126],
			zoom: 15,
		});
	}

	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="map-page" ref={this.myMapRef}></div>
			</div>
		);
	}
}
