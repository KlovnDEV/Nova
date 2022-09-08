const imagemin = require('imagemin');
const webp = require('imagemin-webp');
const Fs = require('fs');
const ImagePath = 'src/assets/img/';
const OutputPath = 'dist/assets/img';
const ConvertImgs = imagemin([`${ImagePath}*.{jpg,png}`], {
  destination: OutputPath,
  plugins: [webp({ lossless: true, quality: 75 })],
});

Fs.readdirSync(ImagePath, ConvertImgs)
