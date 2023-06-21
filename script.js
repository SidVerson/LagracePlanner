const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.date'),
    daysContainer = document.querySelector('.days'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    todayBtn = document.querySelector('.today-btn'),
    gotoBtn = document.querySelector('.goto-btn'),
    dateInput = document.querySelector('.date-input'),
    eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector('.event-date'),
    eventsContainer = document.querySelector('.events'),
    addEventBtn = document.querySelector('.add-event'),
    addEventWrapper = document.querySelector('.add-event-wrapper '),
    addEventCloseBtn = document.querySelector('.close '),
    addEventTitle = document.querySelector('.event-name '),
    addEventFrom = document.querySelector('.event-time-from '),
    addEventTo = document.querySelector('.event-time-to '),
    addEventPrice = document.querySelector('.event-price'),
    addEventComment = document.querySelector('.event-comment'),
    addEventSubmit = document.querySelector('.add-event-btn ')
container = document.querySelector('.container')

var contextMenu = document.getElementById('contextMenu')
var deleteButton = document.getElementById('deleteButton')
var editButton = document.getElementById('editButton')
var activateButton = document.getElementById('activateButton')

const editMenu = document.getElementById('editMenu')
const editTitleInput = document.getElementById('editTitleInput')
const editPriceInput = document.getElementById('editPriceInput')
const editCommentInput = document.getElementById('editCommentInput')
const editStartTimeInput = document.getElementById('editStartTimeInput')
const editEndTimeInput = document.getElementById('editEndTimeInput')
const editSaveButton = document.getElementById('editSaveButton')
const editCancelButton = document.getElementById('editCancelButton')

let today = new Date()
let activeDay
let month = today.getMonth()
let year = today.getFullYear()

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

const eventsArr = []
getEvents()
console.log(eventsArr)

// function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const prevLastDay = new Date(year, month, 0)
    const prevDays = prevLastDay.getDate()
    const lastDate = lastDay.getDate()
    const day = ((firstDay.getDay() + 6) % 7) + 1

    const nextDays = 7 - lastDay.getDay() - 1

    date.innerHTML = months[month] + ' ' + year

    let days = ''

    for (let x = day - 1; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`
    }

    for (let i = 1; i <= lastDate; i++) {
        //check if event is present on that day
        let event = false
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                event = true
            }
        })
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            activeDay = i
            getActiveDay(i)
            updateEvents(i)
            if (event) {
                days += `<div class="day today active event">${i}</div>`
            } else {
                days += `<div class="day today active">${i}</div>`
            }
        } else {
            if (event) {
                days += `<div class="day event">${i}</div>`
            } else {
                days += `<div class="day ">${i}</div>`
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`
    }
    daysContainer.innerHTML = days

    addListner()
}

// function to add month and year on prev and next button
function prevMonth() {
    month--
    if (month < 0) {
        month = 11
        year--
    }
    initCalendar()
}

function nextMonth() {
    month++
    if (month > 11) {
        month = 0
        year++
    }
    initCalendar()
}

prev.addEventListener('click', prevMonth)
next.addEventListener('click', nextMonth)

initCalendar()

//function to add active on day
function addListner() {
    const days = document.querySelectorAll('.day')
    days.forEach((day) => {
        day.addEventListener('click', (e) => {
            getActiveDay(e.target.innerHTML)
            updateEvents(Number(e.target.innerHTML))
            activeDay = Number(e.target.innerHTML)
            //remove active
            days.forEach((day) => {
                day.classList.remove('active')
            })
            //if clicked prev-date or next-date switch to that month
            if (e.target.classList.contains('prev-date')) {
                prevMonth()
                //add active to clicked day afte month is change
                setTimeout(() => {
                    //add active where no prev-date or next-date
                    const days = document.querySelectorAll('.day')
                    days.forEach((day) => {
                        if (
                            !day.classList.contains('prev-date') &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add('active')
                        }
                    })
                }, 100)
            } else if (e.target.classList.contains('next-date')) {
                nextMonth()
                //add active to clicked day afte month is changed
                setTimeout(() => {
                    const days = document.querySelectorAll('.day')
                    days.forEach((day) => {
                        if (
                            !day.classList.contains('next-date') &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add('active')
                        }
                    })
                }, 100)
            } else {
                e.target.classList.add('active')
            }
        })
    })
}

