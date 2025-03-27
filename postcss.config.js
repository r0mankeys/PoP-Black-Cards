export const plugins = [
    require('tailwindcss'), // Add Tailwind CSS plugin
    require('autoprefixer'), // Add Autoprefixer for adding vendor prefixes
    require('postcss-normalize'), // Optional: Normalize default styles across browsers
    require('postcss-preset-env')({
        stage: 2,
        browsers: '> 1%, last 2 versions',
    }), // Polyfills for newer CSS features
    require('postcss-flexbugs-fixes'), // Fix flexbox bugs in legacy browsers
    require('postcss-css-variables'), // Polyfill for CSS variables (optional)
];
