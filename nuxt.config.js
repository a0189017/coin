import { TRUE } from 'node-sass';

const fs = require('fs');
const path = require('path');
const axios = require('axios');

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'coin-project',
    titleTemplate: '%s | coin-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "coin-project"
      },
      {
        hid: "og:tittle",
        property: "og:title",
        content: "coin-project"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "",
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'coin-project'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: ''
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article'
      },

    ],
    script: [
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap'
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  styleResources: {
    sass: [
        '~/assets/sass/main.sass',
    ]
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/axios.config',
    '~/plugins/main.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    //   // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far']
          },
        ],
      },
    ],
  ],
  serverMiddleware: [
    '~/sever-middleware/webviewGetPost',
  ],
  axios: {
    proxy: false,
    baseurl: '/',
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {},
    transpile: [/^vue-google-oauth2($|\/)/,'vue-echarts', 'resize-detector'],
    cssSourceMap: true,
    extractCSS: true,

  },
  postcss: {
      plugins: {
        // Disable `postcss-url`
        'postcss-url': false,
        // Add some plugins
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
  },
  server: {
    host: '0.0.0.0',
    port: process.env.BASE_PORT,
  },
  //全域變數
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    baseApiUrl: process.env.API_URL,
  },
  router: {
    base: '/',
    middleware: 'routing'
  },
};
