{% include "../shared/document-open.swig" %}

    <head>

        {% include "../shared/document-head.swig" %}

        <title>
            {% block title %}
                {{ data.fm.title }}
            {% endblock %} - Preview
        </title>

        {% include "../prototype/sublayouts/document-head-includes.swig" %}

    </head>
    <body>

        {% block content %}
            {% autoescape false %}
                {{ previewHTML }}
            {% endautoescape %}
        {% endblock %}

        {% include "../prototype/sublayouts/document-scripts.swig" %}

{% include "../shared/document-foot.swig" %}