// Check the comment at the top of `settings.color.css` on how to use this file.
// Adapted from https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf

const hex = [
  '#666A73',
  '#737F95',
  '#688ED5',
  '#5D92F3',
  '#756674',
  '#987295',
  '#D65DCC',
  '#F44DE5',
  '#A2A691',
  '#CDD7A2',
  '#DFFA6C',
  '#DCFE50',
  '#ADA597',
  '#DFCCA8',
  '#FFCC6E',
  '#FFC250',
];

function hexToHSL(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    // eslint-disable-next-line default-case
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h}, ${s}%, ${l}%`;
}

const hsl = hex.map(hexToHSL);

hsl.forEach(val => console.log(val));
