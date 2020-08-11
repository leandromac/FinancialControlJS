'use strict';
  const transactionsUl = document.querySelector('#transactions');
  const incomeDisplay = document.querySelector('#money-plus');
  const expenseDisplay = document.querySelector('#money-minus');
  const balanceDisplay = document.querySelector('#balance');
  const form = document.querySelector('#form');
  const inputTransactionName = document.querySelector('#text');
  const inputTransactionAmount = document.querySelector('#amount');
  const inputTransactionDate = document.querySelector('#date');

  const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
  let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : [];

  const removeTransaction = ID => {
    transactions = transactions
    .filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
  };

  const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const cssClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount).toFixed(2);
    const li = document.createElement('li');

    li.classList.add(cssClass);
    li.innerHTML =
      `${transaction.name} <small style="font-size:10px">  ${transaction.date} </small>
      <span> ${operator}  R$  ${amountWithoutOperator} </span>
      <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>`;
    transactionsUl.append(li);
  };

  const updateBalanceValues = () => {
    const transactionsAmounts = transactions
      .map(transaction => transaction.amount);
    const total = transactionsAmounts
      .reduce((accumulator, transaction) => accumulator + transaction, 0)
      .toFixed(2);
    const income = transactionsAmounts
      .filter(value => value > 0)
      .reduce((accumulator, value) => accumulator + value, 0)
      .toFixed(2);
    const expense = transactionsAmounts
      .filter(value => value < 0)
      .reduce((accumulator, value) => accumulator + value, 0)
      .toFixed(2);

    balanceDisplay.textContent = 'R$ ' + total;
    incomeDisplay.textContent = 'R$ ' + income;
    expenseDisplay.textContent = 'R$ ' + expense;
  };

  const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
  };

  init();

  const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  };

  const generateID = () => Math.round(Math.random() * 1000);

  const handleFormSubmit = () => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim()
    const transactionDate = inputTransactionDate.value.trim();

    if(transactionName === '') {
      alert('Preencha o campo nome!');
      return
    };
    if (transactionDate === '') {
      alert('Preencha o campo data!');
      return
    };
    if (transactionAmount === '') {
      alert('Preencha o campo valor!');
      return
    };

    const transaction = {
      id: generateID(),
      name: transactionName,
      date: transactionDate,
      amount: Number(transactionAmount)
    };

    transactions.push(transaction);
    init();
    updateLocalStorage();

    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
    inputTransactionDate.value = '2017/06/01';

  };

  form.addEventListener('submit', handleFormSubmit);