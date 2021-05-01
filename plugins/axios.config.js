import https from 'https';
export default function ({ $axios, redirect }) {
  $axios.setHeader('Content-Type', 'application/json');
  $axios.setHeader('X-localization', 'us');
  $axios.setHeader('Accept', 'application/json');
$axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: 
    false });
}
