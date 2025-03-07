export default [
  {
    method: 'GET',
    path: '/shows',
    handler: 'getAdminController.getShows',
    config: {
      policies: [],
      auth: false,
    },
  },
  // Add this new route
  // {
  //   method: 'POST',
  //   path: '/show-order',
  //   handler: 'postShowOrder.showOrder',
  //   config: {
  //     policies: [],
  //     auth: false,
  //   },
  // },
  // {
  //   method: 'POST',
  //   path: '/show-active',
  //   handler: 'postShowActive.showActive',
  //   config: {
  //     policies: [],
  //     auth: false,
  //   },
  // },
  // {
  //   method: 'POST',
  //   path: '/show-update',
  //   handler: 'postShowUpdate.showUpdate',
  //   config: {
  //     policies: [],
  //     auth: false,
  //   },
  // },
];
