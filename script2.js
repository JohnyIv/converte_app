const EURviuw = document.querySelector('.eur')
const USDviuw = document.querySelector('.usd')
const CHFviuw = document.querySelector('.chf')
const eurInRub = document.querySelector('.eur-in-rub')
const eurInput = document.querySelector('.eur-input')
const usdInRub = document.querySelector('.usd-in-rub')
const usdInput = document.querySelector('.usd-input')

const valute = {
    EUR: "",
    USD: "",
    CHF: ""
}
fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then(response => response.json())
    .then(data => {
        valute.EUR = data.Valute.EUR.Value
        valute.USD = data.Valute.USD.Value
        valute.CHF = data.Valute.CHF.Value
        EURviuw.textContent = valute.EUR
        USDviuw.textContent = valute.USD})



//
// axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
//     .then((res) => {
//         valute.EUR = res.data.Valute.EUR.Value
//         valute.USD = res.data.Valute.USD.Value
//         EURviuw.textContent = valute.EUR
//         USDviuw.textContent = valute.USD
//     })
//
eurInput.addEventListener('change', () => {
    if (!Number.isInteger(+eurInput.value)) {
        eurInRub.textContent = "Вы ввели не число"
    } else if (eurInput.value === '') {
        eurInRub.textContent = 0
    } else {
        eurInRub.textContent = Math.round(+eurInput.value * valute.EUR) + " Руб"
    }
})

usdInput.addEventListener('change', () => {
    if (!Number.isInteger(+usdInput.value)) {
        usdInRub.textContent = "Вы ввели не число"
    } else if (usdInput.value === '') {
        usdInRub.textContent = 0
    } else {
        usdInRub.textContent = Math.round(+usdInput.value * valute.USD) + " Руб"
    }
})


const btns = document.querySelectorAll('.button');

let btnsFunc = function (){
    for( let btn = 0 ; btn < btns.length ; btn++ ){

        btns[btn].addEventListener('click',function (){
            checkToRemove ()
            btns[btn].classList.add('active')
        })
    }
}
let checkToRemove = function  (){
    for(let btn of btns) {
        if(btn.classList.contains('active')){
            btn.classList.remove('active')
        }
    }
}

btnsFunc()
