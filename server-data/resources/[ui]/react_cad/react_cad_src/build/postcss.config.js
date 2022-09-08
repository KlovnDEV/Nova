const autoprefixer = require('autoprefixer');
const combinemq = require('postcss-combine-media-query');
const removeDuplicates = require('postcss-discard-duplicates');

module.exports = api => ({
  syntax: 'postcss-scss',
  plugins: [autoprefixer, combinemq, removeDuplicates],
});
