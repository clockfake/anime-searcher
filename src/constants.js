// @flow
export const apiLink: string = 'https://kitsu.io/api/edge';
export const pageLimit: number = 16;

export const decoder = (text: string, filterText: string = ''): string => {
  const obj = {
    'top-airing': '?filter[status]=current&sort=popularityRank',
    'top-rated': '?sort=ratingRank',
    'top-popular': '?sort=popularityRank',
    'filter': `?filter[text]=${filterText}`,
    'filter-category': `?filter[categories]=${filterText}&sort=popularityRank`,
  }
  return obj[text];
}

export const headerDecoder = (type: string, filterText: string = ''): string => {
  const obj = {
    'top-airing': 'Top airing anime',
    'top-rated': 'Top rated anime',
    'top-popular' : 'Top popular anime',
    'filter' : `Searching for: «${filterText}»`,
    'filter-category' : `Top anime in «${filterText}» category`,
  }

  return obj[type];
}

export type Note = {
  date: string,
  id: string,
  image: string,
  rate: number,
  text: string,
  title: string,
}

export const fetchNotes = (): ?Array<Note> => {
  const notesJSON: ?string = localStorage.getItem('userNotes');
  if (!notesJSON) return null;
  return JSON.parse(notesJSON);
}

export const getNote = (id: string): ?Note => {
  const userNotes = fetchNotes();
  if (!userNotes) return null;
  const index = userNotes.findIndex(note => note.id === id);
  if (!(index+1)) return null;
  return userNotes[index];
}

export const setNote = (note: Note) => {
  let userNotes = fetchNotes();
  if (userNotes) {
    userNotes.push(note);
  } else {
    userNotes = [note];
  }
  localStorage.setItem('userNotes', JSON.stringify(userNotes));
}

export const deleteNote = (id: string) => {
  const userNotes = fetchNotes();
  if (!userNotes) return;
  const filtered = userNotes.filter(note => note.id !== id);
  localStorage.setItem('userNotes', JSON.stringify(filtered));
}

export type TitleAttr = {
  titles: {
    en: string,
  },
  posterImage: {
    tiny: string,
    medium: string,
    },
  canonicalTitle: string,
  synopsis: string,
  showType: string,
  episodeCount?: number,
  status: string,
  endDate?: string,
  averageRating: number,
  ratingRank: number,
  popularityRank: number,
  youtubeVideoId?: string,
};

export type Title = {
  id: string,
  attributes: TitleAttr,
};
