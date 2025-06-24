/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./resources/**/*.{js,ts,jsx,tsx}', './resources/js/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('tailwindcss-animate')],
};
