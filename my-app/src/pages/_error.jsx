import styles from '@/styles/error.module.css';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Error() {
  const router = useRouter();
  const msg = useSearchParams().get('m');

  switch (msg) {
    case 'QueryReadData':
      return (
        <div>
          <div>가사를 불러올 수 없습니다..</div>
          <br />
          <div className={styles.nav} onClick={() => router.back()}>
            <p>돌아가기</p>
          </div>
        </div>
      );
    case 'ReadData':
      return (
        <div>
          <div>목차를 불러올 수 없습니다..</div>
          <br />
          <div className={styles.nav} onClick={() => router.replace('/')}>
            <p>돌아가기</p>
          </div>
        </div>
      );

    default: {
      return (
        <div>
          <p>예기치 못한 오류가 발생했습니다..</p>
          <br />
          <p>(이 문제가 계속 발생한다면 새로고침을 눌러주세요)</p>
          <div className={styles.nav} onClick={() => router.replace('/')}>
            <p>돌아가기</p>
          </div>
        </div>
      );
    }
  }
}
