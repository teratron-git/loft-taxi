import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames/bind';
import { MCIcon } from 'loft-taxi-mui-theme';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../../store/profile/actions';
import {
	getCardCvv,
	getCardExpiry,
	getCardName,
	getCardNumber,
	getError,
	getIsCard,
	getIsCardLoading,
} from '../../../store/profile/selectors';
import { Preloader } from '../../shared/Preloader';
import styles from './ProfilePage.module.css';

let { card, cardErrorReset } = actions;
const st = classNames.bind(styles);

const ProfilePage = (props) => {
	let { handleSubmit, control, formState, errors } = useForm();

	let [cardName, setCardName] = useState(props.cardName);
	let [cardNumber, setCardNumber] = useState(props.cardNumber);
	let [cardExpiry, setCardExpiry] = useState(props.cardExpiry);
	let [cardCvv, setCardCvv] = useState(props.cardCvv);

	let { card, cardErrorReset, serverError, isCardLoading, isCard } = props;

	const changeCardNameHandler = (e) => {
		setCardName(e.target.value);
	};

	const changeCardNumberHandler = (e) => {
		setCardNumber(e.target.value);
	};

	const changeCardExpiryHandler = (e) => {
		setCardExpiry(e.target.value);
	};

	const changeCardCvvHandler = (e) => {
		setCardCvv(e.target.value);
	};

	const submitHandler = (e) => {
		card({
			cardName: e.cardName,
			cardNumber: e.cardNumber,
			cardExpiry: e.cardExpiry,
			cardCvv: e.cardCvv,
		});
	};

	useEffect(() => {
		cardErrorReset();
		return () => {
			cardErrorReset();
		};
	}, [cardErrorReset]);

	return (
		<div className={st('profile-page')}>
			<div className={st('profile-page__loginForm')}>
				<div className={st('profile-page__loginForm-item')} style={{ height: '400px' }}>
					<div className={st('header-form')}>Профиль</div>
					<Typography variant="h4" color="inherit" align="center">
						Способ оплаты
					</Typography>
					<div className={styles.container}>
						<Paper elevation={13} className={styles.paper}>
							<MCIcon className={styles.MCIcon} />
							<form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
								<Controller
									as={TextField}
									control={control}
									defaultValue={cardName}
									className={st('font-size')}
									type="text"
									label="Имя владельца*"
									placeholder="Имя владельца"
									name="cardName"
									value={cardName}
									onChange={changeCardNameHandler}
									margin="none"
									autoComplete="cc-name"
									fullWidth
									rules={{
										required: 'Введите имя',
										pattern: {
											value: /^[а-яА-ЯёЁa-zA-Z\s]+$/i,
											message: 'Используйте только буквы',
										},
									}}
								/>
								<span className={st('validateError')}>
									{errors.cardName && errors.cardName.message}
								</span>
								<Controller
									as={<NumberFormat format="#### #### #### ####" mask="_" />}
									control={control}
									defaultValue={cardNumber}
									className={st('font-size')}
									customInput={TextField}
									label="Номер карты*"
									placeholder="Номер карты"
									name="cardNumber"
									value={cardNumber}
									onChange={changeCardNumberHandler}
									margin="none"
									fullWidth
									rules={{
										required: 'Введите номер карты',
										minLength: {
											value: 19,
											message: 'Введите не менее 16 цифр',
										},
										pattern: {
											value: /^\d{4}([\s]|)\d{4}([\s]|)\d{4}([\s]|)\d{4}$/i,
											message: 'Введите не менее 16 цифр',
										},
									}}
								/>
								<span className={st('validateError')}>
									{errors.cardNumber && errors.cardNumber.message}
								</span>
								<Controller
									as={<NumberFormat format={cardExpiryFunc} placeholder="MM/YY" />}
									control={control}
									defaultValue={cardExpiry}
									className={st('font-size')}
									customInput={TextField}
									label="Дата окончания действия*"
									placeholder="ММ/ГГ"
									name="cardExpiry"
									value={cardExpiry}
									onChange={changeCardExpiryHandler}
									margin="none"
									fullWidth
									rules={{
										required: 'Введите дату окончания действия',
										minLength: {
											value: 5,
											message: 'Введите корректную дату',
										},
									}}
								/>
								<span className={st('validateError')}>
									{errors.cardExpiry && errors.cardExpiry.message}
								</span>
								<Controller
									as={<NumberFormat format="###" mask="_" />}
									control={control}
									defaultValue={cardCvv}
									className={st('font-size')}
									customInput={TextField}
									label="CVV*"
									placeholder="CVV"
									name="cardCvv"
									value={cardCvv}
									onChange={changeCardCvvHandler}
									margin="none"
									fullWidth
									rules={{
										required: 'Введите CVV',
										minLength: {
											value: 3,
											message: 'Введите не менее 3 цифр',
										},
										pattern: {
											value: /^\d{3}$/i,
											message: 'Введите не менее 3 цифр',
										},
									}}
								/>
								<span className={st('validateError')}>
									{errors.cardCvv && errors.cardCvv.message}
								</span>
								<span className={st({ error: !isCard, 'no-error': isCard })}>{serverError}</span>
								{isCardLoading ? (
									<div className={st('preloader-position')}>
										<Preloader />
									</div>
								) : (
									<Button
										className={styles.button}
										type="submit"
										variant="contained"
										size="medium"
										color="primary"
										disabled={
											!(
												(isCard &&
													(formState.dirtyFields.cardName ||
														formState.dirtyFields.cardNumber ||
														formState.dirtyFields.cardExpiry ||
														formState.dirtyFields.cardCvv)) ||
												(formState.dirtyFields.cardName &&
													formState.dirtyFields.cardNumber &&
													formState.dirtyFields.cardExpiry &&
													formState.dirtyFields.cardCvv)
											) ||
											(formState.isSubmitted && !formState.isValid)
										}
									>
										{!isCard ? 'Сохранить' : 'Обновить'}
									</Button>
								)}
							</form>
						</Paper>
					</div>
				</div>
			</div>
		</div>
	);
};

export const mapStateToProps = (state) => {
	return {
		cardName: getCardName(state),
		cardNumber: getCardNumber(state),
		cardExpiry: getCardExpiry(state),
		cardCvv: getCardCvv(state),
		isCard: getIsCard(state),
		isCardLoading: getIsCardLoading(state),
		serverError: getError(state),
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		card: bindActionCreators(card, dispatch),
		cardErrorReset: bindActionCreators(cardErrorReset, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

// Validation functions
function limit(val, max) {
	if (val.length === 1 && val[0] > max[0]) {
		val = '0' + val;
	}

	if (val.length === 2) {
		if (Number(val) === 0) {
			val = '01';

			//this can happen when user paste number
		} else if (val > max) {
			val = max;
		}
	}

	return val;
}

function cardExpiryFunc(val) {
	let month = limit(val.substring(0, 2), '12');
	let year = val.substring(2, 4);

	return month + (year.length ? '/' + year : '');
}
