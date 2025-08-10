import { createBrowserRouter } from 'react-router-dom';
import { routes } from './route-config';

// Client-side router (for hydration and CSR)
export const router = createBrowserRouter(routes);

// Re-export routes for convenience
export { routes };
