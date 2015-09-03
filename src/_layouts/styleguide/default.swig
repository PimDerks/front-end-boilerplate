{% include "sublayouts/document-open.swig" %}

    <head>

        {% include "sublayouts/document-head.swig" %}

        <title>
            {% block title %}Page Title{% endblock %} - Styleguide
        </title>

        {% include "sublayouts/document-head-includes.swig" %}

    </head>
    <body class="styleguide">

        <header>
            <h1>
                {% block header %}
                    Page Title
                {% endblock %}
            </h1>
        </header>

        <main>
            {% block content %}
                <p>This comes from the default layout.</p>
            {% endblock %}
        </main>

        {% include "sublayouts/index.swig" %}

        {% include "sublayouts/document-scripts.swig" %}

{% include "sublayouts/document-foot.swig" %}