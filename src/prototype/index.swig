---
title: Index
---

﻿{% extends '../_layouts/prototype/default.swig' %}

{% block title %}
        Index
{% endblock title %}

{% block content %}

        <section>

                <div data-module="./base/components/Component/js/Component" data-conditions="media:{(min-width:40em)} and element:{was visible}"></div>

                {% set classes = ['xsmall', 'small', 'base', 'epsilon', 'delta', 'gamma', 'beta', 'alpha'] %}
                {% set elements = ['small', 'small', 'p', 'h5', 'h4', 'h3', 'h2', 'h1'] %}
                {% for className in classes %}
                        {% if loop.index == 1 %}
                                <{{ elements[loop.index-1] }} class="{{ classes[loop.index-1] }}">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</{{ elements[loop.index-1] }}>
                        {%  else  %}
                                <{{ elements[loop.index-1] }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</{{ elements[loop.index-1] }}>
                        {%  endif %}
                {% endfor %}

        </section>

{% endblock %}