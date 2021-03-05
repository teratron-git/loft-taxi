import classNames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import styles from './MapNoCardLayout.module.css';

const st = classNames.bind(styles);

export const MapNoCardLayout = () => {
	return (
		<div className={styles.container}>
			<Paper elevation={13} className={st('paper')}>
				<div className={st('text')}>Сначала необходимо заполнить профиль</div>
				<Link to="profile">
					<Button className={st('button')} variant="contained" size="medium" color="primary">
						Заполнить
					</Button>
				</Link>
			</Paper>
		</div>
	);
};
