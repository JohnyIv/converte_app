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
                ui.menu.querySelector(".active").classList.remove('active');
                ui.menu.querySelector('a[data-menu="' + menu + '"]').classList.add('active');

                response.text().then(function(text) {
                    ui.pageTitle.textContent = pageTitle;

                    ui.content.innerHTML = text;
                    if(url == "/currency.html"){
                        coockyCheck()
                        var EURviuw = content.querySelector('.eur')
                        var USDviuw = content.querySelector('.usd')
                        var CNYviuw = content.querySelector('.cny')
                        EURviuw.textContent = valute.EUR
                        USDviuw.textContent = valute.USD
                        CNYviuw.textContent = valute.CNY
                        
                        function toTop () {
                            let btns = content.querySelector('.valute')

                            btns.addEventListener('click', function(e) {
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
            let wrapper = content.querySelector('.valute')
            if (content.querySelector('.valute') && document.cookie.split(';').filter((item) => item.includes('top=cny')).length) {
                let changeCoocky = content.querySelector('.cny-item')
                wrapper.prepend(changeCoocky)
            }else if (content.querySelector('.valute') && document.cookie.split(';').filter((item) => item.includes('top=usd')).length) {
                let changeCoocky = content.querySelector('.usd-item')
                wrapper.prepend(changeCoocky)
            }else if (content.querySelector('.valute') && document.cookie.split(';').filter((item) => item.includes('top=eur')).length) {
                let changeCoocky = content.querySelector('.eur-item')
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
    })();

// Запуск приложения
app.init()
    // .init;
