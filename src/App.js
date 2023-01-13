import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routers';
// import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index + 'route'} path={route.path} element={<Page isLogined={true} />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
