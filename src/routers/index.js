import Home from '~/pages/Home';
import Login from '~/pages/Login';
import AdminPost from '~/pages/AdminPost';
import AdminPostAll from '~/pages/AdminPostAll';
import AdminUpPost from '~/pages/AdminUpPost';
import AdminWorkManager from '~/pages/AdminWorkManager';
import AdminWorkCreate from '~/pages/AdminWorkCreate';
import UserDetailsWork from '~/pages/UserDetailsWork';
import UserListWork from '~/pages/UserListWork';
import AdminWorkList from '~/pages/AdminWorkList';
import Invalid_404 from '~/pages/Invalid_404';

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
        path: '/admin/up-post',
        component: AdminUpPost,
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
        path: '/user/details-work',
        component: UserDetailsWork,
    },
    {
        path: '/lists-work',
        component: UserListWork,
    },
    {
        path: '/invalid/404',
        component: Invalid_404,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
