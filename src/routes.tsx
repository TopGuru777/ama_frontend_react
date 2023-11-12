import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import LoadingScreen from './pages/LoadingScreen';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
(
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);

const Home = Loadable(lazy(() => import('./pages/Home')));
const QA = Loadable(lazy(() => import('./pages/QA')));

const routes: RouteObject[] = [
    {
        path: '*',
        element: <Home />
    },
    {
        path: 'qa',
        element: <QA />
    }
];

export default routes;