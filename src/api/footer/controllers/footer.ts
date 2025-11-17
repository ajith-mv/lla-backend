/**
 * footer controller
 */

import { factories } from "@strapi/strapi";

import { addBaseUrlToMediaUrls } from "../../../helper";

export default factories.createCoreController(
  "api::footer.footer",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const entity = await strapi.db.query("api::footer.footer").findOne({
          populate: {
            Logo: true,
            Icon: true,
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

// export default factories.createCoreController('');
