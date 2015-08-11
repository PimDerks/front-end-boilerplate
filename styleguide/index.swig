<!DOCTYPE html>
<html>
        <head>
                <title>Styleguide</title>
                <style>
                        h1,
                        h2,
                        h3,
                        h4,
                        h5,
                        h6 {
                                font-size: 1em;
                        }

                        h1 { background: rgba(255,0,0,1); }
                        h2 { background: rgba(255,0,0,.83333); margin-left: 2em; }
                        h3 { background: rgba(255,0,0,.66666); margin-left: 4em; }
                        h4 { background: rgba(255,0,0,.49999); margin-left: 6em; }
                        h5 { background: rgba(255,0,0,.33333); margin-left: 8em; }
                        h6 { background: rgba(255,0,0,.16666); margin-left: 10em; }

                        .hierarchy dt,
                        .hierarchy dd {
                                display: inline;
                                margin: 0;
                        }

                        .hierarchy dd::before {
                                content: '/';
                        }

                        .hierarchy dd:first-child::before {
                                display: none;
                        }

                        .hierarchy dt {
                                display: none;
                        }


                </style>
        </head>
        <body>
                <h1>Styleguide</h1>

                <nav>
                        <h2>Index</h2>
                        <ul>
                                <li>
                                        <a href="#objects">Objects</a>
                                </li>
                                <li>
                                        <a href="#components">Components</a>
                                        <ul>
                                                {% for component in components %}
                                                        <li>
                                                                <a href="#component-{{ loop.index }}">{{ component.name }}</a>
                                                                {% set index = loop.index %}
                                                                {% if component.sub.length > 1 %}
                                                                        <ul>
                                                                        {% for sub in component.sub %}
                                                                                {% if sub.name !== component.name %}
                                                                                <li>
                                                                                        <a href="#component-{{ index }}-{{ loop.index }}">{{ sub.name }}</a>
                                                                                </li>
                                                                                {% endif %}
                                                                        {% endfor %}
                                                                        </ul>
                                                                {% endif %}
                                                        </li>
                                                {% endfor %}
                                        </ul>
                                </li>
                                <li>
                                        <a href="#modules">Modules</a>
                                </li>
                        </ul>
                </nav>


                <section id="objects">
                        <h2>Objects</h2>
                </section>

                <section id="components">
                <h2>Components</h2>
                {% for component in components %}

                        <section id="component-{{ loop.index }}">
                                <h3>{{ component.name }}</h3>

                                {# Render base #}

                                {% for sub in component.sub %}
                                        {% if sub.name === component.name %}

                                                {% set config = { data: sub, heading: 4, postfix: loop.index } %}
                                                {% include "test.swig" with config %}

                                        {% endif %}
                                {% endfor %}

                                {# Render variants #}

                                {% set index = loop.index %}

                                {% if component.sub.length > 1 %}
                                        <section id="component-{{ loop.index }}">
                                                <h4>Varianten</h4>
                                                {% for sub in component.sub %}
                                                        {% if sub.name !== component.name %}
                                                                {% set config = { data: sub, heading: 6, postfix: index + '-' + loop.index } %}
                                                                <h5>{{ sub.name }}</h5>
                                                                {% include "test.swig" with config %}
                                                        {% endif %}
                                                {% endfor %}
                                        </section>
                                {% endif %}

                        </section>

                {% endfor %}
                </section>

                <section id="modules">
                        <h2>Modules</h2>
                </section>

        </body>
</html>
