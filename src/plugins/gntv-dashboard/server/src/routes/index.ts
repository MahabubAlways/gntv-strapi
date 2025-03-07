import showcase from './showcase';
import showcaseAdmin from './showcaseAdmin';

export default {
  showcase: {
    type: 'content-api',
    routes: [...showcase],
  },
  admin: {
    type: 'admin',
    routes: [...showcaseAdmin],
  },
};
