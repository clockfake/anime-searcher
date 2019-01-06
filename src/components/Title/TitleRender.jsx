// @flow
import React from 'react';
import PropTypes from 'prop-types';
import TitleGenreList from './TitleGenreList.jsx';
import type { TitleAttr } from '../../constants';

type Props = {
  title: TitleAttr,
  toggleModal: (string) => void,
  id: string,
  noNote: boolean,
};

const TitleRender = ({ title, toggleModal, id, noNote}: Props) => (
  <div className="title__main  row  no-gutters">
    <div className="title__poster  col-md">
      <img
        src={title.posterImage ? title.posterImage.medium : ''}
        alt={title.titles.en || title.canonicalTitle}
        className="title__poster-image"
      />
    {noNote && <button className="btn btn-primary mt-4" onClick={() => toggleModal('note')}>Add note</button>}
    </div>
    <div className="title__title  col-md">
      <h2 className="title__header">{title.titles.en || title.canonicalTitle}</h2>
      <div className="title__plot">{title.synopsis}</div>
      <div className="title__section-wrapper">
        <div className="title-section">
          <p className="title-section__heading">Show type:</p>
          <p className="title-section__value">{title.showType === 'TV' && title.episodeCount ? `${title.showType} (${title.episodeCount} episodes)` : title.showType}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Status</p>
          <p className="title-section__value">{title.status === 'finished' && title.endDate ? `${title.status} ${title.endDate}` : title.status}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Rating:</p>
          <p className="title-section__value">{`${title.averageRating}, Rank ${title.ratingRank}`}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Popularity rank:</p>
          <p className="title-section__value">{title.popularityRank}</p>
        </div>
      </div>
      {title.youtubeVideoId && <button className="title-section__youtube btn btn-primary" type="button" onClick={() => toggleModal('video')}>Watch trailer</button>}
      <TitleGenreList url={`https://kitsu.io/api/edge/anime/${id}/categories`} />
    </div>
  </div>
);

TitleRender.propTypes = {
  title: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TitleRender;
