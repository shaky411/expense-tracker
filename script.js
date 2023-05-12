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

console.log(transactions)

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
    // console.log(amounts)

    const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    

    const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    // console.log(income)

    const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

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



function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id
        !== id);

        updateLocalStorage();
        init();
}

function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init()

form.addEventListener('submit', addTransaction) 












// Shopping List code below

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    // Validate Input
    if (newItem.value === '') {
        alert("please add an item")
        return;
    }
    
    // create list item
    const li = createLi('flex justify-between bg-slate-100 py-1 px-2 my-2 rounded shadow text-slate-600');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red-500');
    
    li.appendChild(button);

    itemList.appendChild(li);

    checkUI();

    itemInput.value = ''
}

function createLi (classes) {
    const li = document.createElement('li');
    li.className = classes;
    return li
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-trash-can')
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

function clearItems() {
    itemList.innerHTML = '';
    checkUI();
    // while (itemList.firstChild) {
    //     itemList.removeChild(itemList.firstChild);
    // }
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    });
}

function checkUI() {

    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
