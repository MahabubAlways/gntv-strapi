import showcase from './showcase';

export default {
  showcase: {
    type: 'content-api',
    routes: [...showcase],
  },
  admin: {
    type: 'admin',
    routes: [...showcase],
  },
};
