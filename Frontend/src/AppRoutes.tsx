import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from './store/Store';
import Login from './pages/Login';
import PrivateRoute from './PrivateRouter';
// import Example2Page from './pages/Example2';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import Loading from './components/Loading';
import MainLayout from './components/CustomNavBar/MainLayout';
import PeyAlef from './pages/PeyAlef';
import NotesTimeline from './components/NotesTimeline/NotesTimeLine';
import Havad from './pages/Havad';
import Pakoodim from './pages/Pakoodim';
import Hatah from './pages/Hatah';

const AppRoutes: React.FC = () => {
    // load the current user
    const [state] = useContext(Context);

    const { isLoading } = state;
    console.log('isLoading', isLoading);
    // TODO: deal with the component leave the connection of private route
    // and every thing
    return (
        <MainLayout>
            <Routes>
                <Route path="/*" element={<PrivateRoute component={Home} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/peyalef" element={<PrivateRoute component={PeyAlef} />} />
                {/* <Route path="/*" element={<Home />} /> */}
                {/* <Route path="/aaa/aaa" element={<PrivateRoute component={Example2Page} />} /> */}
                {/* TODO: need to take data from json server and inject here
                check if is working if not make it work
                TODO: connect it to the private route when you want to start work on backend */}
                <Route path="/hatah" element={<Hatah />} />
                <Route path="/havad" element={<Havad />} />
                <Route path="/pakoodim" element={<Pakoodim />} />
                <Route path="/notes" element={<NotesTimeline />} />
                <Route path="/error/*" element={<ErrorPage />} />
                {/* <Route path="/dis">
                <Route index element={<p>Parent element</p>} />
                <Route path="noder" element={<p>Child route</p>} />
            </Route> */}
            </Routes>
            {isLoading && <Loading />}
        </MainLayout>
    );
};

export default AppRoutes;
