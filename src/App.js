import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routers';
import { Fragment } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment/locale/vi';
import 'moment-timezone';

Moment.globalLocale = 'vi';
Moment.globalMoment = moment;
Moment.globalFormat = 'LLLL';
Moment.globalTimezone = 'Asia/Ho_Chi_Minh';
Moment.globalLocal = true;
Moment.globalFilter = (d) => {
    const firstLine = d[0].toUpperCase();
    const output = firstLine + d.slice(1);
    return output;
};
Moment.globalElement = 'span';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let LayOut = Fragment;
                        if (route.layout) {
                            LayOut = route.layout;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index + 'route'}
                                path={route.path}
                                element={
                                    <LayOut>
                                        <Page />
                                    </LayOut>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
