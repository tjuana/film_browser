import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type StaticHandlerContext,
} from 'react-router-dom';
import { routes } from '@app/router/route-config';
import '@shared/styles/index.scss';

// Generate SEO meta tags based on route and data
function generateHeadTags(
  request: Request,
  context: StaticHandlerContext
): string {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Default meta tags
  let title = 'Film Browser';
  let description =
    'Discover popular, top-rated, and upcoming movies from TMDB';
  let ogImage = '/placeholder.png';

  // Route-specific meta tags
  if (pathname.startsWith('/movie/')) {
    const movieData = context.loaderData?.['0-1']; // Movie detail loader data
    if (movieData?.movie) {
      title = `${movieData.movie.title} - Film Browser`;
      description =
        movieData.movie.overview ||
        `Watch ${movieData.movie.title} and discover more amazing movies`;
      if (movieData.movie.posterPath) {
        ogImage = movieData.movie.posterPath;
      }
    }
  } else if (pathname === '/wishlist') {
    title = 'My Wishlist - Film Browser';
    description = 'Your saved movies and favorites collection';
  }

  return `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${request.url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
  `.trim();
}

export async function render(
  request: Request
): Promise<{ html: string; status: number; headTags?: string }> {
  try {
    // Create static handler and router for SSR using shared routes
    const { query, dataRoutes } = createStaticHandler(routes);
    const context = await query(request);

    // Handle redirects and errors
    if (context instanceof Response) {
      return {
        html: '',
        status: context.status,
      };
    }

    const router = createStaticRouter(dataRoutes, context);

    // Render the app to string
    const html = renderToString(
      <StaticRouterProvider router={router} context={context} />
    );

    // Generate SEO head tags
    const headTags = generateHeadTags(request, context);

    return {
      html,
      status: context.statusCode || 200,
      headTags,
    };
  } catch (error) {
    console.error('SSR render error:', error);
    // Return minimal error response
    return {
      html: '<div>Error loading page</div>',
      status: 500,
      headTags:
        '<meta name="description" content="Film Browser - Server Error" />',
    };
  }
}
