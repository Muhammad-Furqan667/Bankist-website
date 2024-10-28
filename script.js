// Data
const Account1 = {
    owner: 'Muhammad Furqan',
    movements: [200, 300, -400, 500, 600, -700, 800, 900],
    movementsDates: [
    "2024-09-01T21:31:17.178Z",
    "2024-08-24T07:42:02.383Z",
    "2024-08-14T09:15:04.904Z",
    "2024-08-01T10:17:24.185Z",
    "2024-09-05T14:11:59.604Z",
    "2024-09-06T17:01:17.194Z",
    "2024-09-07T23:36:17.929Z",
    "2024-09-08T10:51:36.790Z",
  ],
    intersetRate: 1.2,  // %
    pin: 1111,
    currency: 'EUR',
    locale: 'pan-pa', 
};

const Account2 = {
    owner: 'Muhammad Arslan',
    movements: [200, 450, -400, 300, -650, -130, 70, 1200],
    movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
    intersetRate: 1.5,  // %
    pin: 2222,
    currency: 'USD',
    locale: 'snd-sd',
};

const Account3 = {
    owner: 'Muhammad Usman',
    movements: [200, 450, -400, 300, -650, -130, 70, 1300],
    movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
    intersetRate: 0.7,  // %
    pin: 3333,
    currency: 'PKR',
    locale: 'en-US',
};

const Account4 = {
    owner: 'Abdu haseeb',
    movements: [200, 450, -400, 300, -650, -130, 70, 1400],
    movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
    intersetRate: 1,  // %
    pin: 4444,
    currency: 'IND',
    locale: 'run-ro',
};

const Accounts = [Account1, Account2, Account3, Account4];

// Elements
const labeWellcome = document.querySelector('.welcome');
const labelData = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labeSumIn = document.querySelector('.summary__value--in');
const labeSumOut = document.querySelector('.summary__value--out');
const labeSumInterest= document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containnerApp = document.querySelector('.app');
const containnerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin= document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// displaymovements formating
const date_and_time = function(date, acc){
    const calcdaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1)/(1000 * 60 * 60 * 24));//24 = days  : 1hour = 60min : 60sec = 1min : 1000milli-second = 1sec
    const dayPassed = calcdaysPassed(new Date(), date);

    if(dayPassed === 0) return 'Today';
    if(dayPassed === 1) return 'Yesterday';
    if(dayPassed <= 7) return `${dayPassed} days ago`;
    if(dayPassed >= 7 && dayPassed <= 30) return `${Math.round(dayPassed/7)} weeks ago`;
    else{
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(acc.locale).format(date);
    };  
};

//currency format
const formatcurr = function(value, locale, currency){
        const formatedMovement = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(value);
        return formatedMovement;
};

