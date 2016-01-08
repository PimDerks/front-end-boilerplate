define('config', function () {


    requirejs.config({
        "baseUrl": '/prototype/static/js/'
    });

    var port = ':3005',
        api = window.location.protocol + '//' + window.location.hostname + port,
        format = {
            //"date": 'DD-MM-YYYY',
            "language": 'nl',
            "money": '0,0.00',
            "numeral": {
                "language": 'nl',
                "config": {
                    delimiters: {
                        thousands: '.',
                        decimal: ','
                    },
                    abbreviations: {
                        thousand: "k",
                        million: " mln",
                        billion: " mld",
                        trillion: " bln"
                    },
                    ordinal: function (a) {
                        var b = a % 100;
                        return 0 !== a && 1 >= b || 8 === b || b >= 20 ? "ste" : "de"
                    },
                    currency: {
                        symbol: '€'
                    }
                }
            },
            "interest": "0,00"
            //"datetime": 'DD-MM-YYYY hh:mm',
            //"valutaIcon" : "€"
        };

    var conf = {
        "paths": {
            "monitors" :'base/vendor/conditioner/monitors/',
            "conditioner" : 'base/vendor/conditioner/conditioner'
         },
        "modules" : {

        }
    };

    return conf;

});
