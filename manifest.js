const menifest = {
  name: "Squash",
  short_name: "MySquashApp",
  description: "A Batch image optimizer",
  theme_color: "#89b9c2",
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
  icons: [
    {
      src: "pwa-64x64.png",
      sizes: "64x64",
      type: "image/png",
    },
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "maskable-icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};

export default menifest;
