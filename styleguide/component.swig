{% extends "index.swig" %}

{% block title %}
        {{ component.name }}
{% endblock %}

{% block content %}

        <h1>{{ component.name }}</h1>

        <h2>General information</h2>

        {# Render base #}

        {% for sub in component.sub %}
                {% if sub.name === component.name %}

                        {% set config = { data: sub, heading: 4, postfix: loop.index } %}
                        {% include "sublayouts/component.swig" with config %}

                {% endif %}
        {% endfor %}

        {# Render variants #}

        {% set index = loop.index %}

        {% if component.sub.length > 1 %}
                <section>
                        <h2>Varianten</h2>
                        {% for sub in component.sub %}
                                {% if sub.name !== component.name %}
                                        {% set config = { data: sub, heading: 6, postfix: index + '-' + loop.index } %}
                                        <h5>{{ sub.name }}</h5>
                                        {% include "sublayouts/component.swig" with config %}
                                {% endif %}
                        {% endfor %}
                </section>
        {% endif %}

        {% set data = src.components %}
        {% include "sublayouts/index.swig" with data %}

{% endblock %}
