import type { PropsWithChildren } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Container } from '@shared/ui/Container';

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="app-root">
      <header>
        <Container>
          <nav aria-label="Primary">
            <ul style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
              <li>
                <NavLink
                  to="/"
                  aria-current={({ isActive }) =>
                    isActive ? 'page' : undefined
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  aria-current={({ isActive }) =>
                    isActive ? 'page' : undefined
                  }
                >
                  Wish List
                </NavLink>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
      <main>
        <Container>{children ?? <Outlet />}</Container>
      </main>
    </div>
  );
};
