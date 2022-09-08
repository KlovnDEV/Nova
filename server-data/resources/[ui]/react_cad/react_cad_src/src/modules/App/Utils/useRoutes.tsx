import React, { lazy, Suspense } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { DefaultFallback } from 'components/Preloader';
// modules

const Record = lazy(() => import('modules/Record/Record'));
const Tax = lazy(() => import('modules/Tax/Tax'));
const Search = lazy(() => import('modules/Search/Search'));
const Manage = lazy(() => import('modules/Manage/Manage'));
const GasStations = lazy(() => import('modules/Oil/GasStations'));
const Person = lazy(() => import('modules/Person/Person'));
const Cases = lazy(() => import('modules/Cases/Cases'));
const Certificate = lazy(() => import('modules/Certificate/Certificate'));
const SummaryEMS = lazy(() => import('modules/EMS/Summary'));
const SummaryGov = lazy(() => import('modules/Government/Summary'));

export const useRoutes = (): {
  orgName: string;
  routes: {
    exact: boolean;
    path: string;
    render: (props: AnyObject) => JSX.Element;
  }[];
} => {
  let orgName: string;

  const routes = [
    { exact: true, path: '/', render: () => <div /> },
    {
      exact: true,
      path: '/:orgName/',
      render: props => {
        const {
          match: {
            params: { orgName: org },
          },
        } = props;
        if (org === 'government')
          return (
            <Suspense fallback={<DefaultFallback />}>
              <SummaryGov />
            </Suspense>
          );

        return (
          <Suspense fallback={<DefaultFallback />}>
            <SummaryEMS orgName={orgName} />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/:orgName/manage',
      render: ({ match, location }) => {
        const {
          params: { id, orgName: org },
        } = match;
        const { pathname } = location;
        const args = {
          id,
          key: pathname,
          orgName: org,
        };

        return (
          <Suspense fallback={<DefaultFallback />}>
            <Manage {...args} />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/:orgName/tax',
      render: () => {
        return (
          <Suspense fallback={<DefaultFallback />}>
            <Tax />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/oil/stations',
      render: () => {
        return (
          <Suspense fallback={<DefaultFallback />}>
            <GasStations />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/:orgName/record/:id',
      render: ({ match, location }) => {
        const {
          params: { id, orgName: org },
        } = match;
        const { pathname } = location;
        const args = {
          id,
          key: pathname,
          organization: org,
        };

        return (
          <Suspense fallback={<DefaultFallback />}>
            <Record {...args} />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/:orgName/certificate/:id',
      render: ({ match, location }) => {
        const {
          params: { id, orgName: org },
        } = match;
        const { pathname } = location;
        const args = {
          id,
          orgName: org,
          key: pathname,
        };

        return (
          <Suspense fallback={<DefaultFallback />}>
            <Certificate {...args} />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/:orgName/archive',
      render: ({ match, location }) => {
        const {
          params: { orgName: org },
        } = match;
        const { pathname } = location;
        const args = {
          organization: org,
          archive: true,
          key: pathname,
        };

        return (
          <Suspense fallback={<DefaultFallback />}>
            <Cases {...args} />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/:orgName/cases',
      render: ({ match, location }) => {
        const {
          params: { orgName: org },
        } = match;
        const { pathname } = location;
        const args = {
          organization: org,
          archive: false,
          key: pathname,
        };

        return (
          <Suspense fallback={<DefaultFallback />}>
            <Cases {...args} />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/:orgName/person/:personId',
      render: ({ match, location }) => {
        const {
          params: { personId: id, orgName: org },
        } = match;

        return (
          <Suspense fallback={<DefaultFallback />}>
            <Person id={id} editable orgName={org} key={location.pathname} />
          </Suspense>
        );
      },
    },
    {
      exact: true,
      path: '/:orgName/search/',
      render: ({ match, location }) => (
        <Suspense fallback={<DefaultFallback />}>
          <Search orgName={match.params.orgName} key={location.pathname} />
        </Suspense>
      ),
    },
  ];

  routes.some(route => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const match = useRouteMatch<{ orgName: string }>(route.path);
    if (!match) return false;

    const {
      params: { orgName: org },
    } = match;

    if (org) {
      orgName = org;
      return true;
    }
    return false;
  });

  return {
    orgName,
    routes,
  };
};

export default useRoutes;
