function addBaseUrlToMediaUrls(obj) {
  const baseUrl = process.env.BASE_URL;

  if (Array.isArray(obj)) {
    return obj.map(addBaseUrlToMediaUrls);
  } else if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const value = obj[key];

      if (
        key === "url" &&
        typeof value === "string" &&
        !value.startsWith("http")
      ) {
        obj[key] = `${baseUrl}${value}`;
      } else if (typeof value === "object" && value !== null) {
        addBaseUrlToMediaUrls(value);
      }
    }
  }

  return obj;
}

export { addBaseUrlToMediaUrls };
