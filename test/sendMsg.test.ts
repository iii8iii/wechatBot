import { WechatBot } from '../src/index';
describe('sendMsg', () => {
  const urls = [
    'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=1ee8d91c-ee26-458f-9913-fd0d4eb585a7',
    'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=0ecd18fa-d56c-4938-a984-4d91bdc06e37',
  ];
  it('send a message', () => {
    const wb = new WechatBot(urls);
    wb.sendMsg('this is a message from test');
  });
  // it('send a message when the URL is incorrect or forbidden by WeChat', async () => {
  //   const p = new Promise<void>(resolve => {
  //     let a = setInterval(async () => {
  //       await sendMsg('message forbidden', urls, 1);
  //     }, 100);
  //     setTimeout(() => {
  //       clearInterval(a);
  //       resolve();
  //     }, 5000);
  //   });
  //   await p;
  // });
});
