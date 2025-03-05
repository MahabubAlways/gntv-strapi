export default [
  {
    method: 'GET',
    path: '/active-shows',
    handler: 'getShowsController.getActiveShows',
    config: {
      auth: {
        scope: ['plugin::showcase-management.getShowsController.getActiveShows'],
      },
    },
  },
  // Add this new route
  // {
  //   method: 'POST',
  //   path: '/show-update',
  //   handler: 'postShowUpdate.showUpdate',
  //   config: {
  //     scope: ['plugin::showcase-management.postShowUpdate.showUpdate'],
  //   },
  // },
];
