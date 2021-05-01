import axios from 'axios';

export default async (apiUrl, gbDataObj, headers = {}) => {
  let msg = await axios.post(
    process.env.baseApiUrl + apiUrl,
    gbDataObj,
    {
      headers,
    }
  );
  if (msg.data.return_code === 6) {
    msg = await callApi(apiUrl, gbDataObj, headers);
  }
  return msg.data;
};
