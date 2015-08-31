---
title: Page
---

﻿{% extends '../../_layouts/prototype/inherited.swig' %}

{% block title %}
    Page
{% endblock title %}

{% block content %}
    {% parent %}
    <p>This comes from the page.</p>
{% endblock %}
