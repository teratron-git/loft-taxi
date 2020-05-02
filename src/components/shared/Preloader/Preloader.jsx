import React from 'react';
import styles from './Preloader.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

export function Preloader() {
	return (
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
		</div>
	);
}
