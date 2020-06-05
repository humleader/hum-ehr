const signature = require('./signature')

function emailContext(data) {
  const contact =
    data.contact === 'Jurry' ? 'jurry.jiang@humleader.com' : 'carry.zhang@humleader.com'
  const Tel = data.contact === 'Jurry' ? '021-62880071' : '021-62880071'
  const contactName = data.contact === 'Jurry' ? 'Jurry Jiang' : 'Carry Zhang'
  const Mobile = data.contact === 'Jurry' ? '13482883858' : '13033607696'

  const html = `
      <div style="font-family: "Times new Roman", "Microsoft YaHei", "微软雅黑", "宋体", Arial, sans-serif;">
        <div style="font-weight:bold;font-size:14px;color:#1c4a81;margin-bottom: 8px;">
          Hi ${data.chineseName},
        </div>
        <div style="font-size:14px;color:#1c4a81;margin-bottom: 8px;">
          此工资单由系统发送,如对此有疑问
        </div>
        <div style="font-size:14px;color:#1c4a81;margin-bottom: 8px;">
          请联系${contactName},她的联系方式如下:
        </div>
        <div style="font-size:14px;color:#1c4a81;">
          邮箱地址: ${contact}
        </div>
        <div style="font-size:14px;color:#1c4a81;">
          公司电话: ${Tel}
        </div>
        <div style="font-size:14px;color:#1c4a81;">
          移动电话: ${Mobile}
        </div>
        ${signature}
      </div>`
  return html
}

module.exports = emailContext
