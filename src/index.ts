import got from 'got';
import dayjs from 'dayjs';

export class WechatBot {
  private botUrls: string[];
  constructor(botUrls: string[]) {
    this.botUrls = botUrls;
  }
  async sendMsg(msg: string | object, preItem = 0) {
    try {
      let item = preItem;
      //the second round to 0
      if (preItem >= this.botUrls.length) {
        item = 0;
      }
      //if there is no URL offered, do nothing and return just in case
      if (!this.botUrls.length) {
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

      let botUrl = this.botUrls[item];

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
        if (preItem >= this.botUrls.length) {
          return;
        }
        preItem += 1;
        await this.sendMsg(msg, preItem);
      }
    } catch (err) {
      console.error('ERROR OCCURED IN SENDMSG');
    }
  }
}