todayBtn.addEventListener('click', () => {
    today = new Date()
    month = today.getMonth()
    year = today.getFullYear()
    initCalendar()
})

dateInput.addEventListener('input', (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, '')
    if (dateInput.value.length === 2) {
        dateInput.value += '/'
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7)
    }
    if (e.inputType === 'deleteContentBackward') {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2)
        }
    }
})

gotoBtn.addEventListener('click', gotoDate)

function gotoDate() {
    console.log('here')
    const dateArr = dateInput.value.split('/')
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1
            year = dateArr[1]
            initCalendar()
            return
        }
    }
    alert('Invalid Date')
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
    const day = new Date(year, month, date)
    let dayName = day.toString().split(' ')[0]
    switch (dayName) {
        case 'Mon':
            dayName = 'понедельник'
            break
        case 'Tue':
            dayName = 'вторник'
            break
        case 'Wed':
            dayName = 'среда'
            break
        case 'Thu':
            dayName = 'Четверг'
            break
        case 'Fri':
            dayName = 'пятница'
            break
        case 'Sat':
            dayName = 'суббота'
            break
        case 'Sun':
            dayName = 'воскресенье'
            break
        default:
            dayName = '' // Если значение дня не соответствует ни одному из указанных выше
    }
    eventDay.innerHTML = dayName
    eventDate.innerHTML = date + ' ' + months[month] + ' ' + year
}

//function update events when a day is active
function updateEvents(date) {
    let events = ''
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            event.events.sort((a, b) => {
                const timeA = a.time.split(' - ')[0]
                const timeB = b.time.split(' - ')[0]
                return (
                    new Date('1970/01/01 ' + timeA) -
                    new Date('1970/01/01 ' + timeB)
                )
            })

            event.events.forEach((event) => {
                if (event.confirmed === 'confirmed') {
                    events += `<div class="event active">
                <div class="title">
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.price} BYN</span>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.comment}</span>
                </div>
                
            </div>`
                } else {
                    events += `<div class="event">
                <div class="title">
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
                <div class="event-time" id='event-price'>
                  <span class="event-time">${event.price} BYN</span>
                </div>
                <div class="event-time" id='event-comment'>
                  <span class="event-time">${event.comment}</span>
                </div>
                
            </div>`
                }
            })
        }
    })

    if (events === '') {
        events = `<div class="no-event">
            <h3>Нет записей</h3>
        </div>`
    }

    eventsContainer.innerHTML = events
    saveEvents()
}

//function to add event
addEventBtn.addEventListener('click', () => {
    addEventWrapper.classList.toggle('active')
})

addEventCloseBtn.addEventListener('click', () => {
    addEventWrapper.classList.remove('active')
})

//allow 50 chars in eventtitle
addEventTitle.addEventListener('input', (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60)
})

//allow only time in eventtime from and to
addEventFrom.addEventListener('input', (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '')
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ':'
    }
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5)
    }
})

addEventTo.addEventListener('input', (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '')
    if (addEventTo.value.length === 2) {
        addEventTo.value += ':'
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5)
    }
})

