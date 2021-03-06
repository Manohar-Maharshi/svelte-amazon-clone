const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    fontFamily:{
      'sans' : ['Lato','sans-serif'],
    }
  },

  plugins: [
  	require('@tailwindcss/line-clamp'),
  ],
};

module.exports = config;
