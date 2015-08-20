{% include "sublayouts/document-open.swig" %}

    <head>

        {% include "sublayouts/document-head.swig" %}

        <title>
            {% block title %}
                Default title
            {% endblock %} - {{ data.settings.project }}
        </title>

        {% include "sublayouts/document-head-includes.swig" %}
        {% include "sublayouts/document-head-og-data.swig" %}

    </head>
    <body class="baseline">

        {% include "../modules/base/components/Header/Header.html" %}


        {% block content %}
            <p>This comes from the default layout.</p>
        {% endblock %}

        <!-- DEBUG -->
        <a href="#" id="toggle-baseline" style="position: fixed; bottom: 0; right: 0; color: white; padding: .75em; background: black; z-index: 10000;">Toggle Baseline</a>
        <script>
            document.getElementById('toggle-baseline').addEventListener('click', function(){
               document.body.classList.toggle('baseline');
            });
        </script>
        <!-- /DEBUG -->

        {% include "sublayouts/document-scripts.swig" %}

{% include "sublayouts/document-foot.swig" %}