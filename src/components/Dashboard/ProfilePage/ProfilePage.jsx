import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { MCIcon } from 'loft-taxi-mui-theme';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { actions } from '../../../store/profile/actions';
import { Preloader } from '../../shared/Preloader';
import styles from './ProfilePage.module.css';
import { getCardName, getCardNumber, getError, getCardCvv, getIsCard, getIsCardLoading, getCardExpiry } from '../../../store/profile/selectors'
import { store } from '../../../index'

let { card, cardErrorReset } = actions;
const st = classNames.bind(styles);

const validate = values => {
	const errors = {}
	console.log('values', values)
	!values.cardName
		? (errors.cardName = 'Поле не должно быть пустым')
		: (/^.*[^A-zА-яЁё\s].*$/i.test(values.cardName)
			? errors.cardName = 'Используйте только буквы'
			: errors.cardName = null)

	!values.cardNumber
		? (errors.cardNumber = 'Поле не должно быть пустым')
		: (!/^\d{16}$/i.test(values.cardNumber)
			? errors.cardNumber = 'Введите 16 цифр'
			: errors.cardNumber = null)

	!values.cardExpiry
		? (errors.cardExpiry = 'Поле не должно быть пустым')
		: (!/^\d{4}$/i.test(values.cardExpiry)
			? errors.cardExpiry = 'Введите 4 цифры'
			: errors.cardExpiry = null)

	!values.cardCvv
		? (errors.cardCvv = 'Поле не должно быть пустым')
		: (!/^\d{3}$/i.test(values.cardCvv)
			? errors.cardCvv = 'Введите 3 цифры'
			: errors.cardCvv = null)

	return errors;
}

const customTextField = ({ input, type, placeholder, id, className, label, fullWidth, inputProps, meta: { touched, error }, ...rest }) => {
	return (<><TextField {...input} placeholder={placeholder} type={type} id={id} className={className} label={label} fullWidth={fullWidth} inputProps={inputProps} />
		<span className={st('validateError')}>{touched && error}</span>
	</>)
}

const ProfilePage = (props) => {
	let [cardName, setCardName] = useState(props.cardName);
	let [cardNumber, setCardNumber] = useState(props.cardNumber);
	let [cardExpiry, setCardExpiry] = useState(props.cardExpiry);
	let [cardCvv, setCardCvv] = useState(props.cardCvv);
	console.log('props', props)

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
		e.preventDefault();
		card({ cardName, cardNumber, cardExpiry, cardCvv });
	};

	useEffect(() => {
		cardErrorReset();
		store.dispatch(reset('ProfilePage'));
		return () => { cardErrorReset() }
	}, [])

	return (
		<div className={st('profile-page')}>
			<div className={st('profile-page__loginForm')}>
				<div className={st('profile-page__loginForm-item')} style={{ height: '400px' }}>
					<div className={st('header-form')}>Профиль</div>
					<Typography variant="h4" color="inherit" align="center">Способ оплаты</Typography>
					<div className={styles.container}>
						<Paper elevation={13} className={styles.paper}>
							<MCIcon className={styles.MCIcon} />
							<form className={styles.form} onSubmit={submitHandler}>
								<Field
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
									required
									component={customTextField}
									inputProps={{ value: cardName }}
								/>
								<Field
									className={st('font-size')}
									customInput={TextField}
									label="Номер карты*"
									placeholder="Номер карты"
									name="cardNumber"
									value={cardNumber}
									onChange={changeCardNumberHandler}
									margin="none"
									autoComplete="cc-number"
									fullWidth
									required
									component={customTextField}
									inputProps={{ maxLength: "16", value: cardNumber }}
								/>
								<Field
									className={st('font-size')}
									customInput={TextField}
									label="Дата окончания действия*"
									placeholder="мм/гг"
									name="cardExpiry"
									value={cardExpiry}
									onChange={changeCardExpiryHandler}
									margin="none"
									autoComplete="cc-exp"
									fullWidth
									required
									component={customTextField}
									inputProps={{ maxLength: "4", value: cardExpiry }}
								/>
								<Field
									className={st('font-size')}
									type="password"
									customInput={TextField}
									label="CVV*"
									placeholder="CVV"
									name="cardCvv"
									value={cardCvv}
									onChange={changeCardCvvHandler}
									margin="none"
									autoComplete="cc-csc"
									fullWidth
									required
									component={customTextField}
									inputProps={{ maxLength: "3", value: cardCvv }}
								/>
								<span className={st({ 'error': !isCard, 'no-error': isCard })}>{serverError}</span>
								{isCardLoading ? (<div className={st('preloader-position')}><Preloader /></div>)
									: (
										<Button
											className={styles.button}
											type="submit"
											variant="contained"
											size="medium"
											color="primary"
											disabled={!cardName || !cardNumber || !cardExpiry || !cardCvv ||
												(cardName === props.cardName && cardNumber === props.cardNumber &&
													cardExpiry === props.cardExpiry && cardCvv === props.cardCvv)}
										>
											{!isCard ? "Сохранить" : "Обновить"}
										</Button>)}
							</form>
						</Paper>
					</div>
				</div>
			</div>
		</div >
	)
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'ProfilePage', validate
})(ProfilePage));
