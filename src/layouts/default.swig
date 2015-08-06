<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#">
    <head>
        <meta charset="utf-8" content=""/>
        <title>Blaat.</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/static/img/icons/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/static/img/icons/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/static/img/icons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/static/img/icons/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/static/img/icons/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/static/img/icons/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/static/img/icons/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/static/img/icons/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/static/img/icons/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" href="/static/img/icons/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/static/img/icons/favicon-194x194.png" sizes="194x194">
        <link rel="icon" type="image/png" href="/static/img/icons/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/static/img/icons/android-chrome-192x192.png" sizes="192x192">
        <link rel="icon" type="image/png" href="/static/img/icons/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/static/img/icons/manifest.json">
        <link rel="shortcut icon" href="/static/img/icons/favicon.ico">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="msapplication-TileImage" content="/static/img/icons/mstile-144x144.png">
        <meta name="msapplication-config" content="/static/img/icons/browserconfig.xml">
        <meta name="theme-color" content="#ffffff">

        <!-- Open Graph Data -->
        <meta property="og:site_name" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:type" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <!-- /Open Graph Data -->

        <link rel="stylesheet" href="/static/css/screen.css" />
        <style>
            * {
                font-family: Roboto, "Comic Sans MS", serif;
            }
        </style>
    </head>
    <body class="baseline">

        <h1>Masterpage Edit</h1>

        <p>Template</p>

        <p>{% block content %}
            Placeholder for content.
        {% endblock %}</p>

        <h1>Data</h1>

        {% include "../modules/base/components/Component/Component.html" %}

        {% for x in data %}
            <ul>
                <li>{{ loop.key }}
                    <ul>
                    {% for y in x %}
                        <li>{{ y }}</li>
                    {% endfor %}
                    </ul>
                </li>
            </ul>
        {%  endfor %}

        <p>Template.</p>
        <section>Blaat</section>

        <div data-module="module/Module"></div>

        <!--[if IE 9]>
            <script src="/static/js/shim.js"></script>
        <![endif]-->
        <script src="/static/js/initial.js" inline></script>
    </body>
</html>