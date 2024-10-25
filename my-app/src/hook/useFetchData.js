import { child, equalTo, get, orderByChild, query, ref, set, update } from "firebase/database";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import getListPage from "@/function/getListPage";
import musicList from '../../public/musicList.json';
import { firebaseConfig } from '../../firebaseConfig';
import getMusicList, { getLyric } from "@/function/getMusicList";
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import splitLyric from "@/function/splitLyric";

// Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// db 파일 가져오기
export async function readData(category, setLoadingPercent) {
  const dbRef = ref(db);
  const dbData = get(child(dbRef, category))
    .then((snapshot) => {
      if (!snapshot.exists()) throw new Error('No data');
      if (setLoadingPercent) {
        setLoadingPercent(80)
        return new Promise((res) => setTimeout(() => res(snapshot.val()), 300));
      };
      return snapshot.val();
    })
    .then((data) => {
      const page = getListPage(data);
      if (setLoadingPercent) {
        setLoadingPercent(100)
        return new Promise((res) => setTimeout(() => res(page), 150));
      };
      return data;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
  return dbData;
}

// db 쿼리 파일 가져오기
export async function queryReadData(category, value, key) {
  try {
    const queryData = query(ref(db, category), orderByChild(key), equalTo(value));
    const snapshot = await get(queryData)
    if (!snapshot.exists()) throw new Error('No queryData')
    return snapshot.val()
  } catch (error) {
    return console.error(error);
  }
}

// db 파일 덮어씌우기
export function writeData(category, data) {
  set(ref(db, category), {
    data,
  });
}

// db 파일 업데이트
export function updateData(category, data) {
  // db 업데이트 주체와 data는 객체 항목을 가지고 있어야 함
  const updates = {};
  for (let i = 0; i < Object.keys(data).length; i++) {
    updates[category + Object.keys(data)[i]] = data[Object.keys(data)[i]];
  }
  return update(ref(db), updates);
}

export default function useFetchData(type, key) {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [pageSheet, setPageSheet] = useState({});
  const [dataObj, setDataObj] = useState({});
  const [page, setPage] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // API 호출 + 데이터 가공
    const modal = document.getElementById('modal');
    let pageData = [];
    let error = '';

    async function fetchData() {
      setLoadingPercent(0); // 로딩바 초기화
      await new Promise((res) => setTimeout(res, 300)); // 자연스러운 로딩 업데이트
      switch (type) {
        case 'LOAD': { // 페이지 처음 접속할 때
          try {
            // 3단계
            pageData = await readData('top100/musicList', setLoadingPercent); // db
            // pageData = await getListPage(musicList); // mock
            setLoadingPercent(100);
            await new Promise((res) => setTimeout(res, 300));
            setPage(pageData);
            await new Promise((res) => setTimeout(res, 300));
            break;
          } catch {
            // 저장된 목록 firebase에서 불러오기 오류, 사이트 오류 UI
            setLoadingPercent(100);
            await new Promise((res) => setTimeout(res, 300));
            error = 'ReadData';
            return router.replace(`/_error?m=${encodeURIComponent(error)}`);
          }
        }
        case 'UPDATE': { // 목차 업데이트 할 때
          try {
            // 1단계
            const top100 = await getMusicList();
            setLoadingPercent(20);
            await new Promise((res) => setTimeout(res, 300));
            // 2단계
            const musicArr = await getLyric(top100);
            setLoadingPercent(80);
            await new Promise((res) => setTimeout(res, 300));
            // 3단계
            pageData = await getListPage(musicArr); // api, 목 데이터: musicList || API 데이터: musicArr
            setLoadingPercent(100);
            await new Promise((res) => setTimeout(res, 300));
            setPage(pageData);
            return;
          } catch (e) {
            // 에러 발생하면 반환, 모달창 켜진 상태 setLoadingPercent만 다름
            return;
          }
        }
        case 'ID': {
          try {
            // const music = await musicList.find((item) => item.trackId === key); // mock
            const musicObj = await queryReadData('top100/musicList', key, 'trackId'); // db
            const music = musicObj[Object.keys(musicObj)[0]]; // db
            setLoadingPercent(80);
            await new Promise((res) => setTimeout(res, 300));
            const artistName = await music.artists
              .map((value) => value.artistName)
              .join()
              .replace(',', ', ');
            setLoadingPercent(100);
            await new Promise((res) => setTimeout(res, 300));
            const sheet = splitLyric(music);
            const obj = {
              music,
              artistName
            }
            setDataObj(obj)
            setPageSheet(sheet);
            break;
          } catch {
            // 특정 음악 선택 firebase 오류, 오류 페이지로 이동
            setLoadingPercent(100);
            await new Promise((res) => setTimeout(res, 300));
            error = 'QueryReadData'
            return router.replace(`/_error?m=${encodeURIComponent(error)}`);
          }
        }
      }
    }
    fetchData();
  }, [type]);

  return { loadingPercent, page, pageSheet, dataObj, setPage, setLoadingPercent }
}