//function to add event to eventsArr
addEventSubmit.addEventListener('click', () => {
    const eventTitle = addEventTitle.value
    const eventTimeFrom = addEventFrom.value
    const eventTimeTo = addEventTo.value
    const eventPrice = addEventPrice.value
    const eventComment = addEventComment.value
    const eventConfirmed = 'aboba'
    if (eventTitle === '' || eventTimeFrom === '' || eventTimeTo === '') {
        alert('Заполнила не все поля')
        return
    }

    //check correct time format 24 hour
    const timeFromArr = eventTimeFrom.split(':')
    const timeToArr = eventTimeTo.split(':')
    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ) {
        alert('Неправильный формат времени')
        return
    }

    const timeFrom = eventTimeFrom
    const timeTo = eventTimeTo

    //check if event is already added
    let eventExist = false
    eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        ) {
            event.events.forEach((event) => {
                if (event.title === eventTitle) {
                    eventExist = true
                }
            })
        }
    })
    if (eventExist) {
        alert('Уже есть такой')
        return
    }
    const newEvent = {
        title: eventTitle,
        time: timeFrom + ' - ' + timeTo,
        price: eventPrice,
        comment: eventComment,
        confirmed: eventConfirmed,
    }
    console.log(newEvent)
    console.log(activeDay)
    let eventAdded = false
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent)
                eventAdded = true
            }
        })
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        })
    }

    console.log(eventsArr)
    addEventWrapper.classList.remove('active')
    addEventTitle.value = ''
    addEventFrom.value = ''
    addEventTo.value = ''
    addEventPrice.value = ''
    addEventComment.value = ''
    updateEvents(activeDay)
    //select active day and add event class if not added
    const activeDayEl = document.querySelector('.day.active')
    if (!activeDayEl.classList.contains('event')) {
        activeDayEl.classList.add('event')
    }
})

//function to save events in local storage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(eventsArr))
}

//function to get events from local storage
function getEvents() {
    //check if events are already saved in local storage then return event else nothing
    if (localStorage.getItem('events') === null) {
        return
    }
    eventsArr.push(...JSON.parse(localStorage.getItem('events')))
}

let eventTitle

// Функция для отображения контекстного меню
function showContextMenu(event) {
    if (event.target.classList.contains('event')) {
        eventTitle = event.target.children[0].children[0].innerHTML
        console.log(event.target)
        console.log(eventTitle)

        const eventToUpdate = eventsArr.find((event) => {
            return (
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
            )
        })

        if (eventToUpdate) {
            const itemToUpdate = eventToUpdate.events.find((item) => {
                return item.title === eventTitle
            })

            if (itemToUpdate) {
                if (itemToUpdate.confirmed === 'confirmed') {
                    activateButton.textContent = 'Убрать'
                } else {
                    activateButton.textContent = 'Подтвердить'
                }
                console.log('Updated:', itemToUpdate)
            }
        }
        editMenu.style.display = 'none'
        contextMenu.style.display = 'flex'
        contextMenu.style.left = event.pageX + 'px'
        contextMenu.style.top = event.pageY - 100 + 'px'

        event.preventDefault()
        event.stopPropagation()
    } else {
        hideContextMenu()
    }
}

// Функция для скрытия контекстного меню
function hideContextMenu() {
    contextMenu.style.display = 'none'
}

// Обработчик события для вызова контекстного меню
eventsContainer.addEventListener('click', showContextMenu)

// Обработчик события для скрытия контекстного меню при клике вне него
document.addEventListener('click', hideContextMenu)

// Обработчики событий для кнопок контекстного меню
deleteButton.addEventListener('click', function () {
    // Действия при нажатии на кнопку "Удалить"
    console.log(eventTitle)
    eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        ) {
            event.events.forEach((item, index) => {
                if (item.title === eventTitle) {
                    event.events.splice(index, 1)
                }
            })
            //if no events left in a day then remove that day from eventsArr
            if (event.events.length === 0) {
                eventsArr.splice(eventsArr.indexOf(event), 1)
                //remove event class from day
                const activeDayEl = document.querySelector('.day.active')
                if (activeDayEl.classList.contains('event')) {
                    activeDayEl.classList.remove('event')
                }
            }
        }
    })
    updateEvents(activeDay)
})

