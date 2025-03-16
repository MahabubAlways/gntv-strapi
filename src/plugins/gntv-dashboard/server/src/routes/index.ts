import getRoutes from './getRoutes';
import postRoutes from './postRoutes';

export default {
  getRoutes: {
    type: 'content-api',
    routes: [...getRoutes],
  },
  postRoutes: {
    type: 'content-api',
    routes: [...postRoutes],
  },
};
