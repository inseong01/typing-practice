/*
  [
    {
      trackId: ,
      trackTitle: '',
      artists: [
        {
          artistId: ,
          artistName: '',
          isGroup: boolean,
          imageUrl: ''
        }
      ],
      imageUrl: '',
      albumGenres: '',
      currentRank: number,
      lyric: ''
      isLyric: boolean
    },
    ...
  ]
*/

export default function getMusicList(res) {
  const musicList = [];
  const tracks = res.response.result.chart.items.tracks;

  for (let i = 0; i < tracks.length; i++) {
    const obj = {};

    obj["trackId"] = tracks[i].trackId;
    obj["trackTitle"] = tracks[i].trackTitle;
    obj["artists"] = tracks[i].artists;
    obj["imageUrl"] = tracks[i].album.imageUrl;
    obj["albumGenres"] = tracks[i].album.albumGenres;
    obj["currentRank"] = tracks[i].rank.currentRank;
    obj["lyric"] = tracks[i].lyric ? tracks[i].lyric : '';
    obj["isLyric"] = obj["lyric"] ? true : false;

    musicList.push(obj);
  }

  return musicList;
}