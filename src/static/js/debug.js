var debug = function(){

    'use strict';

    /*
     * Insert toggle for baseline.
     */

    var toggle = document.createElement('a');
    toggle.href = '#';
    toggle.setAttribute('style', 'position: fixed; bottom: 0; right: 0; color: white; padding: .75em; background: black; z-index: 10000;');
    toggle.innerHTML = 'Toggle Baseline';
    toggle.addEventListener('click', function(){
        document.body.classList.toggle('baseline');
    });
    document.body.appendChild(toggle);
    document.body.classList.add('baseline');

    /*
     * Count stylesheet lines/selectors.
     */

    function countCSSRules() {
        var results = '',
            log = '';
        if (!document.styleSheets) {
            return;
        }
        for (var i = 0; i < document.styleSheets.length; i++) {
            countSheet(document.styleSheets[i]);
        }
        function countSheet(sheet) {
            var count = 0, countRules = 0;
            if (sheet && sheet.cssRules) {
                for (var j = 0, l = sheet.cssRules.length; j < l; j++) {
                    if (!sheet.cssRules[j].selectorText) {
                        continue;
                    }
                    count += sheet.cssRules[j].selectorText.split(',').length;

                }
                countRules += sheet.cssRules.length;

                log += '\nFile: ' + (sheet.href ? sheet.href : 'inline <style> tag');
                log += '\nRules: ' + sheet.cssRules.length;
                log += '\nSelectors: ' + count;
                log += '\n--------------------------';
                if (count >= 4096) {
                    results += '\n********************************\nWARNING:\n There are ' + count + ' CSS Selectors in the stylesheet ' + sheet.href + ' - IE will ignore the last ' + (count - 4096) + ' selectors!\n';
                } else if (countRules >= 4096) {
                    results += '\n********************************\nWARNING:\n There are ' + countRules + ' CSS rules in the stylesheet ' + sheet.href + ' - IE will ignore the last ' + (countRules - 4096) + ' rules!\n';
                }
            }
        }
        console.log(log);
        console.log(results);
    };

    countCSSRules();

    /*
     * Append debug stylesheet
     */

    loadCSS('/static/css/debug.css');

};

if(window.DEBUG){
    debug();
}
