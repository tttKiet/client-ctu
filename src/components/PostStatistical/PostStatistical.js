import PostChart from '../PostChart/PostChart';
import { useState } from 'react';
// Scss
import styles from './PostStatistical.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function PostStatistical() {
    const currentYear = new Date().getFullYear();
    const startYear = 2010;
    const [selectedYear, setSelectedYear] = useState(currentYear - 1);

    const yearOptions = [];
    for (let year = currentYear - 1; year >= startYear; year--) {
        yearOptions.push(
            <option key={year} value={year}>
                {year}
            </option>,
        );
    }
    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };
    return (
        <div className={cx('wrap')}>
            <div>
                <PostChart year={selectedYear} />
                <div className={cx('select')}>
                    Xem biểu đồ ở năm
                    <select onChange={handleYearChange} value={selectedYear}>
                        {yearOptions}
                    </select>
                </div>
                <div className={cx('footer')}>
                    <hr></hr>
                </div>
            </div>
        </div>
    );
}

export default PostStatistical;
