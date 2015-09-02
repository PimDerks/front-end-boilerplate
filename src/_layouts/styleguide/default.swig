{% include "sublayouts/document-open.swig" %}

    <head>

        {% include "sublayouts/document-head.swig" %}

        <title>
            {% block title %}
                Default title
            {% endblock %} - Styleguide
        </title>

        {% include "sublayouts/document-head-includes.swig" %}

    </head>
    <body>

        {% block content %}
            <p>This comes from the default layout.</p>
        {% endblock %}

        {% include "sublayouts/document-scripts.swig" %}

{% include "sublayouts/document-foot.swig" %}