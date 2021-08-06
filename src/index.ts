import got from 'got';
import dayjs from 'dayjs';

export const sendMsg = async (
  msg: string | object,
  botUrls: string[],
  preItem = 0
) => {
  try {
    let item = preItem;
    //the second round to 0
    if (preItem >= botUrls.length) {
      item = 0;
    }
    //if there is no URL offered, do nothing and return just in case
    if (!botUrls.length) {
      return;
    }
    //manage the message
    if (typeof msg === 'object') {
      msg = JSON.stringify(msg);
    }
    const { heapTotal, heapUsed } = process.memoryUsage();
    const defaultMsgContent = `-------------------------\n>Total:${(
      heapTotal /
      1024 /
      1024 /
      1024
    ).toFixed(2)} G\n>Used:${((heapUsed / heapTotal) * 100).toFixed(
      2
    )}%\n>${dayjs().format('YYYYMMDD HH:mm:ss')} ~`;

    let botUrl = botUrls[item];

    const { body } = await got.post(botUrl, {
      json: {
        msgtype: 'markdown',
        markdown: {
          content: `${msg}\n${defaultMsgContent} `,
        },
      },
    });

    const { errcode } = JSON.parse(body);
    if (errcode) {
      if (preItem >= botUrls.length) {
        return;
      }
      preItem += 1;
      await sendMsg(msg, botUrls, preItem);
    }
  } catch (err) {
    console.error('ERROR OCCURED IN SENDMSG');
  }
};
