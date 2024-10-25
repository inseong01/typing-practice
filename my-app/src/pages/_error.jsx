import styles from '@/styles/error.module.css';
import LinkBtn from '@/components/linkBtn';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Error() {
  const router = useRouter();
  const msg = useSearchParams().get('m');
  let dataObj = {};

  switch (msg) {
    case 'QueryReadData': {
      dataObj = {
        title: '가사를 불러올 수 없습니다..',
        btns: [{ onClick: () => router.back(), description: '뒤로가기' }],
      };
      break;
    }
    case 'ReadData': {
      dataObj = {
        title: '목차를 불러올 수 없습니다..',
        btns: [{ onClick: () => router.replace('/'), description: '돌아가기' }],
      };
      break;
    }
    default: {
      dataObj = {
        code: 404,
        title: '페이지를 찾을 수 없습니다..',
        btns: [{ onClick: () => router.replace('/'), description: '돌아가기' }],
      };
    }
  }

  return (
    <div className={styles.errorBox}>
      {dataObj.code && <div className={styles.code}>{dataObj.code}</div>}
      <div className={styles.title}>{dataObj.title}</div>
      <LinkBtn btns={dataObj.btns} />
    </div>
  );
}
