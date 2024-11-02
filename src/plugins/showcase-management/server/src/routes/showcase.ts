export default [
  {
    method: 'GET',
    path: '/shows',
    handler: 'getShowsController.getShows',
    config: {
      auth: {
        scope: ['plugin::showcase-management.getShowsController.getShows'],
      },
    },
  },
  // Add this new route
  {
    method: 'POST',
    path: '/show-update',
    handler: 'postShowUpdate.showUpdate',
    config: {
      scope: ['plugin::showcase-management.postShowUpdate.showUpdate'],
    },
  },
];
