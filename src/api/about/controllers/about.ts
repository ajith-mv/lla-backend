/**
 * about controller
 */

import { factories } from '@strapi/strapi';
import { addBaseUrlToMediaUrls } from "../../../helper";

export default factories.createCoreController(
  "api::about.about",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const entity = await strapi.db.query("api::about.about").findOne({
          populate: {
            about: {
              on: {
                "about.about": {
                  populate: {
                    Image: true,
                  },
                },
                "about.legacy": {
                  populate: {
                    Image: true,
                  },
                },
                "about.founder": {
                  populate: {
                    Founder_card: {
                      populate: {
                        Image: true,
                      },
                    },
                  },
                },
                "about.team": {
                  populate: {
                    Card: {
                      populate: {
                        Image: true,
                      },
                    },
                    Frame: {
                      populate: {
                        Image: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        if (!entity) {
          return ctx.notFound("About content not found");
        }

        // Add base URL to media URLs
        addBaseUrlToMediaUrls(entity);

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
      } catch (error) {
        console.error("Home find error:", error);
        return ctx.internalServerError("Failed to load home data");
      }
    },
  })
);
