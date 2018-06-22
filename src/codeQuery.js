export default function decoder(text,filterText) {
  const obj = {
    'top-airing': '?filter[status]=current&sort=popularityRank',
    'top-rated': '?sort=ratingRank',
    'top-popular': '?sort=popularityRank',
    'filter': '?filter[text]='+filterText
  }
  return obj[text];
}
