//*************************  Календарь 

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
]

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function getById(id) {
    return document.getElementById(id)
}

function getCalendar(id) {
    return document.getElementById(id)
}

let date = new Date()
let curMonth = date.getMonth()
let curYear = date.getFullYear()
const calendarDays = getById('days')

let counter = 0
let allDays = []
let clickedDays = []
let beetweenDays = []
let monthId = 'month'
let daysId = 'days'
let dayTitleId = 'daysTitle'
let nextId = 'next'
let prevId = 'prev'
let hideId = 'hide'
let calendarId = 'calendar'
let okId = 'ok'
let cancelId = 'cancel'
let showCalendar = true

function showCurrMonth() {
    showMonth()
}

function showMonth() {
    getById(monthId).textContent = `${months[curMonth]} ${curYear} `
    let firstDayOfMonth = new Date(curYear, curMonth, 7).getDay()
    let lastDayOfMonth = new Date(curYear, curMonth + 1, 0).getDate()
    let lastDayOfPrevMonth = new Date(curYear, curMonth, 0).getDate()

    for (let i = 1; i <= lastDayOfMonth; i += 1) {
        // добавление предыдущих дней месяца
        if (i === 1) {
            let prevMontsDay = lastDayOfPrevMonth - firstDayOfMonth + 1
            for (let j = 0; j < firstDayOfMonth; j += 1) {
                let day = document.createElement('div')
                day.textContent = prevMontsDay
                day.classList.add('day-title', 'inactive')
                calendarDays.append(day)
                prevMontsDay += 1
            }
        }
        // актуальные дни
        let day = document.createElement('div')
        day.textContent = i
        day.classList.add('day-title')
        day.addEventListener('click', () => {
            paintDay(day)
        })
        allDays.push(day)
        calendarDays.append(day)
        // добавление дней следующего месяца
        if (i === lastDayOfMonth) {
            let remainDays = new Date(curYear, curMonth, i).getDay()
            let counterVar = 1
            for (remainDays; remainDays < 7; remainDays += 1) {
                let day = document.createElement('div')
                day.textContent = counterVar
                day.classList.add('day-title', 'inactive')
                calendarDays.append(day)
                counterVar += 1
            }
        }
    }
}

function paintDay(day) {
    if (counter > 1) {
        counter = 0
        clickedDays.forEach(item => item.style.backgroundColor = 'inherit')
        clickedDays = []
        beetweenDays.forEach(item => item.style.backgroundColor = 'inherit')
        beetweenDays = []
    }
    if (clickedDays.length && +day.textContent < +clickedDays[0].textContent) {
        return
    }
    clickedDays.push(day)
    if (counter === 1) {
        let first = allDays.indexOf(clickedDays[0])
        let last = allDays.indexOf(clickedDays[1])
        beetweenDays = allDays.slice(first + 1, last)
        beetweenDays.forEach(item => item.style.backgroundColor = 'rgb(173, 160, 206)')
    }
    day.style.backgroundColor = 'rgb(91, 77, 127)'
    counter += 1
}

function createCalendar() {
    getById(nextId).addEventListener('click', nextMonth)
    getById(prevId).addEventListener('click', prevMonth)
    let title = getById(dayTitleId)
    daysOfWeek.forEach(item => {
        let day = document.createElement('div')
        day.textContent = item
        day.classList.add('day-title')
        title.append(day)
    })
    showCurrMonth()
}

function nextMonth() {
    if (curMonth === 11) {
        curMonth = 0
        curYear += 1
    } else {
        curMonth += 1
    }
    clearBlock()
    showCurrMonth()
}

function prevMonth() {
    if (curMonth === 0) {
        curMonth = 11
        curYear -= 1
    } else {
        curMonth -= 1
    }
    clearBlock()
    showCurrMonth()
}

function clearBlock() {
    getById(daysId).innerHTML = ''
    getById(dayTitleId).innerHTML = ''
}


getById(hideId).addEventListener('click', () => {
    const calendar = getCalendar(calendarId)
    clearBlock()
    counter = 0
    allDays = []
    clickedDays = []
    beetweenDays = []

    if (showCalendar) {
        createCalendar()
        calendar.style.display = 'block'
    } else {
        calendar.style.display = 'none'
    }
    showCalendar = !showCalendar
})

getById(cancelId).addEventListener('click', () => {
    const calendar = getCalendar(calendarId)
    calendar.style.display = 'none'
    showCalendar = !showCalendar
})

getById(okId).addEventListener('click', () => {
    const contButton = getById(hideId)
    currentMonth = curMonth === 0 ? '01' : curMonth < 9 ? '0' + String(curMonth + 1) : curMonth + 1
    if (clickedDays.length <= 1) {
        contButton.textContent = clickedDays[0].textContent + '.' + currentMonth + '.' + curYear
    }
    else {
        contButton.textContent = clickedDays[0].textContent + '.' + currentMonth + '.' + curYear +
            ' - ' + clickedDays[clickedDays.length - 1].textContent + '.' + currentMonth + '.' + curYear
    }

    const calendar = getCalendar(calendarId)
    calendar.style.display = 'none'
    showCalendar = !showCalendar
})