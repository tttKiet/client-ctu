import Home from '~/pages/Home';
import Login from '~/pages/Login';
import AdminPost from '~/pages/AdminPost';
import AdminPostAll from '~/pages/AdminPostAll';
import AdminWorkManager from '~/pages/AdminWorkManager';
import AdminWorkCreate from '~/pages/AdminWorkCreate';
import UserDetailsWork from '~/pages/UserDetailsWork';
import AdminStatistical from '~/pages/AdminStatistical';
import UserListWork from '~/components/ListWork';
import AdminWorkList from '~/pages/AdminWorkList';
import Invalid_404 from '~/pages/Invalid_404';
import HomeUser from '~/components/HomeUser';
import LayoutUser from '~/pages/layout/LayoutUser';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/admin/mypost',
        component: AdminPost,
    },
    {
        path: '/admin/allpost',
        component: AdminPostAll,
    },

    {
        path: '/admin/view/list-user-req',
        component: AdminWorkManager,
    },
    {
        path: '/admin/view/list-user-work',
        component: AdminWorkList,
    },
    {
        path: '/admin/work/create',
        component: AdminWorkCreate,
    },
    {
        path: '/admin/statistical',
        component: AdminStatistical,
    },
    {
        path: '/user/details-work',
        component: UserDetailsWork,
    },

    // // EDIT
    // {
    //     path: '/work/:userId/create',
    //     component: HomeUser,
    //     layout: LayoutUser,
    // },
    // {
    //     path: '/work/view/list-work',
    //     component: HomeUser,
    //     layout: LayoutUser,
    // },
    // {
    //     path: '/work/view/calader',
    //     component: HomeUser,
    //     layout: LayoutUser,
    // },
    //
    // {
    //     path: '/lists-work',
    //     component: UserListWork,
    // },
    // {
    //     path: '/invalid/404',
    //     component: Invalid_404,
    // },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
