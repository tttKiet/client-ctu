import { Row, Col, Button } from 'react-bootstrap';
import ToastMassage from '../ToastMassage';
import ModalAuth from '../ModalAuth';
import { UilCheck } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import { UilLabelAlt } from '@iconscout/react-unicons';
import styles from './ListRequestWork.module.scss';
import RowTableUserReq from '../RowTableUserReq/RowTableUserReq';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import { workServices } from '~/services';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
const cx = classNames.bind(styles);

function ListRequestWork({
    show,
    toggleShowTable,
    name,
    startDate,
    workPlace,
    maxStudent,
    curStudent,
    arrayRow,
    getWorkReq,
    getNameWorkAndCountRes,
}) {
    const [row, setRow] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [reqUser, setReqUser] = useState({
        id: '',
        workId: '',
    });
    const [currStudentNumber, setCurrStudentNumber] = useState();
    const [toastOb, setToastOb] = useState({
        show: false,
        header: '',
        content: '',
    });

    const toggleShowModal = (id, workId) => {
        if (id && workId) {
            setReqUser({
                id,
                workId,
            });
        }
        setIsShowModal((view) => !view);
    };

    const toggleShowToast = ({ header, show, content }) => {
        setToastOb((toastOb) => {
            return {
                header: header ? header : '',
                content: content ? content : '',
                show: show ? show : !toastOb.show,
            };
        });
    };

    const handleRender = async (id) => {
        const res = await getWorkReq(id);
        getWork(id);
        setRow(res);
    };

    const handleDeleteRow = async () => {
        const res = await workServices.handleDeleteWorkRegister(reqUser.id);
        if (res.errCode === 0) {
            toggleShowModal();
            setToastOb((toastOb) => {
                return {
                    header: 'Xong',
                    content: 'X??a th??nh c??ng',
                    show: !toastOb.show,
                };
            });
            handleRender(reqUser.workId);
            getNameWorkAndCountRes();
        }
    };

    const getWork = async (workId) => {
        const res = await workServices.getNameWork({ workId });
        setCurrStudentNumber(res.workNames[0].curStudent);
    };

    useEffect(() => {
        setRow(arrayRow);
        setCurrStudentNumber(curStudent);
    }, [arrayRow, curStudent]);

    return (
        <div
            className={cx('wrap', {
                show: show,
            })}
        >
            <div title="Quay l???i" className={cx('icon-back')} onClick={toggleShowTable}>
                <UilAngleDoubleLeft size={28} />
            </div>
            <div className={cx('wrap-table')}>
                <h2 className={cx('title')}>{name}</h2>
                <div className={cx('control')}>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Ng??y b???t ?????u:</span>
                        <span className={cx('more-number')}>
                            <Moment local="vi" format="ll">
                                {startDate}
                            </Moment>
                        </span>
                    </div>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>N??i l??m vi???c:</span>
                        <span className={cx('more-number')}> {workPlace}</span>
                    </div>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>T???i ??a: </span>
                        <span className={cx('more-number')}> {maxStudent}</span>
                    </div>

                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Hi???n t???i: </span>
                        <span className={cx('more-number')}> {currStudentNumber}</span>
                    </div>
                </div>
                <div className={cx('note')}>
                    Ghi ch??:
                    <ul className={cx('note-list')}>
                        <li className={cx('note-item')}>
                            <UilLabelAlt size={12} className={cx('list-tyle')} />
                            Nh???n v??o
                            <Button size="sm" className={cx('btn')} variant="outline-primary">
                                <UilCheck size={18} />
                            </Button>
                            ????? duy???t sinh vi??n v??o danh s??ch tham gia.
                        </li>
                        <li className={cx('note-item')}>
                            <UilLabelAlt size={12} className={cx('list-tyle')} />
                            Nh???n v??o
                            <Button size="sm" className={cx('btn')} variant="outline-danger">
                                <UilTimes size={18} />
                            </Button>
                            ????? x??a sinh vi??n ra kh???i danh s??ch ????ng k?? tham gia.
                        </li>
                    </ul>
                </div>

                <div className={cx('table')}>
                    <Row>
                        <Col md={12}>
                            {row.length > 0 ? (
                                <>
                                    <Row>
                                        <Col md={1} className={cx('header')}>
                                            STT
                                        </Col>
                                        <Col md={2} className={cx('header')}>
                                            M?? s??? sinh vi??n
                                        </Col>
                                        <Col md={2} className={cx('header')}>
                                            T??n
                                        </Col>
                                        <Col md={3} className={cx('header')}>
                                            Email
                                        </Col>
                                        <Col md={1} className={cx('header')}>
                                            L???p
                                        </Col>
                                        <Col md={2} className={cx('header')}>
                                            H??nh ?????ng
                                        </Col>
                                    </Row>

                                    {row.map((row, i) => {
                                        return (
                                            <RowTableUserReq
                                                toggleShowModal={toggleShowModal}
                                                toggleShowToast={toggleShowToast}
                                                handleRender={handleRender}
                                                getNameWorkAndCountRes={getNameWorkAndCountRes}
                                                id={row.id}
                                                workId={row.work.id}
                                                stt={i + 1}
                                                mssv={row.userWork.id}
                                                name={row.userWork.name}
                                                email={row.userWork.email}
                                                className={row.userWork.className}
                                                key={i}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <div className={cx('done')}>C??c y??u c???u ???? ???????c x??? l??! </div>
                            )}
                        </Col>
                    </Row>
                    <ToastMassage
                        isShow={toastOb.show}
                        header={toastOb.header}
                        content={toastOb.content}
                        handleClose={() => toggleShowToast({})}
                    />
                    <ModalAuth
                        header="B???n c?? ch???c mu???n x??a?"
                        main="H??nh ?????ng n??y s??? x??a b???n ghi trong c?? s??? d??? li???u v?? kh??ng th??? kh??i ph???c"
                        isShowModal={isShowModal}
                        handleOk={handleDeleteRow}
                        ToggleShowModal={toggleShowModal}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListRequestWork;
