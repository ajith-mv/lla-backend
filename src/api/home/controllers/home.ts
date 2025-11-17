import { factories } from "@strapi/strapi";
import { posix } from "path";
import { addBaseUrlToMediaUrls } from "../../../helper";

export default factories.createCoreController(
  "api::home.home",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const entity = await strapi.db.query("api::home.home").findOne({
          populate: {
            Home: {
              on: {
                "home.banner": {
                  populate: {
                    Video: true,
                  },
                },
                "home.course": {
                  populate: {
                    Card: {
                      populate: {
                        Image: true,
                      },
                    },
                  },
                },
                "home.campus": {
                  populate: {
                    Bg_img: true,
                  },
                },
                "home.faculty": {
                  populate: {
                    Card: {
                      populate: {
                        Image: true,
                      },
                    },
                  },
                },
                "home.life": {
                  populate: {
                    Card: {
                      populate: {
                        Image: true,
                      },
                    },
                  },
                },
                "home.testimonial": {
                  populate: {
                    Card: {
                      populate: {
                        Image: true,
                      },
                    },
                  },
                },
                "home.lla-testimonials": {
                  populate: {
                    Slider: {
                      populate: { "*": true },
                    },
                  },
                },
                "home.gallery": {
                  populate: {
                    Image: true,
                  },
                },
                "home.about": {
                  populate: {
                    Image: true,
                  },
                },
                "home.sponsor": {
                  populate: {
                    Image: true,
                  },
                },
              },
            },
          },
        });

        if (!entity) {
          return ctx.notFound("Home content not found");
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
