

// ********************* Поле Откуда ******************************************

const cityFromArr = ['Москва', 'Санкт-Петербург', 'Калиниград', 'Пермь', 'Казань', 'Нижний Новгород',
    'Курск', 'Казань', 'Екатеринбург', 'Ростов-на-Дону', 'Краснодар', 'Воронеж', 'Сочи', 'Псков',
    'Самара', 'Великий Новгород', 'Орел', 'Рязань', 'Мурманск', 'Петрозаводск', 'Тула', 'Тверь',
]

const input = document.getElementById('from');
const fromBlock = getById('fromBlock')
let cityTeg = getById('city')

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

input.addEventListener('input', debounce(() => {
    fromBlock.style.display = 'block'

    for (let city of cityFromArr) {
        if (city.toLowerCase().includes(input.value.toLowerCase())) {
            let block = document.createElement('div')
            block.textContent = city
            cityTeg.append(block)
            block.addEventListener('click', () => {
                fullInputField.bind(city)
                fullInputField(city)
            })
        }
    }
}, 1000));

function fullInputField(cityVar) {
    const mainTeg = document.getElementById('from');
    mainTeg.value = cityVar
    fromBlock.style.display = 'none'
    getById('city').innerHTML = ''
}

//**************************** Пассажиры ***********************************

const btn = document.querySelector("#passBtn");
const menu = document.querySelector("#pass");
const selected = document.querySelector("#selected");
const passOk = document.querySelector("#passOk");
let passClass = ''

let show = false;
btn.addEventListener("click", () => {
    if (show) {
        menu.style.display = "none";
        const allPassengers = Object.values(passengers).reduce((acc, item) => acc + item)
        if (allPassengers) {
            selected.textContent = `${allPassengers} пассажиров`
        }

    } else {
        menu.style.display = "block";
    }
    show = !show;
});

menu.addEventListener("click", (e) => {
    e.stopPropagation();
});

const minusBtns = document.querySelectorAll(".minus");
const plusBtns = document.querySelectorAll(".plus");
const counters = document.querySelectorAll(".counter");
const chips = document.querySelectorAll(".chips_item");

const passengers = {
    adult: 0,
    children: 0,
    baby: 0,
};
plusBtns.forEach((btn) => {
    changeCounter(btn, 'plus')
});
minusBtns.forEach((btn) => {
    changeCounter(btn, 'minus')
});

function changeCounter(btn, sign) {
    let plus = true
    if (sign === 'minus') {
        plus = false
    }
    btn.addEventListener("click", () => {
        const id = +btn.dataset.id;
        switch (id) {
            case 0:
                if (!checkPassengers('adult', plus)) return
                plus ? passengers.adult++ : passengers.adult--;
                counters[id].textContent = passengers.adult;
                break;
            case 1:
                if (!checkPassengers('children', plus)) return
                plus ? passengers.children++ : passengers.children--;
                counters[id].textContent = passengers.children;
                break;
            case 2:
                if (!checkPassengers('baby', plus)) return
                plus ? passengers.baby++ : passengers.baby--;
                counters[id].textContent = passengers.baby;
                break;
            default:
                break;
        }
    });
}

function checkPassengers(key, plus) {
    if (passengers[key] === 0 && !plus) {
        return false
    }
    const allPassengers = Object.values(passengers).reduce((acc, item) => acc + item)
    if (allPassengers >= 9 && plus) {
        return alert('Не более 9 пассажиров')
    }
    return true
}

chips.forEach((btn) => {
    checkClass(btn)
});

function checkClass(btn) {
    btn.addEventListener("click", () => {
        btn.style.backgroundColor = '#ff4d4d';
        btn.style.color = 'white';
        passClass = btn.textContent;
    })
}

passOk.addEventListener("click", () => {
    const allPassengers = Object.values(passengers).reduce((acc, item) => acc + item)
    let result = document.querySelector("#passBtn");
    result.textContent = allPassengers + ' пассажиров, ' + passClass;
    menu.style.display = "none";
    show = !show;
});

// ************************** По кнопке Найти выводим данные в консоль *************

const search = document.querySelector("#search");
const fromVar = document.getElementById('from');
const to = document.getElementById('to');
const dates = document.getElementById('hide');
const howPass = document.getElementById('passBtn')

search.addEventListener("click", () => {
    console.log('Город вылета: ' + fromVar.value + ', ' + ' Город назначения: ' + to.value + ', ' + ' Даты вылета - прилета: ' + dates.textContent +
        ', ' + ' Пассажиры, класс: ' + howPass.textContent
    )
})


