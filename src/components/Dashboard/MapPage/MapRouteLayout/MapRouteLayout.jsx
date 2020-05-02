import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { bindActionCreators } from 'redux';
import styles from './MapRouteLayout.module.css';
import { actions } from '../../../../store/route/actions';
import { Preloader } from '../../../shared/Preloader';

const st = classNames.bind(styles);
const { addressList, route, routeReset } = actions;

const MapRouteLayout = (props) => {
	let [from, setFrom] = useState('');
	let [to, setTo] = useState('');
	let { myAddressList, route, addressList, isRoute, isRouteLoading, routeReset } = props;

	const changeFromHandler = (e) => {
		setFrom(e.target.value);
	};

	const changeToHandler = (e) => {
		setTo(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		route({ from, to });
		setFrom('');
		setTo('');
	};

	const submitHandlerReset = (e) => {
		e.preventDefault();
		routeReset();
	};

	useEffect(() => {
		addressList();
	}, []);

	return (
		<>
			{!isRoute ? (
				<Paper elevation={13} className={styles.container} >
					<form className={styles.form} onSubmit={submitHandler}>
						<Typography variant="h4" color="inherit" className={st('header')}>
							Вызов такси
        		</Typography>
						<FormControl required className={styles.formControl}>
							<InputLabel htmlFor="age-native-required">Откуда</InputLabel>
							<Select
								native
								value={from}
								onChange={changeFromHandler}
								name="from"
								className={st('select')}
							>
								<option aria-label="None" value="" />
								{myAddressList.filter(place => place !== to).map((place, i) => (
									<option key={i} value={place} >{place}</option>
								))}
							</Select>
						</FormControl>
						<FormControl required className={styles.formControl}>
							<InputLabel htmlFor="age-native-required">Куда</InputLabel>
							<Select
								native
								value={to}
								onChange={changeToHandler}
								name="to"
								className={st('select')}
							>
								<option aria-label="None" value="" />
								{myAddressList.filter(place => place !== from).map((place, i) => (
									<option key={i} value={place} >{place}</option>
								))}
							</Select>
						</FormControl>
						{isRouteLoading ? (<div className={st('preloader-position')}><Preloader /></div>)
							: (
								<Button
									type="submit"
									variant="outlined"
									size="medium"
									color="primary"
									disabled={!from || !to}
									className={st('button')}
								>
									Вызвать такси
								</Button>
							)}
					</form >
				</Paper >)
				: (
					<Paper elevation={13} className={styles.container}>
						<Typography variant="h4" color="inherit">
							Вы вызвали такси!
        </Typography>
						<form className={styles.form} onSubmit={submitHandlerReset}>
							<Button
								type="submit"
								variant="outlined"
								size="medium"
								color="primary"
								className={st('button')}
							>
								Заказать ещё
						</Button>
						</form>
					</Paper>
				)}
		</>

	);
};

export const mapStateToProps = (state) => {
	return {
		myAddressList: state.route.myAddressList,
		isRoute: state.route.isRoute,
		isRouteLoading: state.route.isRouteLoading,
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
