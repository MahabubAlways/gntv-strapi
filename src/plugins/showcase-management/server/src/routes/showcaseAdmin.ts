export default [
  {
    method: 'GET',
    path: '/shows',
    handler: 'getShowsController.getShows',
    config: {
      auth: false,
    },
  },
];
