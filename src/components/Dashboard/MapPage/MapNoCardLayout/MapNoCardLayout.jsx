import React from 'react';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import styles from './MapNoCardLayout.module.css';
import classNames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

const st = classNames.bind(styles);

export const MapNoCardLayout = () => {

	return (
		<div className={styles.container}>
			<Paper elevation={13} className={styles.paper}>
				<div className={styles.text}>
					Сначала необходимо заполнить профиль
				</div>
				<Link to='profile'>
					<Button className={st('button')}
						variant="contained"
						size="medium"
						color="primary">Заполнить</Button>
				</Link>
			</Paper>
		</div >
	);
};
