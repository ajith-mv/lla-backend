export default {
  routes: [
    {
      method: "GET",
      path: "/about/founder/:id",
      handler: "about.founderById",
      config: {
        auth: false,
      },
    },
  ],
};
