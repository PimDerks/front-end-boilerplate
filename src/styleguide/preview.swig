{% include "../layouts/sublayouts/document-open.swig" %}

    <head>

        {% include "../layouts/sublayouts/document-head.swig" %}

        <title>
            {% block title %}
                {{ src.name }}
            {% endblock %} - Preview
        </title>

        {% include "../layouts/sublayouts/document-head-includes.swig" %}
        {% include "../layouts/sublayouts/document-head-og-data.swig" %}

    </head>
    <body>

        {% block content %}
            {% set includeURL = '../' + url.replace('src/','') %}
            {% include includeURL %}
        {% endblock %}

        {% include "../layouts/sublayouts/document-scripts.swig" %}

{% include "../layouts/sublayouts/document-foot.swig" %}