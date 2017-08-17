export default function svgImage(markup) {
  const image = new Image();
  image.src = `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
  return image;
}
