export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "dev.globalnation.tv",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "dev.globalnation.tv",
          ],
        },
      },
    },
  },
];
