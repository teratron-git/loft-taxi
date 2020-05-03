import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './ProfilePage.module.css';
import classNames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import { MCIcon } from 'loft-taxi-mui-theme';
import { bindActionCreators } from 'redux';
import { actions } from '../../../store/profile/actions';
import { Preloader } from '../../shared/Preloader';
import { getCardName, getCardNumber, getError, getCardCvv, getIsCard, getIsCardLoading, getCardExpiry } from '../../../store/profile/selectors'

let { card, cardErrorReset } = actions;

const st = classNames.bind(styles);

const ProfilePage = (props) => {
	let [cardName, setCardName] = useState(props.cardName);
	let [cardNumber, setCardNumber] = useState(props.cardNumber);
	let [cardExpiry, setCardExpiry] = useState(props.cardExpiry);
	let [cardCvv, setCardCvv] = useState(props.cardCvv);

	let { card, cardErrorReset, error, isCardLoading, isCard } = props;

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
		cardErrorReset()
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
								<TextField
									className={st('font-size')}
									type="text"
									label="Имя владельца"
									placeholder="Имя владельца"
									name="cardName"
									value={cardName}
									onChange={changeCardNameHandler}
									margin="none"
									autoComplete="cc-name"
									fullWidth
									required
								/>
								<NumberFormat
									className={st('font-size')}
									customInput={TextField}
									label="Номер карты"
									placeholder="Номер карты"
									name="cardNumber"
									value={cardNumber}
									onChange={changeCardNumberHandler}
									margin="none"
									autoComplete="cc-number"
									fullWidth
									required
									format="#### #### #### ####"
								/>
								<NumberFormat
									className={st('font-size')}
									customInput={TextField}
									label="Дата окончания действия"
									placeholder="мм/гг"
									name="cardExpiry"
									value={cardExpiry}
									onChange={changeCardExpiryHandler}
									margin="none"
									autoComplete="cc-exp"
									fullWidth
									required
									format="##/##"
								/>
								<NumberFormat
									className={st('font-size')}
									type="password"
									customInput={TextField}
									label="CVV"
									placeholder="CVV"
									name="cardCvv"
									value={cardCvv}
									onChange={changeCardCvvHandler}
									margin="none"
									autoComplete="cc-csc"
									fullWidth
									required
									format="###"
								/>
								<span className={st({ 'error': !isCard, 'no-error': isCard })}>{error}</span>
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
		error: getError(state),
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		card: bindActionCreators(card, dispatch),
		cardErrorReset: bindActionCreators(cardErrorReset, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
