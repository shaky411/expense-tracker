const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const updateBalanceColor = document.querySelector('.balance');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

function addTransaction(event) {
    event.preventDefault(); 

    if (text.value.trim() === '') {
        alert("please add item and amount")
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();
        updateLocalStorage();

        // Resets the inout fields
        text.value = '';
        amount.value = '';
    }
}

// Generate ID
function generateID () {
    return Math.floor(Math.random() * 100000000);
}

let transactions = 
localStorage.getItem('transactions') !== null ? 
localStorageTransactions : [];

let currentTime = new Date();
let formatDate = currentTime.toDateString()

// Add transactions to DOM list

function addTransactionDOM(transaction) {
    // get the sign
    const sign = transaction.amount < 0 ? '- £' : '+ £'
    const item = document.createElement('li');
    const date = document.createElement('span');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    date.classList.add('date-span');

    date.innerHTML = `${formatDate}`

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})"><i class="fa-solid fa-trash-can"></i></button>
    `;

    list.appendChild(date);
    list.appendChild(item);
    
}

// Update Blance
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    const income = amounts.filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    // console.log(income)

    const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    // console.log(expense)

    // Update balance color
    if (total == 0) {
        updateBalanceColor.classList.add('text-slate-100');
    } else if (total < 0) {
        updateBalanceColor.classList.remove('text-slate-100');
        updateBalanceColor.classList.add('text-red-400');
    } else {
        updateBalanceColor.classList.remove('text-red-400');
        updateBalanceColor.classList.remove('text-slate-100');
        updateBalanceColor.classList.add('text-green-400');
    }
        

    balance.innerText = `£${total}`;
    money_plus.innerText = `£${income}`;
    money_minus.innerText = `£${expense}`;
}

// Update Local Storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id
        !== id);

        updateLocalStorage();
        init();
}

init()

form.addEventListener('submit', addTransaction) 