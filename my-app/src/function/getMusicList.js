/*
  [
    {
      trackId: 음악ID,
      title: 음악제목,
      artist: 아티스트 이름,
      lyric: ID_API - response.result.lyric.normalLyric.text('\n' 따라 줄바꿈),
      albumGenres: 장르,
      imageUrl: 앨범사진 링크,
      currentRank: 순위,
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
    obj["lyric"] = '';

    musicList.push(obj);
  }

  return musicList;
}