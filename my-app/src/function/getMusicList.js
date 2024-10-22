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

const port = 3000;

export default async function getMusicList() {
  const res = await fetch(`/api/musicList`, {
    method: 'GET',
    headers: {
      "accept": "application/json"
    }
  });
  const data = await res.json();
  const musicList = [];
  const tracks = data.response.result.chart.items.tracks;

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

export async function getLyric(obj) {
  for (let i = 0; i < obj.length; i++) {
    const res =
      await fetch(`/api/musicLyric/${obj[i].trackId}`,
        {
          method: 'GET',
          headers: {
            "accept": "application/json"
          }
        }
      );
    const data = await res.json()
    const text = await data.response.result.lyric.normalLyric.text;

    obj[i].lyric = text ? text : '가사 없음';
    obj[i].isLyric = text ? true : false;
  }
  return obj;
}