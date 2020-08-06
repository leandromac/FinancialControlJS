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
  li.innerHTML = '${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>'
  console.log(li)
}

addTransactionIntoDOM(dummyTransactions[0])