export default [
  {
    method: 'GET',
    path: '/all-shows',
    handler: 'getAdminController.getShows',
    config: {
      auth: {
        scope: ['plugin::gntv-dashboard.getAdminController.getShows'],
      },
    },
  },
  {
    method: 'GET',
    path: '/my-shows',
    handler: 'getAdminController.myShows',
    config: {
      auth: {
        policies: ['plugin::gntv-dashboard.isSubscriber'],
      },
    },
  },
  {
    method: 'GET',
    path: '/active-shows',
    handler: 'getAdminController.getActiveShows',
    config: {
      auth: {
        scope: ['plugin::gntv-dashboard.getAdminController.getActiveShows'],
      },
    },
  },
  {
    method: 'GET',
    path: '/creator-profile',
    handler: 'getAdminController.getCreatorProfile',
    config: {
      auth: {
        policies: ['plugin::gntv-dashboard.isSubscriber'],
      },
    },
  },
  {
    method: 'GET',
    path: '/all-profiles',
    handler: 'getAdminController.getProfiles',
    config: {
      auth: {
        scope: ['plugin::gntv-dashboard.getAdminController.getProfiles'],
      },
    },
  },
  {
    method: 'GET',
    path: '/active-profiles',
    handler: 'getAdminController.getActiveProfiles',
    config: {
      auth: {
        scope: ['plugin::gntv-dashboard.getAdminController.getActiveProfiles'],
      },
    },
  },
];
