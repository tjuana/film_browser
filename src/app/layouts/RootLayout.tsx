import type { PropsWithChildren } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Container } from '@shared/ui/Container';
import './RoorLayout.scss';

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="app-root">
      <header className="header">
        <Container>
          <nav aria-label="Primary" className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/wishlist" className="nav-link">
                  Wish List
                </NavLink>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
      <main className="app-main">
        <Container>{children ?? <Outlet />}</Container>
      </main>
    </div>
  );
};
