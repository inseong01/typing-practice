async function fetchData() {
  const res = await fetch('https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/total?start=1&display=100', {
    method: 'GET',
    // mode: 'no-cors',
    headers: {
      "accept": "application/json"
    }
  });
  const data = await res.json();
  return data
}


const express = require('express');
const app = express();
const port = 3000;

app.route('/')
  .get((req, res) => {
    res.send('This is music api');
  })

app.route('/musicList')
  .get(async (req, res) => {
    const data = await fetchData();
    res.send(data.response.result.chart);
  })

app.listen(port, () => console.log(`http://localhost:${port} is opened`))