{% include "../prototype/sublayouts/document-open.swig" %}

    <head>

        {% include "../prototype/sublayouts/document-head.swig" %}

        <title>
            {% block title %}
                {{ src.name }}
            {% endblock %} - Preview
        </title>

        {% include "../prototype/sublayouts/document-head-includes.swig" %}
        {% include "../prototype/sublayouts/document-head-og-data.swig" %}

    </head>
    <body>

        {% block content %}
            {% set includeURL = '../../' + url.replace('src/','') %}
            {% include includeURL %}
        {% endblock %}

        {% include "../prototype/sublayouts/document-scripts.swig" %}

{% include "../prototype/sublayouts/document-foot.swig" %}