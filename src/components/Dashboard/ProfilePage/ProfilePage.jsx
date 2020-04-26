import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfilePage.module.css';
import classNames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import { MCIcon } from 'loft-taxi-mui-theme';

const st = classNames.bind(styles);

export const ProfilePage = () => {

	return (
		<div className={st('profile-page')}>
			<div className={st('profile-page__loginForm')}>
				<div className={st('profile-page__loginForm-item')} style={{ height: '400px' }}>
					<div className={st('header-form')}>Профиль</div>
					<Typography variant="h4" color="inherit" align="center">Способ оплаты</Typography>

					<div className={styles.container}>
						<Paper elevation={13} className={styles.paper}>
							<MCIcon className={styles.MCIcon} />

							<form className={styles.form} noValidate>
								<TextField
									className={st('font-size')}
									type="text"
									label="Имя владельца"
									placeholder="Имя владельца"
									name="cardName"
									// value={cardName.value}
									// onChange={this.handleChange}
									// helperText={cardName.error ? cardName.error : null}
									// error={cardName.error ? true : false}
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
									// value={cardNumber.value}
									// onChange={this.handleChange}
									// helperText={cardNumber.error ? cardNumber.error : null}
									// error={cardNumber.error ? true : false}
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
									name="cardExp"
									// value={cardExp.value}
									// onChange={this.handleChange}
									// helperText={cardExp.error ? cardExp.error : null}
									// error={cardExp.error ? true : false}
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
									// value={cardCvv.value}
									// onChange={this.handleChange}
									// helperText={
									// 	cardCvv.error
									// 		? cardCvv.error
									// 		: 'Последние три цифры на обороте карты'
									// }
									// error={cardCvv.error ? true : false}
									margin="none"
									autoComplete="cc-csc"
									fullWidth
									required
									format="###"
								/>
								<Button
									className={styles.button}
									type="submit"
									variant="contained"
									size="medium"
									color="primary"
								>
									Сохранить
            </Button>
							</form>
						</Paper>
					</div>
				</div>
			</div>
		</div >
	)
};

export default connect(null, null)(ProfilePage);
