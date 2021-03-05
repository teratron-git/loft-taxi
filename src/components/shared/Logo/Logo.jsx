import classNames from 'classnames/bind';
import styles from './Logo.module.css';

const st = classNames.bind(styles);

export function Logo() {
	return (
		<div className={st('login-page__logo')}>
			<div className={st('login-page__logo-item')}></div>
		</div>
	);
}
