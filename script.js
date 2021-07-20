// Элемент для вывода евро
const EURviuw = document.querySelector('.eur')
// Элемент для вывода доллара
const USDviuw = document.querySelector('.usd')

// Объект валют
const valute = {
    EUR: "",
    USD: ""
}

// Делаем GET запрос на сервер
axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
    .then((res) => { // Получаем результат
        // Берём евро
        valute.EUR = res.data.Valute.EUR.Value
        // Берём доллар
        valute.USD = res.data.Valute.USD.Value
        // Выводим евро
        EURviuw.textContent = valute.EUR
        // Выводим доллар
        USDviuw.textContent = valute.USD
    })
