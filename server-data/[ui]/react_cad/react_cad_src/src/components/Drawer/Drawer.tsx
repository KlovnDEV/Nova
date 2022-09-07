// core
import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Icons } from 'utils';
// components
import { MainStore } from 'storage/MainStore';
import { DrawerLink } from './DrawerLink';
// styles
import style from './Drawer.module.scss';
// storage

const getDrawerLinks = orgName => {
  const orgPermissions = MainStore.permissions[orgName] || {};
  const links = [];

  if (orgPermissions?.manage) {
    links.push({
      name: 'Manage',
      path: `/${orgName}/manage`,
      icon: Icons.Manage,
    });
  }

  if (orgName === 'government' && MainStore.permissions?.government) {
    links.push({
      name: 'Tax',
      path: `/${orgName}/tax`,
      icon: Icons.Tax,
    });
  } else if (MainStore.permissions?.government) {
    links.unshift({
      name: 'Return',
      path: MainStore.Homepage,
      icon: Icons.KeyboardReturn,
    });
  }

  if (MainStore.permissions?.oil && (orgName === 'oil' || orgName === 'government')) {
    links.push({
      name: 'Stations',
      path: `/oil/stations`,
      icon: Icons.GasStation,
    });
  }

  if (orgName === 'police' || orgName === 'ambulance') {
    links.push({
      name: 'Dashboard',
      path: `/${orgName}/`,
      icon: Icons.Dashboard,
    });

    if (orgPermissions?.cases) {
      links.push({
        name: 'Archive',
        path: `/${orgName}/archive`,
        icon: Icons.Archive,
      });

      links.push({
        name: 'CaseList',
        path: `/${orgName}/cases`,
        icon: Icons.Cases,
      });
    }

    if (orgPermissions?.cases?.edit) {
      links.push({
        name: 'Record',
        path: `/${orgName}/record/-1`,
        icon: Icons.NewCase,
      });
    }

    if (orgPermissions?.persons) {
      links.push({
        name: 'Search',
        path: `/${orgName}/search`,
        icon: Icons.Search,
      });
    }
  }

  return links;
};

function DrawerProto({ orgName }) {
  const history = useHistory();

  const renderDrawerLinks = getDrawerLinks(orgName).map(link => (
    <DrawerLink
      key={link.name}
      path={link.path}
      name={link.name}
      icon={link.icon}
      collapse={style.drawerCollapse}
    />
  ));

  return (
    <nav className={style.drawer} role="navigation">
      <div className={style.drawerInner}>
        <div
          role="presentation"
          className={style.drawerHeader}
          onClick={() => history.push(`/${orgName}`)}
        >
          {orgName && (
            <img className={style.drawerLogo} src={`${ASSETS}/img/logo/${orgName}.png`} alt="" />
          )}
        </div>
        {renderDrawerLinks}
      </div>
    </nav>
  );
}

export const Drawer = observer(DrawerProto);
export default observer(DrawerProto);
