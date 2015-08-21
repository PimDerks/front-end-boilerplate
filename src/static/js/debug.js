var debug = function(){

    'use strict';

    // baseline
    var toggle = document.createElement('a');
    toggle.href = '#';
    toggle.setAttribute('style', 'position: fixed; bottom: 0; right: 0; color: white; padding: .75em; background: black; z-index: 10000;');
    toggle.innerHTML = 'Toggle Baseline';
    toggle.addEventListener('click', function(){
        document.body.classList.toggle('baseline');
    });
    document.body.appendChild(toggle);
    document.body.classList.add('baseline');

    // append debug stylesheet
    loadCSS('/static/css/debug.css');

};

if(window.DEBUG){
    debug();
}
