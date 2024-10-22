import getListPage from "@/function/getListPage";
import musicList from '../../public/musicList.json';

import { useState, useEffect } from "react";
import { child, get, ref, set } from "firebase/database";
import getMusicList, { getLyric } from "@/function/getMusicList";

// db 파일 가져오기
function readData(db, category, setLoadingPercent, setPage) {
  const dbRef = ref(db);
  get(child(dbRef, category))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setLoadingPercent(80);
        return new Promise((res) => setTimeout(() => res(snapshot.val()), 300));
      } else {
        return Promise.reject(new Error('No data'))
      }
    })
    .then((data) => {
      const page = getListPage(data);
      setLoadingPercent(100);
      return new Promise((res) => setTimeout(() => res(page), 300));
    })
    .then((data) => {
      return setPage ? setPage(data) : data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// db 파일 덮어씌우기
function writeData(db, category, data) {
  set(ref(db, category), {
    data,
  });
}

let oldmusicArr = []

export default function useFetchData(type, db) {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [page, setPage] = useState([]);

  useEffect(() => {
    console.log(1)
    // API 호출 + 데이터 가공
    setLoadingPercent(0);
    let pageData = []
    async function fetchData() {
      await new Promise((res) => setTimeout(res, 300)); // 자연스러운 로딩 업데이트
      if (type === 'LOAD') { // 첫 접근일 때
        console.log(2)
        setLoadingPercent(80);
        await new Promise((res) => setTimeout(res, 300));
        // 3단계
        readData(db, 'top100/musicList', setLoadingPercent, setPage); // db
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
      };
    }
    fetchData();
  }, [type]);

  return { loadingPercent, page, setPage, setLoadingPercent }
}