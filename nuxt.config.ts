// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules:['@nuxtjs/tailwindcss'],
    runtimeConfig: {
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_Secret,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_Secret,
      }
})