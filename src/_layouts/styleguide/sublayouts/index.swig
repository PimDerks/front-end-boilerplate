<nav>
    <h2>Styleguide Index</h2>
    <ul>
        {% for page in pages %}
            <li>
                <a href="{{ page.url }}">{{ page.fm.title }}</a>
            </li>
        {% endfor %}
    </ul>
</nav>







