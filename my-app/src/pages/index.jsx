import Head from 'next/head';
import CreateSwiper from '@/components/createSwiper';

export default function Home() {
  return (
    <>
      <Head>
        <title>Typing-practice</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateSwiper />
    </>
  );
}
