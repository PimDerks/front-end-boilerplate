{% extends '_layouts/styleguide/default.swig' %}

{% block title %}
        Index
{% endblock %}

{% block content %}
        <section id="prototype">
                <h2>Prototype</h2>
                <p>Overview of the templates in this project.</p>
                <ul>
                        {% for page in pages %}
                                <li>
                                        <a href="{{ page.url }}">{{ page.title }}</a>
                                </li>
                        {% endfor %}
                </ul>
        </section>
        <section id="modules">
                <h2>Modules</h2>
                <p>Overview of the modules and components in this project.</p>
                <ul>
                        {% for page in modules %}
                                <li>
                                        <a href="{{ page.url }}">{{ page.title }}</a>
                                </li>
                        {% endfor %}
                </ul>
        </section>
        <section id="styleguide">
                <h2>Styleguide</h2>
                <p>Overview of the styleguide this project has to adhere to.</p>
                <ul>
                        {% for page in styleguide %}
                                <li>
                                        <a href="{{ page.url }}">{{ page.title }}</a>
                                </li>
                        {% endfor %}
                </ul>
        </section>
{% endblock %}