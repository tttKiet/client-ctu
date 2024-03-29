import { UilSignout } from '@iconscout/react-unicons';
import { UilPostcard, UilChartBar, UilBrightnessLow, UilTrowel } from '@iconscout/react-unicons';
import { userSlice } from '~/redux/reducers';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './MenuMoreProfice.module.scss';

const cx = classNames.bind(styles);

function MenuMoreProfice({ show, location = 'post' }) {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(userSlice.actions.toggleUserLogin());
    };

    return (
        <div
            className={cx('wrap', {
                show: show,
            })}
        >
            <ul className={cx('list')}>
                <li>
                    <div className={cx('item')}>
                        <h3>Chế độ tối</h3>
                        <UilBrightnessLow size={20} className={cx('icon')} />
                    </div>
                </li>
                {location === 'work' ? (
                    <>
                        <li>
                            <a href="/admin/mypost" className={cx('item')}>
                                <h3>Quản lý bài đăng</h3>
                                <UilPostcard size={20} className={cx('icon')} />
                            </a>
                        </li>
                        <li>
                            <a href="/admin/statistical" className={cx('item')}>
                                <h3>Thống kê</h3>
                                <UilChartBar size={20} className={cx('icon')} />
                            </a>
                        </li>
                    </>
                ) : (
                    <>
                        {location === 'post' ? (
                            <>
                                <li>
                                    <a href="/admin/view/list-user-req" className={cx('item')}>
                                        <h3>Quản lý công việc</h3>
                                        <UilTrowel size={20} className={cx('icon')} />
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/statistical" className={cx('item')}>
                                        <h3>Thống kê</h3>
                                        <UilChartBar size={20} className={cx('icon')} />
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a href="/admin/mypost" className={cx('item')}>
                                        <h3>Quản lý bài đăng</h3>
                                        <UilPostcard size={20} className={cx('icon')} />
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/view/list-user-req" className={cx('item')}>
                                        <h3>Quản lý công việc</h3>
                                        <UilTrowel size={20} className={cx('icon')} />
                                    </a>
                                </li>
                            </>
                        )}
                    </>
                )}

                <li onClick={handleLogout}>
                    <div className={cx('item')}>
                        <h3>Đăng xuất</h3>
                        <UilSignout className={cx('icon')} size={20} />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default MenuMoreProfice;
