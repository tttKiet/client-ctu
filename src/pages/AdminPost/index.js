import { Col, Row } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilPostcard } from '@iconscout/react-unicons';
import { UilFileUpload } from '@iconscout/react-unicons';
import { UilEstate } from '@iconscout/react-unicons';
import Moment from 'react-moment';
import NavLeft from '~/components/NavLeft';
import { postServices } from '~/services';
import { useSelector } from 'react-redux';
import { isLoginSelector, userSelector } from '~/redux/selector';
import Post from '~/components/Post';
import user from '../../assets/images/home-admin-slide3.jpg';
import classNames from 'classnames/bind';
import styles from './AdminPost.module.scss';

const cx = classNames.bind(styles);

const menu = {
    title: 'Volunteer',
    desc: [
        {
            title: 'Trang chủ',
            to: '/',
            icon: UilEstate,
        },
        {
            title: 'Đăng bài',
            icon: UilFileUpload,
            type: 'up-post',
        },
        {
            title: 'Xem tất cả bài đăng',
            to: '/admin/allpost',
            icon: UilPostcard,
        },
    ],
};

function AdminPost() {
    const isLogined = useSelector(isLoginSelector);
    const curUser = useSelector(userSelector);
    const navigate = useNavigate();
    const [post, setPost] = useState([]);

    const getPosts = useCallback(async () => {
        const res = await postServices.getPosts({ id: curUser.id });
        if (res.errCode === 0) {
            setPost(res.posts);
        }
    }, [curUser.id]);
    const controlPage = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        }
    }, [isLogined, navigate]);

    useEffect(() => {
        controlPage();
        getPosts();
    }, [controlPage, getPosts]);

    return (
        <div className={cx('wrap')}>
            <NavLeft menu={menu} handleOkUpPost={getPosts} />
            <div className={cx('posts')}>
                <div className={cx('post-profice')}>
                    {post.map((post) => {
                        return (
                            <Post
                                light={true}
                                image={post.linkImage}
                                key={post.id}
                                author={post.user.id}
                                title={post.title}
                                content={post.description}
                                upDate={post.createdAt}
                            />
                        );
                    })}
                    {post.length === 0 && <div> Chưa có bài post nào!</div>}
                </div>
            </div>
            <div className={cx('profice')}>
                <div className={cx('info')}>
                    <Row>
                        <Col className={cx('col-wrap')} md={12}>
                            <div className={cx('image')}>
                                <img className={cx('image-user')} src={user} alt="User" />
                            </div>
                            <h3 className={cx('content', 'name')}>{curUser.id}</h3>
                            <h3 className={cx('content', 'name')}>{curUser.name}</h3>
                        </Col>
                        <Col className={cx('col-wrap')} md={12}>
                            <span className={cx('title')}>Ngày tham gia:</span>
                            <span className={cx('content')}>
                                <Moment local="vi" fromNow format="ll" date={curUser.updatedAt} />
                            </span>
                        </Col>

                        <Col className={cx('col-wrap')} md={12}>
                            <span className={cx('title')}>Email: </span>
                            <span className={cx('content')}>{curUser.email}</span>
                        </Col>
                        <Col className={cx('col-wrap')} md={12}>
                            <span className={cx('title')}>Mã lớp:</span>
                            <span className={cx('content')}>{curUser.className}</span>
                        </Col>
                        <Col className={cx('col-wrap')} md={12}>
                            <span className={cx('title')}>Trực thuộc khoa:</span>
                            <span className={cx('content')}>{curUser.faculty}</span>
                        </Col>
                    </Row>
                    <div className={cx('border')}></div>
                    <div className={cx('note')}>
                        <span>Ghi chú: Bạn đang đăng nhập với tư cách là Admin!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPost;
