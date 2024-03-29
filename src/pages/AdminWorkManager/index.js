import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector, userSelector } from '~/redux/selector';
import { useSelector } from 'react-redux';
import { UilEstate } from '@iconscout/react-unicons';
import Loader from '~/components/Loader';
import { UilListUl } from '@iconscout/react-unicons';
import { UilPlus } from '@iconscout/react-unicons';
import { Container, Row, Col } from 'react-bootstrap';
import Work from '~/components/Work';
import ListRequestWork from '~/components/ListRequestWork';
import { workServices } from '~/services';
import NavLeft from '~/components/NavLeft';
import classNames from 'classnames/bind';
import styles from './AdminWorkManager.module.scss';

const cx = classNames.bind(styles);

const menu = {
    title: 'Quản lý công tác tình nguyện',
    desc: [
        {
            title: 'Trang chủ',
            to: '/',
            icon: UilEstate,
        },
        {
            title: 'Xem danh sách thực hiện công việc',
            to: '/admin/view/list-user-work',
            icon: UilListUl,
        },
        {
            title: 'Tạo công việc mới',
            icon: UilPlus,
            type: 'create-work',
        },
    ],
};

function AdminWorkManager() {
    const navigate = useNavigate();
    const isLogined = useSelector(isLoginSelector);
    const curUser = useSelector(userSelector);
    const [isShowTable, setIsShowTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [work, setWork] = useState([]);
    const [currWorkId, setCurrWorkId] = useState('');

    const controlPage = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        }

        if (curUser && curUser.type !== 'admin') {
            navigate('/');
        }
    }, [curUser, isLogined, navigate]);

    const getNameWorkAndCountRes = useCallback(async () => {
        setIsLoading(true);
        const res = await workServices.getNameWorkAndCountRes();
        if (res.errCode === 0) {
            setWork(res.works);
        }
        setIsLoading(false);
    }, []);

    const toggleShowTable = () => {
        setIsShowTable((show) => {
            return !show;
        });
    };

    const handleCLickDetail = (workId) => {
        setCurrWorkId(workId);
        setIsShowTable(true);
    };

    useEffect(() => {
        controlPage();
        getNameWorkAndCountRes();
    }, [controlPage, getNameWorkAndCountRes]);

    return (
        <div className={cx('wrap')}>
            {isLoading && <Loader />}
            <NavLeft menu={menu} location="work" />
            <Container>
                <Row>
                    <Col md={3}></Col>
                    <Col md={9} className={cx('wrap-req')}>
                        <div className={cx('menu-control')}>
                            <a href="/">Trang chủ</a>/<span> Danh sách đăng ký</span>
                        </div>
                        <h2 className={cx('title')}>Danh sách đăng ký của sinh viên</h2>
                        <div className={cx('works')}>
                            {work.length === 0 ? (
                                <h2 className={cx('no-req')}>Chưa có yêu cầu đăng ký tham gia nào!</h2>
                            ) : (
                                <>
                                    {work.map((work) => {
                                        return (
                                            <div key={work.id} className={cx('wrap-work')}>
                                                <Work
                                                    admin={true}
                                                    key={work.id}
                                                    countRequest={work.workCount}
                                                    startDate={work.work.startDate}
                                                    name={work.work.name}
                                                    workPlace={work.work.workPlace}
                                                    curStudent={work.work.curStudent}
                                                    maxStudent={work.work.maxStudent}
                                                    pointPlus={work.work.pointPlus}
                                                />
                                                <span
                                                    className={cx('detail-work-req')}
                                                    onClick={() => handleCLickDetail(work.work.id)}
                                                >
                                                    Xem chi tiết
                                                </span>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            {isShowTable && (
                <ListRequestWork
                    getNameWorkAndCountRes={getNameWorkAndCountRes}
                    workId={currWorkId}
                    show={isShowTable}
                    toggleShowTable={toggleShowTable}
                />
            )}
        </div>
    );
}

export default AdminWorkManager;
