{% include "../src/layouts/sublayouts/document-open.swig" %}

    <head>

        {% include "../src/layouts/sublayouts/document-head.swig" %}

        <title>
            {% block title %}
                {{ src.name }}
            {% endblock %} - Preview
        </title>

        {% include "../src/layouts/sublayouts/document-head-includes.swig" %}
        {% include "../src/layouts/sublayouts/document-head-og-data.swig" %}

    </head>
    <body>

        {% block content %}
            {% set includeURL = '../' + url %}
            {% include includeURL %}
        {% endblock %}

        {% include "../src/layouts/sublayouts/document-scripts.swig" %}

{% include "../src/layouts/sublayouts/document-foot.swig" %}