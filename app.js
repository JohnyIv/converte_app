var app = (function() {

        var config = {


        };
            console.log(config);
        var ui = {
            body: document.querySelector('body'),
            menu: document.querySelector('#menu'),
            pageTitle: document.querySelector('#page-title'),
            content: document.querySelector('#content')
        };

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
            fetch('./config.json')

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
            document.cookie = "top=0; expires=01/01/2025;";


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
