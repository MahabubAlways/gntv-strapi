export default {
  routes: [
    {
      method: "GET",
      path: "/pages/:slug",
      handler: "api::page.page.findOne",
      auth: {
        auth: false,
      },
    },
  ],
};