let backdrop
editButton.addEventListener('click', function (event) {
    hideContextMenu()
    // Создание элемента для размытого фона
    backdrop = document.createElement('div')
    backdrop.classList.add('backdrop')
    document.body.appendChild(backdrop)

    // Применение стилей для размытого фона
    backdrop.style.position = 'fixed'
    backdrop.style.top = '0'
    backdrop.style.left = '0'
    backdrop.style.width = '100%'
    backdrop.style.height = '100%'
    backdrop.style.zIndex = '999'
    backdrop.style.backdropFilter = 'blur(5px)'
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    editMenu.style.zIndex = '1000'
    editMenu.style.display = 'block'
    editMenu.style.left = '50%'
    editMenu.style.top = '50%'
    editMenu.style.transform = 'translate(-50%, -50%)'

    const eventToUpdate = eventsArr.find((event) => {
        return (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        )
    })
    if (eventToUpdate) {
        const itemToUpdate = eventToUpdate.events.find((item) => {
            return item.title === eventTitle
        })

        if (itemToUpdate) {
            editTitleInput.value = itemToUpdate.title
            editPriceInput.value = itemToUpdate.price
            editCommentInput.value = itemToUpdate.comment
            // Разделение значения времени на начальное и конечное
            const [startTime, endTime] = itemToUpdate.time.split(' - ')
            editStartTimeInput.value = startTime
            editEndTimeInput.value = endTime
        }
    }
})
// Обработчик события для кнопки сохранения изменений
editSaveButton.addEventListener('click', function () {
    // Получение текущих значений из полей меню редактирования
    const editedTitle = editTitleInput.value
    const editedPrice = editPriceInput.value
    const editedComment = editCommentInput.value
    const editedStartTime = editStartTimeInput.value
    const editedEndTime = editEndTimeInput.value

    // Обновление значений элемента в массиве
    const eventToUpdate = eventsArr.find((event) => {
        return (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        )
    })

    if (eventToUpdate) {
        const itemToUpdate = eventToUpdate.events.find((item) => {
            return item.title === eventTitle
        })

        if (itemToUpdate) {
            itemToUpdate.title = editedTitle
            itemToUpdate.price = editedPrice
            itemToUpdate.comment = editedComment
            itemToUpdate.time = `${editedStartTime} - ${editedEndTime}`
        }
    }

    // Очистка полей меню редактирования
    editTitleInput.value = ''
    editPriceInput.value = ''
    editCommentInput.value = ''
    editStartTimeInput.value = ''
    editEndTimeInput.value = ''

    // Скрытие меню редактирования
    editMenu.style.display = 'none'
    backdrop.remove()

    // Обновление отображения событий
    updateEvents(activeDay)
})

editCancelButton.addEventListener('click', function (event) {
    editMenu.style.display = 'none'
    backdrop.remove()
})

activateButton.addEventListener('click', function () {
    const eventToUpdate = eventsArr.find((event) => {
        return (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        )
    })

    if (eventToUpdate) {
        const itemToUpdate = eventToUpdate.events.find((item) => {
            return item.title === eventTitle
        })

        if (itemToUpdate) {
            if (itemToUpdate.confirmed === 'aboba') {
                itemToUpdate.confirmed = 'confirmed'
                console.log('Updated:', itemToUpdate)
            } else if (itemToUpdate.confirmed === 'confirmed') {
                itemToUpdate.confirmed = 'aboba'
                console.log('Updated:', itemToUpdate)
            }
        }
    }

    updateEvents(activeDay)
})

var rd = new Rolldate({
    el: '#timeTo',
    format: 'hh:mm',
    lang: {
        title: 'Выбери время',
        cancel: 'Отмена',
        confirm: 'Подтвердить',
        year: '',
        month: '',
        day: '',
        hour: ' часов',
        min: ' минут',
        sec: '',
    },
})
var rd = new Rolldate({
    el: '#timePast',
    format: 'hh:mm',
    lang: {
        title: 'Выбери время',
        cancel: 'Отмена',
        confirm: 'Подтвердить',
        year: '',
        month: '',
        day: '',
        hour: ' часов',
        min: ' минут',
        sec: '',
    },
})

var rd = new Rolldate({
    el: '#editStartTimeInput',
    format: 'hh:mm',
    lang: {
        title: 'Выбери время',
        cancel: 'Отмена',
        confirm: 'Подтвердить',
        year: '',
        month: '',
        day: '',
        hour: ' часов',
        min: ' минут',
        sec: '',
    },
})

var rd = new Rolldate({
    el: '#editEndTimeInput',
    format: 'hh:mm',
    lang: {
        title: 'Выбери время',
        cancel: 'Отмена',
        confirm: 'Подтвердить',
        year: '',
        month: '',
        day: '',
        hour: ' часов',
        min: ' минут',
        sec: '',
    },
})
