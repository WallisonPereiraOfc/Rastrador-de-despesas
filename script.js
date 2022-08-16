//elements
const balance = document.getElementById('balance');
const money_plus =  document.getElementById('money-plus');
const money_minus =  document.getElementById('money-minus');
const list =  document.getElementById('list');
const form =  document.getElementById('form');
const description =  document.getElementById('description');
const amount =  document.getElementById('amount');

//Transactions
const dummyTransactions = [
    { id: 1, description: 'Salario', amount: 100000 },
    { id: 2, description: 'Conta de luz', amount: -50000 },
    { id: 3, description: 'Internet', amount: -10000 },
    { id: 4, description: 'Academia', amount: 50000 }
];

let transactions = dummyTransactions;

//ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// New Transaction
function addTransaction(e) {
    e.preventDefault();

    if( description.value.trim() === '' || amount.value.trim() === '' ) {
        alert('Insira um valor!')
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
            };
        
        transactions.push(transaction);

        addTransactionUI(transaction);
        updateSums();

        description.value = '';
        amount.value = '';
    }
}

// Remove a Transaction
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id );
    init();
}

// Transaction History
function addTransactionUI(transaction) {
    // income or expense
    const type = transaction.amount > 0 ? '+' : '-';

    //List Item
    const item = document.createElement('li');

    //list item
    item.classList.add( transaction.amount  > 0 ? 'plus' : 'minus' );

    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

// Function to update the balance, income, and expense summaries
function updateSums() {
    // Create array of transaction amounts from transactions array
    const amounts = transactions.map( transaction => transaction.amount );
    
    // Calculate total value for balance
    const total = amounts
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Calculate total income
    const income = amounts
                    .filter( amount => amount > 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);

    // Calculate total expense
    const expense = amounts
                    .filter( amount => amount < 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Balance 
    balance.innerText = `R$ ${total} `

    // Income 
    money_plus.innerText = `R$ ${income}`

    // Expense
    money_minus.innerText = `R$ ${expense}`
}

//initialize the App
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionUI);
    updateSums();
}


// submit
form.addEventListener('submit', addTransaction);

init();