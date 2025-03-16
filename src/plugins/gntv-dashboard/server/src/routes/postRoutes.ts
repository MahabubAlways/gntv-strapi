export default [
  {
    method: 'POST',
    path: '/check-email',
    handler: 'postAdminController.checkEmail',
    config: {
      auth: {
        scope: ['plugin::gntv-dashboard.postAdminController.checkEmail'],
      },
    },
  },
  {
    method: 'POST',
    path: '/register',
    handler: 'postAdminController.postRegister',
    config: {
      auth: {
        scope: ['plugin::gntv-dashboard.postAdminController.postRegister'],
      },
    },
  },
];

// export default [
//   {
//     method: 'POST',
//     path: '/show-order',
//     handler: 'postShowOrder.showOrder',
//     config: {
//         auth: {
//           scope: ['plugin::gntv-dashboard.getAdminController.getShows'],
//         },
//       },
//   },
//   {
//     method: 'POST',
//     path: '/show-active',
//     handler: 'postShowActive.showActive',
//     config: {
//         auth: {
//           scope: ['plugin::gntv-dashboard.getAdminController.getShows'],
//         },
//       },
//   },
//   {
//     method: 'POST',
//     path: '/show-update',
//     handler: 'postShowUpdate.showUpdate',
//     config: {
//         auth: {
//           scope: ['plugin::gntv-dashboard.getAdminController.getShows'],
//         },
//       },
//   },
// ];
