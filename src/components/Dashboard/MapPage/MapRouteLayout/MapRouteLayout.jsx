import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import styles from './MapRouteLayout.module.css';
import classNames from 'classnames/bind';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import SelectField from '../SelectField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { actions } from '../../../../store/route/actions';
import { bindActionCreators } from 'redux';

const st = classNames.bind(styles);

let { addressList, route, routeReset } = actions;

const MapRouteLayout = (props) => {
	let [from, setFrom] = useState('');
	let [to, setTo] = useState('');
	let { myAddressList, myRouteList, route, addressList, error, isRoute, routeReset } = props;


	const changeFromHandler = (e) => {
		setFrom(e.target.value);
		console.log('e.target.value', e.target.value)
	};

	const changeToHandler = (e) => {
		setTo(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		route({ from, to });
	};

	const submitHandlerReset = (e) => {
		e.preventDefault();
		routeReset();
	};

	useEffect(() => {
		addressList();
	}, []);

	console.log('myAddressList', myAddressList)
	console.log('myRouteList', myRouteList)


	return (
		<>

			{!isRoute ? (
				<div className={styles.container} >
					<form className={styles.form} onSubmit={submitHandler}>
						<Typography variant="h4" color="inherit">
							Вызов такси
        </Typography>
						<FormControl required className={styles.formControl}>
							<InputLabel htmlFor="age-native-required">Откуда</InputLabel>
							<Select
								native
								value={from}
								onChange={changeFromHandler}
								name="from"
							// inputProps={{
							// 	id: 'age-native-required',
							// }}
							>
								<option aria-label="None" value="" />
								{myAddressList.map((place, i) => (
									<option key={i} value={place} >{place}</option>
								))}
							</Select>
							<FormHelperText>Required</FormHelperText>
						</FormControl>
						<FormControl required className={styles.formControl}>
							<InputLabel htmlFor="age-native-required">Куда</InputLabel>
							<Select
								native
								value={to}
								onChange={changeToHandler}
								name="to"
								inputProps={{
									id: 'age-native-required',
								}}
							>
								<option aria-label="None" value="" />
								{myAddressList.map((place, i) => (
									<option key={i} value={place} >{place}</option>
								))}
							</Select>
							<FormHelperText>Required</FormHelperText>
						</FormControl>

						<Button
							type="submit"
							variant="outlined"
							size="medium"
							color="primary"
							disabled={!from || !to}
						>
							Вызвать такси
        </Button>
					</form >
				</div >)
				: (
					<div className={styles.container}>
						<Typography variant="h4" color="inherit">
							Вы вызвали такси!
        </Typography>
						<form className={styles.form} onSubmit={submitHandlerReset}>
							<Button
								type="submit"
								variant="outlined"
								size="medium"
								color="primary"

							>
								Заказать ещё
						</Button>
						</form>
					</div>
				)}
		</>

	);
};

export const mapStateToProps = (state) => {
	return {
		myAddressList: state.route.myAddressList,
		myRouteList: state.route.myRouteList,
		isRoute: state.route.isRoute,
		error: state.route.error,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		addressList: bindActionCreators(addressList, dispatch),
		route: bindActionCreators(route, dispatch),
		routeReset: bindActionCreators(routeReset, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapRouteLayout);
