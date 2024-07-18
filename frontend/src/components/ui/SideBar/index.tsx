import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { useAuthContext } from '@context/AuthContext';
import Logo from '@components/Logo';
import Dropdown from '@components/Dropdown';
import Wrapper from '@components/ui/Wrapper';
import Accordion from '@components/Accordion';
import { sortOptions, taskStatuses } from '@constants';
import Routes from '@constants/routes';
import RouteIcon from '@assets/route-icon.svg?react';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const { state } = useAuthContext();
  const { user } = state;

  const getNavLinkClassnames = (value: boolean) => {
    return classnames(styles.link, {
      [styles.active]: value,
    });
  };

  return (
    <aside className={styles.aside}>
      <Wrapper>
        <div className={styles.container}>
          <Logo />
          <div className={styles.wrapper}>
            <Accordion
              title="Navigation"
              icon={<RouteIcon />}
              content={
                <nav className={styles.nav}>
                  <ul>
                    <li>
                      <NavLink
                        to={Routes.HOME}
                        className={({ isActive }) =>
                          getNavLinkClassnames(isActive)
                        }
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      {user && (
                        <NavLink
                          to={Routes.TODO}
                          className={({ isActive }) =>
                            getNavLinkClassnames(isActive)
                          }
                        >
                          Task List
                        </NavLink>
                      )}
                    </li>
                  </ul>
                </nav>
              }
            />
          </div>
          {user && (
            <div className={styles.control}>
              <Dropdown
                options={sortOptions}
                queryParam="sort"
                label="Sort"
                placeholder="Sort by"
              />
              <Dropdown
                options={taskStatuses}
                queryParam="status"
                label="Filter by status"
                placeholder="Select status"
              />
            </div>
          )}
        </div>
      </Wrapper>
    </aside>
  );
};

export default SideBar;
