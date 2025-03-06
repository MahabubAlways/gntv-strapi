export default [
  {
    method: 'GET',
    path: '/all-shows',
    handler: 'getAdminController.getShows',
    config: {
      auth: {
        scope: ['plugin::showcase-management.getAdminController.getShows'],
      },
    },
  },
  {
    method: 'GET',
    path: '/active-shows',
    handler: 'getAdminController.getActiveShows',
    config: {
      auth: {
        scope: ['plugin::showcase-management.getAdminController.getActiveShows'],
      },
    },
  },
  {
    method: 'GET',
    path: '/all-profiles',
    handler: 'getAdminController.getProfiles',
    config: {
      auth: {
        scope: ['plugin::showcase-management.getAdminController.getProfiles'],
      },
    },
  },
  {
    method: 'GET',
    path: '/active-profiles',
    handler: 'getAdminController.getActiveProfiles',
    config: {
      auth: {
        scope: ['plugin::showcase-management.getAdminController.getActiveProfiles'],
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
