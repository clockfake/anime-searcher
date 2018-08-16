export const apiLink = 'https://kitsu.io/api/edge';

export const decoder = (text,filterText) => {
  const obj = {
    'top-airing': '?filter[status]=current&sort=popularityRank',
    'top-rated': '?sort=ratingRank',
    'top-popular': '?sort=popularityRank',
    'filter': '?filter[text]='+filterText,
    'filter-category': '?filter[categories]='+filterText+'&sort=popularityRank'
  }
  return obj[text];
}

export const pageLimit = 16;

export const headerDecoder = (type, filterText) => {
  switch (type) {
    case 'top-airing': return 'Top airing anime';
    case 'top-rated': return 'Top rated anime';
    case 'top-popular' : return 'Top popular anime'
    case 'filter' : return 'Searching for: «' + filterText + '»';
    case 'filter-category' : return 'Top anime in «' + filterText + '» category';
    default: return 'Anime titles'
  }
}
