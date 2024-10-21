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

export default async function getMusicList() {
  const res = await fetch('https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/total?start=1&display=100', {
    method: 'GET',
    // mode: 'no-cors',
    // headers:
  });
  console.log(res)
  const data = res ? await res.json() : 'no data'

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
      await fetch(`https://apis.naver.com/vibeWeb/musicapiweb/vibe/v4/lyric/${obj[i].trackId}`)
    const data = await res.json();
    const text = data.response.result.lyric.nomarlLyric.text;
    obj[i].lyric = text ? text : '가사 없음';
    obj[i].isLyric = tracks ? true : false;
  }
  return obj;
}