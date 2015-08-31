{% include "sublayouts/document-open.swig" %}

<head>

        {% include "sublayouts/document-head.swig" %}

        <title>
                {% block title %}
                        Default title
                {% endblock %} - Components Library
        </title>

        {% include "sublayouts/document-head-includes.swig" %}

</head>
<body>


{% block content %}

        <main>
                <h1>Components Library</h1>
                <p>This comes from the default layout.</p>

        </main>

        {% set data = components %}
        {% include "sublayouts/index.swig" with data %}

{% endblock %}

{% include "sublayouts/document-scripts.swig" %}

{% include "sublayouts/document-foot.swig" %}
