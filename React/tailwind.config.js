/** @type {import('tailwindcss').Config} */

/* For tail wind to work properly please ensure that you generate tailwind and postcss config files with npx
 * AND please import the index.css file into the app file using import './index.css'
 * You may have deleted this during the set up because it was unused but please ensure this is there.
 *
 * if tailwindcss intellisense is not working, remove all tailwindcss plugins and redownload theofficial
 * if it still does not work please download the updated version of webstorm, webstorm does not update, you have to download the next version in the
 * website
 * */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                height: 'height'
            }
        }
    },
    plugins: []
};
