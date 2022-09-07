/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const TwitchApi = axios.create({
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'vtqxrx00jh946qycue9mpi047sfsrs',
  },
});
