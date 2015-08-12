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

        {% include "sublayouts/document-scripts.swig" %}

{% include "sublayouts/document-foot.swig" %}