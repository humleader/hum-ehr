const toTypeof = require('../toTypeof')
const monthyear = require('./month-en')

const renderWord = item => {
  const data = {
    englishName: '',
    chineseName: '',
    joinedDate: '',
    salaryPeriod: '',
    idNo: '',
    cardNo: '',
    basicSalary: '',
    salaryAdjust: '',
    ot: '',
    bonus: '',
    allowance: '',
    others: '',
    scBase: '',
    hfBase: '',
    pension: '',
    unemployment: '',
    medical: '',
    hf: '',
    kidEducation: '',
    furtherEducation: '',
    criticalIllness: '',
    housingLoan: '',
    housingRental: '',
    elderlyExpense: '',
    totalSpecialDeduction: '',
    beforeSC: '',
    totalSC: '',
    iITAmount: '',
    deduction: '',
    otherAfterTax: '',
    takeHomePay: '',
    eMail: '',
    contact: '',
    monthyear: monthyear()
  }

  Object.keys(data).forEach((key, iddex) => {
    if (key !== 'monthyear') {
      let temp = item[iddex]
      if (temp) {
        if (toTypeof(temp) === 'number') {
          temp = temp.toFixed(2)
        }
      } else {
        temp = '-'
      }
      data[key] = temp
    }
  })
  return data
}

module.exports = renderWord
