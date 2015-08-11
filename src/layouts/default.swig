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

        {% block content %}
            <p>This comes from the default layout.</p>
        {% endblock %}

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

        <div data-module="module/Module"></div>

        {% include "sublayouts/document-scripts.swig" %}

{% include "sublayouts/document-foot.swig" %}