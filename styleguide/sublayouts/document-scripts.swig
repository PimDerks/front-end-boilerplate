<!--[if IE 9]>
<script src="/static/js/shim.js"></script>
<![endif]-->
<script src="/static/js/initial.js" data-inline></script>

<script>
    var button = document.querySelector('.iframe-buttons');
    button.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.target.nodeName.toLowerCase() === 'button'){
            var data = e.target.dataset,
                iframe = document.getElementById(data.target);
            iframe.setAttribute('width', data.x);
            iframe.setAttribute('height', data.y);
        }
    });
</script>