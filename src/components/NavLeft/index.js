import { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';
import ToastMassage from '../ToastMassage';
import styles from './NavLeft.module.scss';
import MenuMoreProfice from '~/components/MenuMoreProfice';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import ModalUpPost from '../ModalUpPost';
const cx = classNames.bind(styles);

function NavLeft({ menu }) {
    const [isShowMenuMore, setIsShowMenuMore] = useState(false);
    const [isShowModalUpPost, setIsShowModalUpPost] = useState(false);
    const [obToast, setObToast] = useState({
        isShow: false,
        header: '',
        content: '',
    });

    const handleClickMore = () => {
        setIsShowMenuMore((isShowMenuMore) => !isShowMenuMore);

        //
        setObToast(() => {
            return {
                isShow: true,
                header: 'Xong',
                content: 'Đã đăng bài',
            };
        });
    };

    const handleWindowCLick = useCallback(() => {
        window.onclick = (e) => {
            if (e.target.closest('.more')) {
                handleClickMore();
            } else {
                setIsShowMenuMore(false);
            }
        };
    }, []);

    const handleCLickMenu = (e, type) => {
        if (type && type === 'up-post') {
            setIsShowModalUpPost(true);
        }
    };

    const handleClickX = () => {
        setIsShowModalUpPost(false);
    };

    const toggleShowToast = ({ header, content }) => {
        setObToast((toast) => {
            return {
                isShow: !toast.isShow,
                header: header ? header : '',
                content: content ? content : '',
            };
        });
    };

    useEffect(() => {
        handleWindowCLick();
    }, [handleWindowCLick]);

    return (
        <div className={cx('wrap')}>
            <ToastMassage
                header={obToast.header}
                content={obToast.content}
                handleClose={() => toggleShowToast({})}
                isShow={obToast.isShow}
            />
            <ModalUpPost isShow={isShowModalUpPost} toggleShow={handleClickX} toggleShowToast={toggleShowToast} />
            <span className={cx('title-main')}>{menu.title}</span>
            <ul className={cx('controler')}>
                {menu.desc.map((menu, id) => {
                    const Icon = menu.icon;
                    let Component;
                    if (menu.to) {
                        Component = Link;
                    } else {
                        Component = 'span';
                    }
                    let props = {};
                    if (menu.type) {
                        props.type = menu.type;
                        props.onClick = (e) => {
                            handleCLickMenu(e, props.type);
                        };
                    }
                    return (
                        <li key={id} className={cx('item-link')} {...props}>
                            <Component to={menu.to}>
                                <div>
                                    <Icon size="30" className={cx('icon')} />
                                </div>
                                <h3 className={cx('title')}>{menu.title}</h3>
                            </Component>
                        </li>
                    );
                })}

                <li className={cx('item-link', 'more')}>
                    <span>
                        <UilEllipsisV size="30" className={cx('icon')} />
                        <h3 className={cx('title')}>Xem thêm</h3>
                    </span>
                    <MenuMoreProfice handleClickMore={handleClickMore} show={isShowMenuMore} />
                </li>
            </ul>
        </div>
    );
}

export default NavLeft;
