﻿{% extends '../layouts/default.swig' %}

{% block content %}

        <section id="prototype">
                <h2>Prototype</h2>
                <ul>
                        {% for page in data.prototype %}
                                <li>
                                        <a href="{{ page.url }}">{{ page.title }}</a>
                                </li>
                        {% endfor %}
                </ul>
        </section>
        <section id="components">
                <h2>Components</h2>
                <ul>
                        {% for component in data.components %}
                                <li>
                                        <a href="{{ component.url }}">{{ component.title }}</a>
                                </li>
                        {% endfor %}
                </ul>
        </section>
        <section id="modules">
                <h2>Modules</h2>
                <ul>
                        {% for module in data.modules %}
                                <li>
                                        <a href="{{ module.url }}">{{ module.title }}</a>
                                </li>
                        {% endfor %}
                </ul>
        </section>
        <section id="styleguide">
                <h2>Styleguide</h2>
                <ul>
                        {% for styleguide in data.styleguides %}
                                <li>
                                        <a href="{{ styleguide.url }}">{{ styleguide.title }}</a>
                                </li>
                        {% endfor %}
                </ul>
        </section>

{% endblock %}