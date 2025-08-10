// Application routes configuration
export const ROUTES = {
  HOME: '/',
  MOVIE_DETAIL: '/movie/:id',
  WISHLIST: '/wishlist',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
