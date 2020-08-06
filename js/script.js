const transactionsUl = document.querySelector('#transactions');


const dummyTransactions = [
  { id: 1, name: 'Bolo de banana', amount: -20 },
  { id: 2, name: 'Bolo de Laranja', amount: 30 },
  { id: 3, name: 'Bolo de Maçã', amount: 20 },
  { id: 4, name: 'Bolo de Chocolate', amount: 35 }
]

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const cssClass = transaction.amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')

  li.classList.add(cssClass)
  li.innerHTML = transaction.name + '<span>'+ operator + 'R$' + amountWithoutOperator + '</span><button class="delete-btn">x</button>'
  transactionsUl.append(li)
}

const updateBalanceValues = () => {
  const transactionsAmounts = dummyTransactions
    .map(transaction => transaction.amount)
  const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
  const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
  const expense = transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
  console.log(expense)
}

const init = () => {
  dummyTransactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

init()