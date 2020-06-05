const signature = require('./signature')

function emailContext({ needEmail, errorEmail, successEmail }) {
  const errorEmailstr = errorEmail.length
    ? '<div style="font-size:14px;color:#1c4a81;margin-bottom: 5px;">失败如下：</div>' +
      errorEmail
        .map(res => {
          return `
                <div style="font-size:14px;color:#1c4a81;margin-bottom: 5px;">
                englishName: ${res.englishName}  eMail:${res.eMail}
                </div>`
        })
        .join('')
    : ''
  const htmlstr = `
            <div style="font-family: "Times new Roman", "Microsoft YaHei", "微软雅黑", "宋体", Arial, sans-serif;">
              <div style="font-weight:bold;font-size:14px;color:#1c4a81;margin-bottom: 8px;">
                Dear Jurry,
              </div>
              <div style="font-size:14px;color:#1c4a81;margin-bottom: 8px;">
                需要发送邮件：${needEmail}份，
                发送成功邮件：${successEmail.length}份，发送失败邮件：${errorEmail.length}份
              </div>
              ${errorEmailstr}
              ${signature}
            </div>`
  return htmlstr
}

module.exports = emailContext
