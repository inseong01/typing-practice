import getListPage from "@/function/getListPage";
import musicList from '../../public/musicList.json';

import { useState, useEffect } from "react";
import { child, get, ref, set, update } from "firebase/database";
import getMusicList, { getLyric } from "@/function/getMusicList";

// db 파일 가져오기
export function readData(db, category, setLoadingPercent, setPage) {
  const dbRef = ref(db);
  const a = get(child(dbRef, category))
    .then((snapshot) => {
      if (!snapshot.exists()) Promise.reject(new Error('No data'))
      if (category === 'top100/musicList') {
        setLoadingPercent(80)
        return new Promise((res) => setTimeout(() => res(snapshot.val()), 300));
      };
      return snapshot.val();
    })
    .then((data) => {
      const page = getListPage(data);
      if (category === 'top100/musicList') {
        setLoadingPercent(100)
        return new Promise((res) => setTimeout(() => res(page), 150));
      };
      return data;
    })
    .then((data) => {
      if (setPage) setPage(data)
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  return a;
}

// db 파일 덮어씌우기
export function writeData(db, category, data) {
  set(ref(db, category), {
    data,
  });
}

// db 파일 업데이트
export function updateData(db, category, data) {
  // db 업데이트 주체와 data는 객체 항목을 가지고 있어야 함
  const updates = {};
  for (let i = 0; i < Object.keys(data).length; i++) {
    updates[category + Object.keys(data)[i]] = data[Object.keys(data)[i]];
  }
  return update(ref(db), updates);
}

export default function useFetchData(type, db) {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [page, setPage] = useState([]);

  useEffect(() => {
    // API 호출 + 데이터 가공
    setLoadingPercent(0);
    let pageData = []
    async function fetchData() {
      await new Promise((res) => setTimeout(res, 300)); // 자연스러운 로딩 업데이트
      if (type === 'LOAD') { // 첫 접근일 때
        // 3단계
        // readData(db, 'top100/musicList', setLoadingPercent, setPage); // db
        pageData = await getListPage(musicList); // api, 목 데이터: musicList || API 데이터: musicArr
        setPage(pageData)
      } else if (type === 'UPDATE') { // 갱신 접근일 때
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
        setPage(pageData)
        setIsClick(false);
      };
    }
    fetchData();
  }, [type]);

  return { loadingPercent, page, isClick, setIsClick, setPage, setLoadingPercent }
}