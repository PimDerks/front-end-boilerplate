<html>
    <head>
        <title>Blaat.</title>
    </head>
    <body>
        <p>Template</p>

        {% block content %}
            Placeholder for content.
        {% endblock %}

        <h1>Data</h1>

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

        <p>Template</p>

    </body>
</html>