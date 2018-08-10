export const apiLink = 'https://kitsu.io/api/edge';

export function decoder(text,filterText) {
  const obj = {
    'top-airing': '?filter[status]=current&sort=popularityRank',
    'top-rated': '?sort=ratingRank',
    'top-popular': '?sort=popularityRank',
    'filter': '?filter[text]='+filterText,
    'filter-category': '?filter[categories]='+filterText+'&sort=popularityRank'
  }
  return obj[text];
}
