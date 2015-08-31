<nav>
    <h2>Components Index</h2>
    <ul>
        {% for component in data %}
            <li><a href="/styleguide/components/{{ component.name }}.html">{{ component.name }}</a></li>
        {% endfor %}
    </ul>
</nav>