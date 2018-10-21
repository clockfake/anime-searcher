export const apiLink = 'https://kitsu.io/api/edge';
export const pageLimit = 16;

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

export const getNote = (id) => {
  const userNotes = localStorage.getItem('userNotes') && JSON.parse(localStorage.getItem('userNotes'));
  if (!userNotes) return null;
  const index = userNotes.findIndex(note => note.id === id);
  if (!(index+1)) return null;
  return userNotes[index];
}

export const setNote = (note) => {
  let userNotes = localStorage.getItem('userNotes') && JSON.parse(localStorage.getItem('userNotes'));
  if (userNotes) {
    userNotes.push(note);
  } else {
    userNotes = [note];
  }
  localStorage.setItem('userNotes', JSON.stringify(userNotes));
}

export const deleteNote = (id) => {
  let userNotes = localStorage.getItem('userNotes') && JSON.parse(localStorage.getItem('userNotes'));
  if (!userNotes) return;
  userNotes = userNotes.filter(note => note.id !== id);
  localStorage.setItem('userNotes', JSON.stringify(userNotes));
}
