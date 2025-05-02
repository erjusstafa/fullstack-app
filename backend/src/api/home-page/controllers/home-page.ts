import { factories } from '@strapi/strapi';
import NodeCache from 'node-cache';

// Create a new cache instance
const navigationCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async customHomePage(ctx) {
    try {
      let cachedNavigation = navigationCache.get('navigation');
      
      if (!cachedNavigation) {
        console.log('⏳ Fetching navigation from API...');

        const response = await fetch('http://localhost:1337/api/navigation/render/main-navigation?type=TREE');
        if (!response.ok) {
          throw new Error('Failed to fetch navigation data');
        }
        
        cachedNavigation = await response.json();

        // Cache the navigation
        navigationCache.set('navigation', cachedNavigation);

        console.log('✅ Navigation fetched and cached:', JSON.stringify(cachedNavigation, null, 2));
      } else {
        console.log('⚡ Using cached navigation:', JSON.stringify(cachedNavigation, null, 2));
      }
      
      const homePages = await strapi.entityService.findMany('api::home-page.home-page', {
        populate: '*',
      });
      const homePage = Array.isArray(homePages) ? homePages[0] : homePages;
      if (!homePage) {
        return ctx.notFound('HomePage not found');
      }
      
      ctx.body = {
        data: {
          homePage,
          navigation: cachedNavigation,
        },
      };
    } catch (error) {
      console.error('❌ customHomepage error:', error.message);
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
