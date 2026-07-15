module.exports = function (eleventyConfig) {
  // Static assets copied straight to output
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.ignores.add("admin/**");

  // Collections from markdown content folders
  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByGlob("content/events/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date); // newest first
    })
  );

  eleventyConfig.addCollection("videos", (api) =>
    api.getFilteredByGlob("content/videos/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    })
  );

  eleventyConfig.addCollection("artists", (api) =>
    api.getFilteredByGlob("content/artists/*.md").sort((a, b) => {
      return (a.data.order || 99) - (b.data.order || 99);
    })
  );

  // Date formatter: "May 9 2026"
  eleventyConfig.addFilter("prettyDate", (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()} ${d.getUTCFullYear()}`;
  });

  // First featured video helper
  eleventyConfig.addFilter("featuredFirst", (videos) => {
    if (!videos || !videos.length) return null;
    return videos.find((v) => v.data.featured) || videos[0];
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
