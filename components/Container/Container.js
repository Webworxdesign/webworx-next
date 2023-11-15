import styles from './Container.module.scss';
import className from 'classnames/bind';
import HeaderSettings from '../../constants/themeSettings';
import ThemeSettings from '../../constants/themeSettings';

let cx = className.bind(styles);

export default function Container({ children, className }) {

  return (
    <div className={cx(['component', className])}>
      {children}
    </div>
  );
}
