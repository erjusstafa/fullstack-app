// src/api/home-page/routes/home-page.ts

export default {
    routes: [
      {
        method: 'GET',
        path: '/home-page/customHomepage',
        handler: 'home-page.customHomepage',
        config: {
          auth: false, // You can set this to true if authentication is needed
        },
      },
    ],
  };
  