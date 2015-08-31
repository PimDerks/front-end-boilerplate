{% extends "index.swig" %}

{% block title %}
        {{ component.name }}
{% endblock %}

{% block content %}

        <h1>{{ component.name }}</h1>

        {# Render base #}

        {% for sub in component.sub %}
                {% if sub.name === component.name %}

                        {% set config = { data: sub, heading: 2 } %}
                        {% include "sublayouts/component.swig" with config %}

                {% endif %}
        {% endfor %}

        {# Render variants #}

        {% if component.sub.length > 1 %}
                <section id="component-{{ component.name }}-variants">
                        <h2>Variants of this component</h2>
                        {% for sub in component.sub %}
                                {% if sub.name !== component.name %}
                                        <h3>{{ sub.name }}</h3>
                                        {% set config = { data: sub, heading: 4 } %}
                                        {% include "sublayouts/component.swig" with config %}
                                {% endif %}
                        {% endfor %}
                </section>
        {% endif %}

        {% set data = src.components %}
        {% include "sublayouts/index.swig" with data %}

{% endblock %}
