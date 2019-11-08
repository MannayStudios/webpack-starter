# MS-Starter : Webpack 4 Multi Page Starter (SCSS, Babel, Eslint)

This is a simple starter used my Mannay Studios for using [webpack 4](https://webpack.js.org) with [POSTCSS](https://github.com/postcss/postcss) to build multi-page websites.

## Features

1. [**webpack 4**](https://webpack.js.org): JavaScript module bundler
2. [**babel 7**](https://babeljs.io/): Use next generation JavaScript today
3. [**postcss**](https://github.com/postcss/postcss): A tool for transforming styles
4. [**eslint**](http://eslint.org/): The pluggable linting utility for JavaScript and JSX

### Boilerplate structure

```
build/                      codes related to building and dev-server
src/
|- assets/                  assets (containing images)
|- fonts/                   font files (woff, woff2...)
|- scss/                    stylesheets (SCSS)
|- pages/                   folder contains pages for the project
|  |- index.html            html page
|  |- index.js              entry point for this page
      |- subpage/           subpage folder
         |- index.html      subpage html
         |- index.js        subpage specific javascript
         |- subpage.scss    subpage specific styles
```
