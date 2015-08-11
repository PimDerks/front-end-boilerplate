<!DOCTYPE html>
<html>
        <head>
                <title>Styleguide</title>
        </head>
        <body>
                <h1>Styleguide</h1>

                <nav>
                        <h2>Index</h2>
                        <h3>Components</h3>
                        <ul>
                                {% for component in components %}
                                        <li>
                                                <a href="#components-{{ loop.index }}">{{ component.name }}</a>
                                        </li>
                                {% endfor %}

                        </ul>
                </nav>


                <section id="components">
                <h2>Componenten</h2>
                {% for component in components %}

                        <section id="components-{{ loop.index }}">
                                <h3>{{ component.name }}</h3

                                <ul>
                                        {% for sub in component.sub %}

                                                {% if sub.name === component.name %}
                                                        <h4>{{ sub.name }} (Base)</h4>
                                                {% else %}
                                                        <h4>{{ sub.name }}</h4>
                                                {% endif %}

                                                <h5>Location</h5>
                                                <dl>
                                                        <dt>Module</dt>
                                                        <dd>{{ sub.hierarchy.module }}</dd>
                                                        <dt>Component</dt>
                                                        <dd>{{ sub.hierarchy.component }}</dd>
                                                        {% if sub.hierarchy.submodule %}
                                                                <dt>Submodule</dt>
                                                                <dd>{{ sub.hierarchy.submodule }}</dd>
                                                        {% endif %}
                                                </dl>

                                                {% if sub.deps.css || sub.deps.js %}
                                                        <h5>Dependencies</h5>
                                                        <dl>
                                                                {% if sub.deps.css %}
                                                                        <dt>CSS</dt>
                                                                        <dd>
                                                                                <ul>
                                                                                        {% for dep in sub.deps.css %}
                                                                                                <li>{{ dep }}</li>
                                                                                        {% endfor %}
                                                                                </ul>
                                                                        </dd>
                                                                {%  endif %}

                                                                {% if sub.deps.css %}
                                                                        <dt>JavaScript</dt>
                                                                        <dd>
                                                                                <ul>
                                                                                        {% for dep in sub.deps.css %}
                                                                                                <li>{{ dep }}</li>
                                                                                        {% endfor %}
                                                                                </ul>
                                                                        </dd>
                                                                {% endif %}
                                                        </dl>
                                                {% endif %}

                                                {% if sub.data %}
                                                        <h5>Data</h5>
                                                        <p>{{ sub.data }}</p>
                                                {% endif %}

                                        {% endfor %}
                                </ul>

                        </section>

                {% endfor %}
                </section>
                <section id="modules">
                        <h2>Modules</h2>
                </section>

        </body>
</html>
