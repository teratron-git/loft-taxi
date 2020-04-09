import React from 'react';
import { Header } from '../Header';

export class MapPage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="map-page">Содержимое карты</div>
			</div>
		);
	}
}
