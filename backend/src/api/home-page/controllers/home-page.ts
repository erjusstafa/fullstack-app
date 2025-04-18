// src/api/home-page/controllers/home-page.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async customHomepage(ctx) {
    try {

      const homePages = await strapi.entityService.findMany('api::home-page.home-page', {
        populate: '*',
      });
      const homePage = Array.isArray(homePages) ? homePages[0] : homePages;
      if (!homePage) {
        return ctx.notFound('HomePage not found');
      }
      const response = await fetch(`http://localhost:1337/api/navigation/render/main-navigation?type=TREE`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch navigation data');
      }

      const navigation = await response.json();

      ctx.body = {
        data: {
          homePage,
          navigation,
        },
      };
    } catch (error) {
      console.error('❌customHomepage error:', error.message);
      ctx.status = 500;
      ctx.body = {
        data: null,
        error: {
          status: 500,
          message: error.message,
        },
      };
    }
  },
}));
