/* eslint-disable import/prefer-default-export */
import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import Slider, { ReactImageGalleryItem } from 'react-image-gallery';
import YouTube from 'react-youtube';
import { TwitchClip } from 'react-twitch-embed';
// components
import { Card, CardHeader } from 'components';
import { PhotoControls } from 'modules/Photo/Components';
// utils
import { error, Icons, TwitchApi } from 'utils';
import State from 'modules/Record/State';
// types
import * as T from 'types';
// styles
import s from '../../Record.module.scss';
import '../../Slider.scss';

interface Slide extends T.Media, ReactImageGalleryItem {
  original: string;
  thumbnail?: string;
}

type IProps = { editable: boolean };

const renderSlide = (slide: Slide): JSX.Element => {
  if (slide.isVideo) {
    // eslint-disable-next-line no-param-reassign
    slide.original = `https://img.youtube.com/vi/${slide.src}/0.jpg`;
    // eslint-disable-next-line no-param-reassign
    slide.thumbnail = `https://img.youtube.com/vi/${slide.src}/0.jpg`;
    return (
      <div className="slider-figure">
        <YouTube
          videoId={slide.src}
          opts={{
            height: '650px',
            width: '100%',
            playerVars: {
              controls: 1,
              rel: 0,
              showinfo: 0,
              disablekb: 1,
              modestbranding: 1,
            },
          }}
        />
      </div>
    );
  }

  if (slide.isClip) {
    TwitchApi.get(`https://api.twitch.tv/kraken/clips/${slide.src}`)
      .then(r => {
        // eslint-disable-next-line no-param-reassign
        slide.original = r.data.thumbnails.medium;
        // eslint-disable-next-line no-param-reassign
        slide.thumbnail = r.data.thumbnails.small;
      })
      .catch(err => {
        error(`Загужен несуществующий медиафайл! Ошибка: ${err}`);
      });

    return (
      <div className="slider-figure">
        <TwitchClip
          muted
          autoplay={false}
          allowFullScreen={false}
          width="100%"
          height="650px"
          clip={DEVELOPMENT ? slide.src : `${slide.src}&parent=http://react_cad`}
          parent={DEVELOPMENT ? [] : ['http://react_cad']}
        />
      </div>
    );
  }
  // eslint-disable-next-line no-param-reassign
  slide.original = slide.src;
  // eslint-disable-next-line no-param-reassign
  slide.thumbnail = slide.src;

  return (
    <figure className="slider-figure">
      <img
        className="slider-img"
        src={slide.src}
        alt={slide.caption || slide.src}
        onError={() => {
          // eslint-disable-next-line no-param-reassign
          slide.src = `${ASSETS}/img/loader.gif`;
        }}
      />
      {slide.caption.length > 0 && (
        <figcaption className="slider-caption">{slide.caption}</figcaption>
      )}
    </figure>
  );
};

export const TabMaterials = observer(
  ({ editable }: IProps): JSX.Element => {
    const ref = useRef<Slider>();

    const getRecordMaterialsActions = () => {
      if (State.RecordData.media.length === 0 || !editable) {
        return [];
      }

      const actions = [];

      actions.push({
        text: State.isMediaMenuOpen ? 'Скрыть' : 'Добавить',
        icon: State.isMediaMenuOpen ? Icons.RemoveCircleOutline : Icons.ControlPoint,
        onClick: () => {
          State.isMediaMenuOpen = !State.isMediaMenuOpen;
        },
      });

      if (!State.isMediaMenuOpen) {
        actions.push({
          text: 'Удалить',
          icon: Icons.HighlightOff,
          onClick: () => State.onMediaDelete(),
        });
      }

      return actions;
    };

    useEffect(() => {
      if (ref.current && !State.sliderInstance) {
        State.setSliderInstance(ref.current);
        State.sliderInstance.slideToIndex(0);
        State.onSlideChange(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State.RecordData.media.length]);

    return (
      <Card
        header={<CardHeader labelText="Материалы дела" actions={getRecordMaterialsActions()} />}
      >
        {State.RecordData.media.length > 0 && (
          <Slider
            items={State.RecordData.media as Slide[]}
            renderItem={renderSlide}
            thumbnailPosition="right"
            additionalClass={State.isMediaMenuOpen ? s.Hidden : 'gallery-container'}
            showFullscreenButton={false}
            showPlayButton={false}
            onSlide={State.onSlideChange}
            ref={ref}
          />
        )}
        <div className={State.isMediaMenuOpen ? s.MediaMenu : s.Hidden}>
          <PhotoControls onMediaAdd={State.onMediaAdd} hasDescription hasVideo hasClip />
        </div>
      </Card>
    );
  },
);
