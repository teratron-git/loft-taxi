import classNames from 'classnames/bind';
import LoginForm from './LoginForm';
import { Logo } from '../shared/Logo';
import styles from './LoginPage.module.css';

const st = classNames.bind(styles);

export const LoginPage = () => {
	return (
		<div className={st('login-page')}>
			<Logo />
			<LoginForm />
		</div>
	);
};
