var gulp = require('gulp');

var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');


gulp.task('build', ['def', 'min', 'cjs']);

gulp.task('def', async function () {
  const bundle = await rollup.rollup({
    entry: './src/text-marquee.js',
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      babel({
        exclude: ['node_modules/**'],
      }),
      commonjs()
    ]
  });

  await bundle.write({
    format: 'umd',
    moduleName: 'textMarquee',
    dest: 'dist/text-marquee.js'
  });
});

gulp.task('min', async function () {
  const bundle = await rollup.rollup({
    entry: './src/text-marquee.js',
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      uglify(),   // 加入压缩代码
      commonjs()
    ]
  });

  await bundle.write({
    format: 'umd',
    moduleName: 'textMarquee',
    dest: 'dist/text-marquee.min.js'
  });
});

gulp.task('cjs', async function () {
  const bundle = await rollup.rollup({
    entry: './src/text-marquee.js',
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      commonjs()
    ]
  });

  await bundle.write({
    format: 'cjs',
    // moduleName: 'corejs',
    dest: './dist/text-marquee.cjs.js', // equivalent to --output
  });
});

gulp.task('default', ['build']);
