/** @type {import("next").NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
});

// module.exports = withPWA({
//   typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     // !! WARN !!
//     ignoreBuildErrors: true,
//   },
// })

module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/generate_plan",
                destination: "http://172.206.226.139:3002/generate_plan",
            },
        ];
    },
};
