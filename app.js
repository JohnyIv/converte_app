var app = (function() {

        var config = {};

            console.log(config);
        var ui = {
            body: document.querySelector('body'),
            menu: document.querySelector('#menu'),
            pageTitle: document.querySelector('#page-title'),
            content: document.querySelector('#content')
        };
        
        

        var valute = {
            EUR: "",
            USD: "",
            CNY: ""
        }
        let changeToValute = valute.USD

        fetch("https://www.cbr-xml-daily.ru/daily_json.js")
            .then(response => response.json())
            .then(data => {
            valute.EUR = data.Valute.EUR.Value
            valute.USD = data.Valute.USD.Value
            valute.CNY = data.Valute.CNY.Value})



        function _loadPage(page) {
            
            console.log(page)
            var url = "/" + page + '.html',
                pageTitle = config.pages[page].title,
                menu = config.pages[page].menu;

            // $m.get(url, function(html) {
            //     document.title = pageTitle + ' | ' + config.siteTitle;
            //     ui.$menu.find('a').removeClass('active');
            //     ui.$menu.find('a[data-menu="' + menu + '"]').addClass('active');
            //     ui.$pageTitle.html(pageTitle);
            //     ui.$content.html(html);
            // });

            fetch(url).then(function(response) {

                document.title = pageTitle + ' | ' + config.siteTitle;
                if(ui.menu.contains(ui.menu.querySelector('.active'))){
                    ui.menu.querySelector(".active").classList.remove('active');
                }
                ui.menu.querySelector('a[data-menu="' + menu + '"]').classList.add('active');

                response.text().then(function(text) {
                    ui.pageTitle.textContent = pageTitle;

                    ui.content.innerHTML = text;
                    if(url == "/currency.html"){
                        coockyCheck()
                        var EURviuw = document.querySelector('.eur')
                        var USDviuw = document.querySelector('.usd')
                        var CNYviuw = document.querySelector('.cny')
                        EURviuw.textContent = valute.EUR
                        USDviuw.textContent = valute.USD
                        CNYviuw.textContent = valute.CNY
                        
                        function toTop () {
                            var btns = document.querySelector('.valute')

                            btns.addEventListener('click', function(e) {
                                e.stopPropagation();
                                if(e.target.getAttribute("class") === "btn-cny") {
                                    console.log(e.target.parentNode) 
                                    let change = e.target.parentNode
                                    btns.prepend(change)
                                    document.cookie = "top=cny; max-age=43200"
                                }else if(e.target.getAttribute("class") === "btn-usd") {
                                    console.log(e.target.parentNode) 
                                    let change = e.target.parentNode
                                    btns.prepend(change)
                                    document.cookie = "top=usd; max-age=43200"
                                }else if(e.target.getAttribute("class") === "btn-eur") {
                                    console.log(e.target.parentNode) 
                                    let change = e.target.parentNode
                                    btns.prepend(change)
                                    document.cookie = "top=eur; max-age=43200"
                                }
                            })
                                    
                                
                        }
                        toTop ()
                    }else if(url =="/converter.html"){
                        console.log("/converter.html")
                        
                        var changeToBtn = document.querySelector(".block-change-to")
                        changeToValute = valute.USD
                        converter()
                        changeToBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            if(e.target.classList.contains(".eur")){
                                changeToValute = valute.EUR
                                console.log(e.target)
                                console.log(changeToValute)
                            }else if(e.target.getAttribute("class") === "cny"){
                                changeToValute = valute.CNY
                                console.log(e.target)
                                console.log(changeToValute)
                            }else if(e.target.getAttribute("class") === "usd"){

                                changeToValute = valute.USD
                                console.log(e.target)
                                console.log(changeToValute)
                            }
                        })
                        
                    }
                });
                
            });
            
        }

        // Клик по ссылке
        function _navigate(e) {
            console.log(e.target.getAttribute("data-link"));
            e.stopPropagation();
            e.preventDefault();
            if(e.target.hasAttribute("data-link") && e.target.getAttribute("data-link") === "ajax"){
                console.log(e.target)
                // e.stopPropagation();
                // e.preventDefault();
                //lthyenm fnhb,en
                var page = e.target.getAttribute('href');

                _loadPage(page);
                history.pushState({page: page}, '', page);
            }

        }

        // Кнопки Назад/Вперед
        function _popState(e) {
            var page = (e.state && e.state.page) || config.mainPage;
            _loadPage(page);
        }

        // Привязка событий
        function _bindHandlers() {
            //выбрать элементы
            ui.body.addEventListener('click',_navigate);
            window.onpopstate = _popState;
            console.log("bind")
        }

        // Старт приложения: привязка событий
        function _start() {
            _bindHandlers();
            console.log("start")
            coockyCheck();
        }

        // Инициализация приложения
        function init() {
            fetch('/config.json')

                .then((response) => {
                    return response.json()

                })
                .then((data)=> {
                    console.log(data);
                    config = JSON.parse(JSON.stringify(data));

                    console.log(config);
                    _start();
                })
                .catch(function(error) {
                        console.log(error);
                    })
        }

        // Загрузка контента по странице---------переписать!!!!


        // Возвращаем наружу
        return {
            init: init
        }

    //
        function coockyCheck() {
            
            console.log(document.cookie)
            // function getCookie(name) {
            //     let matches = document.cookie.match(new RegExp(
            //       "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            //     ));
            //     return matches ? decodeURIComponent(matches[1]) : undefined;
            //   }
            
            if (document.querySelector('.valute') && document.cookie.split(';').filter((item) => item.includes('top=cny')).length) {
                let changeCoocky = document.querySelector('.cny-item')
                let wrapper = document.querySelector('.valute')
                wrapper.prepend(changeCoocky)
            }else if (document.querySelector('.valute') && document.cookie.split(';').filter((item) => item.includes('top=usd')).length) {
                let changeCoocky = document.querySelector('.usd-item')
                let wrapper = document.querySelector('.valute')
                wrapper.prepend(changeCoocky)
            }else if (document.querySelector('.valute') && document.cookie.split(';').filter((item) => item.includes('top=eur')).length) {
                let changeCoocky = document.querySelector('.eur-item')
                let wrapper = document.querySelector('.valute')
                wrapper.prepend(changeCoocky)
            }
        }
    // function getCookie(name) {
    //     let matches = document.cookie.match(new RegExp(
    //         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    //     ));
    //     return matches ? decodeURIComponent(matches[1]) : undefined;
    // }
    console.log(document.cookie)

        function converter (){
            // let inputSumm = document.querySelector('.input-summ')
            // let convertValute = document.querySelector('.summ-to-valute')
            // inputSumm.addEventListener('change',(e) => {
            //     e.stopPropagation();
            //     if(!Number.isInteger(+inputSumm.value)){
            //         convertValute.textContent = "Вы ввели не чмсло"
            //     }else if (inputSumm.value === "") {
            //         convertValute.textContent = 0
            //     }else {
            //         convertValute.textContent = Math.round(+inputSumm.value * changeToValute) + " Руб"
            //     }
            // })


            // const EURviuw = document.querySelector('.eur')
            // const USDviuw = document.querySelector('.usd')
            // const CHFviuw = document.querySelector('.chf')
            const eurInRub = document.querySelector('.eur-in-rub')
            const eurInput = document.querySelector('.eur-input')
            const usdInRub = document.querySelector('.usd-in-rub')
            const usdInput = document.querySelector('.usd-input')
            const cnyInput = document.querySelector('.cny-input')
            const cnyInRub = document.querySelector('.cny-in-rub')
            
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

            cnyInput.addEventListener('change', () => {
                if (!Number.isInteger(+cnyInput.value)) {
                    cnyInRub.textContent = "Вы ввели не число"
                } else if (cnyInput.value === '') {
                    cnyInRub.textContent = 0
                } else {
                    cnyInRub.textContent = Math.round(+cnyInput.value * valute.CNY) + " Руб"
                }
            })





        }

    })();

// Запуск приложения
app.init()
    // .init;
