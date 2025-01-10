// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", // Your website's URL
  generateRobotsTxt: true, // (Optional) Generates a robots.txt file
  sitemapSize: 50, // Number of URLs per sitemap file
};
