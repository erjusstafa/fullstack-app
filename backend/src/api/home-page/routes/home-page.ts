// src/api/home-page/routes/home-page.ts

export default {
    routes: [
      {
        method: 'GET',
        path: '/home-page/customHomePage',
        handler: 'home-page.customHomePage',
        config: {
          auth: false, // You can set this to true if authentication is needed
        },
      },
    ],
  };
  