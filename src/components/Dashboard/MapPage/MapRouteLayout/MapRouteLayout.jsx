import React from 'react';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import styles from './MapRouteLayout.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

export const MapRouteLayout = () => {
	return (

		<div className={styles.container}>
			MapRouteLayout
		</div>

	);
};