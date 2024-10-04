import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="wrap">
        <main className="main">
          <div className="framebox t">
            <div className="frame">
              <img src="./img/(left)point.png" />
            </div>
            <div className="frame">
              <img src="./img/(right)point.png" />
            </div>
          </div>
          <div className="content">
            <Component {...pageProps} />
          </div>
          <div className="framebox b">
            <div className="frame">
              <img src="./img/(left)btm-point.png" />
            </div>
            <div className="frame">
              <img src="./img/(right)btm-point.png" />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
