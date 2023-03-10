import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react';
import { postServices } from '~/services';

import Loader from '../Loader';

import img1 from '../../assets/images/bg-post-1.jpg';
import img2 from '../../assets/images/bg-post-2.jpg';
import img3 from '../../assets/images/bg-post-3.jpg';
import img4 from '../../assets/images/bg-post-4.jpg';
import img5 from '../../assets/images/bg-post-5.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';

import ImageSmall from '../ImageSmall';
import style from './ModalUpPost.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const smallImage = [
    {
        type: 'img1',
        id: img1,
    },
    {
        type: 'img2',
        id: img2,
    },
    {
        type: 'img3',
        id: img3,
    },
    {
        type: 'img4',
        id: img4,
    },
    {
        type: 'img5',
        id: img5,
    },
];

const obImgS = {
    img1,
    img2,
    img3,
    img4,
    img5,
};

function ModalUpPost({ isShow, toggleShow, toggleShowToast, handleOk }) {
    const currUser = useSelector(userSelector);
    const [showLoading, setShowLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [decsription, setDecsription] = useState('');
    const [img, setImg] = useState('img3');
    const [isShowDecs, setIsShowDecs] = useState(false);
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);

    const handleClickImgSmall = (type) => {
        setImg(type);
        setName('');
        setFile(null);
    };

    const handleChangeFile = (e) => {
        console.log('upfile');
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setName(file.name);
            setImg(url);
            setFile(file);
        }
    };

    const backModal = () => {
        setIsShowDecs(false);
    };

    const handleClickContinue = () => {
        setIsShowDecs(true);
    };

    const handleClickUpPost = async () => {
        setShowLoading(true);
        let userId;
        let res;
        userId = currUser.id;
        if (file) {
            res = await postServices.upPost(userId, title, decsription, file);
        } else {
            res = await postServices.upPost(userId, title, decsription, img);
        }
        if (res.errCode === 0) {
            toggleShow();
            setTitle('');
            setDecsription('');
            setName('');
            setFile(null);
            setIsShowDecs(false);
            toggleShowToast({ header: 'Xong', content: '???? t???o b??i ????ng' });
            handleOk();
        }
        setShowLoading(false);
    };

    const handleClickChangeInput = (e, type) => {
        switch (type) {
            case 'title': {
                setTitle(e.target.value);
                break;
            }
            case 'decsription': {
                setDecsription(e.target.value);
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <div
            className={cx('wrap', {
                show: isShow,
            })}
        >
            <div className={cx('form')}>
                <h1 className={cx('header')}>
                    {isShowDecs && (
                        <div className={cx('back')} onClick={backModal}>
                            <FontAwesomeIcon icon={faLeftLong} />
                        </div>
                    )}
                    T???o b??i vi???t m???i
                    <div className={cx('x')} onClick={toggleShow}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </h1>
                <hr />
                <div className={cx('main')}>
                    <div className={cx('main-image')}>
                        <div className={cx('image')} style={{ backgroundImage: `url(${!file ? obImgS[img] : img})` }}>
                            {isShowDecs ? (
                                <></>
                            ) : (
                                <div className={cx('image-component')}>
                                    {smallImage.map((img, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleClickImgSmall(img.type)}
                                            style={{ display: 'inline-block', marginRight: '12px' }}
                                        >
                                            <ImageSmall src={img.id} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {isShowDecs ? (
                            <></>
                        ) : (
                            <div className={cx('file')}>
                                <label htmlFor="file">
                                    Ch???n ???nh t??? th?? vi???n c?? nh??n
                                    <FontAwesomeIcon className={cx('icon')} icon={faFileAlt} />
                                    {name && <span className={cx('name')}>{name}</span>}
                                </label>
                                <input id="file" type="file" onChange={handleChangeFile}></input>
                            </div>
                        )}
                    </div>
                    <div
                        className={cx('main-decs', {
                            show: isShowDecs,
                            're-show': !isShowDecs,
                        })}
                    >
                        <div className={cx('info')}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <img src={img3}></img>
                            <span>b2014754</span>
                        </div>

                        <div className={cx('content')}>
                            <input
                                name="title"
                                value={title}
                                onChange={(e) => handleClickChangeInput(e, 'title')}
                                placeholder="Ti??u ?????.."
                                spellCheck="false"
                            ></input>
                            <textarea
                                name="decsription"
                                onChange={(e) => handleClickChangeInput(e, 'decsription')}
                                placeholder="N???i dung ..."
                                spellCheck="false"
                                defaultValue={decsription}
                            ></textarea>
                        </div>
                        <hr />
                        <div className={cx('main-footer')}>
                            <b>L??u ??:</b>
                            <ul>
                                <li>N???i dung b??i vi???t ph???i ????ng thu???n phong m??? t???c.</li>
                                <li>C???n th??m ???nh c??? th??? ????nh b??i vi???t th??m t??nh thuy???t ph???c.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    {!isShowDecs ? (
                        <button type="button" className={cx('submit')} onClick={handleClickContinue}>
                            Ti???p t???c
                        </button>
                    ) : (
                        <>
                            {showLoading ? (
                                <button
                                    type="button"
                                    className={cx('submit', {
                                        'btn-load': showLoading,
                                    })}
                                >
                                    <Loader />
                                </button>
                            ) : (
                                <>
                                    {!title || !decsription ? (
                                        <button
                                            type="button"
                                            className={cx('submit', {
                                                'btn-disable': true,
                                            })}
                                        >
                                            ????ng
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className={cx('submit', {
                                                'btn-load': showLoading,
                                            })}
                                            onClick={handleClickUpPost}
                                        >
                                            ????ng
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalUpPost;