// Diplaying depoist and withdraw box
const displayMovements = function(acc, sort = false){  
    containnerMovements.innerHTML = ''; 
    
    // Sort
    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach(function(mov, i){
        const type = mov >  0 ? 'deposit' : 'withdrawal';
        const date = new Date(acc.movementsDates[i]);
        // Display date and time
        const displayDate = date_and_time(date, acc);
        // Display currency format
        const curr = formatcurr(mov, acc.locale, acc.currency); 
        // Display container app
        const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${curr}</div>
        </div>`;

        containnerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

// Last line in, out and intersetRate
const calcSummary = function(mov){

    const IN= mov.movements.filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0);
    labeSumIn.textContent = formatcurr(IN, mov.locale, mov.currency);

    const OUT = mov.movements.filter(mov => mov < 0).reduce((acc, curr) => acc + curr, 0);
    labeSumOut.textContent = formatcurr(Math.abs(OUT), mov.locale, mov.currency);

    const interest = mov.movements.filter(mov => mov > 0).map(depoist => (depoist * mov.intersetRate)/100).filter(int => int >= 1).reduce((acc, curr) => acc + curr, 0);
    labeSumInterest.textContent = formatcurr(interest, mov.locale, mov.currency);;
};

// Displaying Total Balance
const calcPrintBalance = function(accs){
    accs.balance = accs.movements.reduce((acc, curr) => acc + curr, 0);
    // labelBalance.textContent = `${accs.balance.toFixed(2)}`;
    labelBalance.textContent = formatcurr(accs.balance, accs.locale, accs.currency);
}

// Adding username in object
const createUsernames = function(user){
    user.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join('');
    });
};
createUsernames(Accounts);
console.log(Accounts);

let currAccount, timer;
// Logout timer
const startLogoutTimer = function(){
    let time = 300;
    const tick = function(){
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        labelTimer.textContent = `${min}:${sec}`;
      if(time === 0){   //Log-out
        clearInterval(timer);
        labeWellcome.textContent = 'Log in to get started';
        containnerApp.style.opacity = 0;
    }
        time--;
}
    tick();
    timer = setInterval(tick, 1000);
    return timer;
};

// Login functionality
btnLogin.addEventListener('click', function(e){
    // Prevent from submitting
    e.preventDefault();

    // Account = Accounts.find(acc => acc.pin === Number(inputLoginPin.value)  && acc.username === inputLoginUsername.value);
    // // // OR // // //
    currAccount = Accounts.find(acc => acc.username === inputLoginUsername.value);
    if(currAccount?.pin === +inputLoginPin.value){

        labeWellcome.textContent = `Wellcome back, ${currAccount.owner.split(' ')[0]}`;
        // Timer again start if exist
        if(timer) clearInterval(timer);
        // Calling logout time
        timer = startLogoutTimer();
        // Updating user-interface
        updateUI();
        containnerApp.style.opacity = '100';

    //     // CREATE CURRENT DATE AND TIME   
    //    const now = new Date();
    //    const day = `${now.getDate()}`.padStart(2, 0);
    //    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    //    const year = now.getFullYear();
    //    const hour = `${now.getHours()}`.padStart(2, 0);
    //    const min = `${now.getMinutes()}`.padStart(2, 0);
    //    labelData.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
          // /// // /// // /// //// //// ........... OR ................... //// //// ///// //// /// 
    // Experimenting API
    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'short',
    };
labelData.textContent = new Intl.DateTimeFormat(currAccount.locale, options).format(now);
};
    inputLoginUsername.value = inputLoginPin.value = '';
});

// Update User-interface
const updateUI  = function(){
        calcPrintBalance(currAccount);
        displayMovements(currAccount);
        calcSummary(currAccount);
}

// Transfering Money to other Accounts
btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    // Trasferig amount
    const Transferamount = Math.floor(inputTransferAmount.value);
    const reciverAcc = Accounts.find(acc => acc.username === inputTransferTo.value);
    if(Transferamount > 0 && currAccount.balance >= Transferamount && reciverAcc?.username !== currAccount.username){
        currAccount.movements.push(-Transferamount);
        reciverAcc.movements.push(Transferamount);

        // current date and time
        currAccount.movementsDates.push(new Date().toISOString());
        reciverAcc.movementsDates.push(new Date().toISOString());
        // Update UI
        updateUI();
        // Time start frombegain
        clearInterval(timer);
        timer = startLogoutTimer();
    }
    inputTransferTo.value = inputTransferAmount.value = '';
});

// Loan functionality
btnLoan.addEventListener('click', function(e){
    e.preventDefault();
    
    // Taking Loan
    const amount = Math.floor(inputLoanAmount.value);
    if(amount > 0 && currAccount.movements.some(mov => mov >= amount)){      //0.1 = 10perc
        // Set time-out like loan will be recived after 2.5sec if condition true
        setTimeout(function(){
            // Reciving amount
           currAccount.movements.push(amount);
           currAccount.movementsDates.push(new Date().toISOString());
        //    Updating UI
           updateUI();
        //    Timer start from begain again
           clearInterval(timer);
           timer = startLogoutTimer();
        }, 2500);  //2.5sec set-time-out
    }
    inputLoanAmount.value = '';
});

// Close account functionality
btnClose.addEventListener('click', function(e){
    e.preventDefault();
    
    // Deleted account
    if(currAccount.username === inputCloseUsername.value && currAccount.pin === +inputClosePin.value){
        const index = Accounts.findIndex(acc => acc.username === currAccount.username);
        Accounts.splice(index, 1);
        containnerApp.style.opacity = 0;
    }
    inputClosePin.value = inputCloseUsername.value = '';
    labeWellcome.textContent = `Log in to get started`;
});

// Sort button property
let sorted = false;
btnSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMovements(currAccount.movements, !sorted);
    sorted = !sorted;
});

// Containner app application
labelBalance.addEventListener('click', function(e){
    e.preventDefault();
[...document.querySelectorAll('.movements__row')].forEach(function(row, i){
    if(i % 2 === 0) row.style.background = 'orangered';
    if(i % 3 === 0) row.style.background = 'blue';
});
});