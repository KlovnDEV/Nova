import React, { useState, useRef } from 'react';
// components
import axios from 'axios';
import { Box, TextField } from 'libs/UI';
// styles
import { error, TwitchApi } from 'utils';
import s from './PhotoControls.module.scss';

interface IProps {
  onMediaAdd: {
    (
      src: string,
      isVideo: boolean,
      isClip,
      caption: string,
      original: string,
      thumbnail?: string,
    ): void;
  };
  hasVideo?: boolean;
  hasClip?: boolean;
  hasDescription?: boolean;
}

export const PhotoControls = ({
  onMediaAdd,
  hasVideo = false,
  hasClip = false,
  hasDescription = false,
}: IProps): JSX.Element => {
  const [mediaLink, setMediaLink] = useState('');
  const [caption, setCaption] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [isClip, setIsClip] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const youtube = useRef<HTMLInputElement>();
  const img = useRef<HTMLInputElement>();
  const clip = useRef<HTMLInputElement>();
  const captRef = useRef<HTMLInputElement>();

  const onYoutubePaste = (e: React.ChangeEvent<HTMLInputElement>): void => {
    captRef.current.value = '';
    setIsVideo(true);
    setIsClip(false);
    setMediaLink(`https://img.youtube.com/vi/${e.target.value}/0.jpg`);
    setCanAdd(true);
  };

  const onImgPaste = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (captRef.current) {
      captRef.current.value = '';
    }
    if (clip.current) {
      clip.current.value = '';
    }
    setIsVideo(false);
    setIsClip(false);
    setMediaLink(e.target.value);
    setCanAdd(true);
  };

  const onTwitchPaste = (e: React.ChangeEvent<HTMLInputElement>): void => {
    captRef.current.value = '';
    youtube.current.value = '';
    setIsClip(true);
    setIsVideo(false);
    TwitchApi.get(`https://api.twitch.tv/kraken/clips/${e.target.value}`)
      .then(async r => {
        setMediaLink(r.data.thumbnails.medium);
        setCanAdd(true);
      })
      .catch(err => {
        console.log(err);
        error('Медиафайл не найден! Проверье правильность введеного Id');
        setCanAdd(false);
      });
  };

  const onCaptionChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setCaption(e.target.value);

  function toDataUrl(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  const onMediaPaste = (e: ClipboardEvent): void => {
    if (e.clipboardData) {
      const { items } = e.clipboardData;
      if (!items) return;

      let isImage = false;
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].type.indexOf('image') !== -1) {
          // image
          const blob = items[i].getAsFile();
          const URLObj = window.URL || window.webkitURL;
          const source = URLObj.createObjectURL(blob);
          isImage = true;
          toDataUrl(source, res => {
            axios
              .post(process.env.IMAGEHOST_URI, {
                dataurl: res,
              })
              .then(response => {
                const { url } = response.data;
                setMediaLink(url);
                setIsVideo(false);
                setCanAdd(true);
              })
              .catch(err => {
                error(`Ошибка добавления скриншота! Перезапустите CAD и попробуйте снова. ${err}`);
                console.log(err);
                setCanAdd(false);
              });
          });
          break;
        }
      }

      if (isImage) {
        e.preventDefault();
        setIsVideo(false);
        setCanAdd(true);
      }
    }
  };

  const clearInputs = (): void => {
    if (youtube.current) youtube.current.value = '';
    if (img.current) img.current.value = '';
    if (clip.current) clip.current.value = '';

    setCanAdd(false);
  };

  return (
    <div className={s.MediaControlsGrid}>
      <div>
        <Box className={s.MediaControlsControls} elevation={0} flex="column top">
          {hasVideo && (
            <>
              <TextField
                variant="outlined"
                fullWidth
                label="Вставьте id YouTube"
                onChange={onYoutubePaste}
                inputRef={youtube}
              />
              <p>ИЛИ</p>
            </>
          )}
          {hasClip && (
            <>
              <TextField
                variant="outlined"
                fullWidth
                label="Вставьте id клипа Twitch"
                onChange={onTwitchPaste}
                inputRef={clip}
              />
              <p>ИЛИ</p>
            </>
          )}
          <TextField
            variant="outlined"
            fullWidth
            label="Ссылка на изображение"
            onChange={onImgPaste}
            inputRef={img}
          />
          <p>ИЛИ</p>
          <Box className={s.MediaControlsPaste} elevation={4} onPaste={onMediaPaste} tabIndex="-1">
            Кликните сюда и нажмите Ctrl+V, чтобы вставить изображение из буфера обмена
          </Box>
          {hasDescription && (
            <TextField
              variant="outlined"
              fullWidth
              label="Добавьте описание"
              onChange={onCaptionChange}
              inputRef={captRef}
              style={{ margin: '15px 0 10px', display: !isVideo ? 'inline-flex' : 'none' }}
            />
          )}

          <button
            className={s.MediaControlsAdd}
            type="button"
            disabled={!canAdd}
            onClick={(): void => {
              if (isVideo) {
                onMediaAdd(youtube.current.value, isVideo, isClip, caption, mediaLink, mediaLink);
              } else if (isClip) {
                onMediaAdd(clip.current.value, isVideo, isClip, caption, mediaLink, mediaLink);
              } else {
                onMediaAdd(mediaLink, isVideo, isClip, caption, mediaLink, mediaLink);
              }
              clearInputs();
              setMediaLink('');
            }}
          >
            Добавить
          </button>
        </Box>
      </div>
      {mediaLink.length > 0 && (
        <Box flex="column center">
          <img className={s.ResponsiveImage} src={mediaLink} alt="a" />
        </Box>
      )}
    </div>
  );
};

export default PhotoControls;
