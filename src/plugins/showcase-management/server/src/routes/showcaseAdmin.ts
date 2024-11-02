export default [
  {
    method: 'GET',
    path: '/shows',
    handler: 'getShowsController.getShows',
    config: {
      policies: [],
      auth: false,
    },
  },
  // Add this new route
  {
    method: 'POST',
    path: '/show-order',
    handler: 'postShowOrder.showOrder',
    config: {
      policies: [],
      auth: false,
    },
  },
];
