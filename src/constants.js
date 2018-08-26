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
  const obj = {
    'top-airing': 'Top airing anime',
    'top-rated': 'Top rated anime',
    'top-popular' : 'Top popular anime',
    'filter' : 'Searching for: «' + filterText + '»',
    'filter-category' : 'Top anime in «' + filterText + '» category'
  }

  return obj[type];
}
