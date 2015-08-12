{% set heading = 'h' + config.heading %}
{% set subheadingLevel = config.heading + 1 %}
{% set subheading = 'h' + subheadingLevel %}

{# Location of this component in the project. #}
<{{ heading }}>Location</{{ heading }}>
<dl class="hierarchy">
    <dt>Module</dt>
    <dd>{{ config.data.hierarchy.module }}</dd>
    <dt>Component</dt>
    <dd>{{ config.data.hierarchy.component }}</dd>
    {% if config.data.hierarchy.subcomponent !== config.data.hierarchy.component && config.data.hierarchy.subcomponent %}
    <dt>Submodule</dt>
    <dd>{{ config.data.hierarchy.subcomponent }}</dd>
    {% endif %}
</dl>

{# Preview of this component #}
<{{ heading }}>Preview</{{ heading }}>
{% set breakpoints = [{name:"Mobile Portrait", x:320,y:480}, {name:"Mobile Landscape", x:480,y:320}, {name:"Tablet Portrait", x:768,y:1024}, {name:"Tablet Landscape", x:1024,y:768}, {name:"Widescreen Landscape", x:1280,y:880}] %}
<div class="iframe-buttons">
    {% for breakpoint in breakpoints %}
        <button class="iframe-button" data-target="iframe-preview-{{ data.name }}" data-x="{{ breakpoint.x }}" data-y="{{ breakpoint.y }}">{{ breakpoint.name }}({{ breakpoint.x }} x {{ breakpoint.y }})</button>
    {% endfor %}
</div><br />
<iframe id="iframe-preview-{{ data.name }}" src="/styleguide/preview/{{ component.name }}/{{ data.name }}.html" width="{{ breakpoints[0].x }}" height="{{ breakpoints[0].y }}"></iframe>

{# Documentation of this component. #}

{% if config.data.doc %}
    <{{ heading }}>Documentation</{{ heading }}>
    {% marked %}{{ config.data.doc.contents }}{% endmarked %}
{% endif %}

{# Code for this component #}
{% if config.data.code.css.length > 0 || config.data.code.js.length > 0 || config.data.code.html.length > 0 %}
    <{{ heading }}>Code</{{ heading }}>

    {% if config.data.code.html.length > 0 %}
        <{{ subheading }}><abbr title="HyperText Markup Language">HTML</abbr></{{ subheading }}>
        <p>Hier komen de contents van de HTML dependencies:</p>
         <ul>
            {% for dep in config.data.code.html %}
    <li>
        {{ dep.name }}
        <pre><code>{{ dep.contents }}</code></pre>
    </li>
{% endfor %}
        </ul>
    {% endif %}

    {% if config.data.code.css.length > 0 %}
        <{{ subheading }}><abbr title="Cascading StyleSheets">CSS</abbr>/<abbr title="Syntactically Awesome Stylesheets">SASS</abbr></{{ subheading }}>
        <p>Hier komen de contents van de CSS dependencies.</p>
        <ul>
            {% for dep in config.data.code.css %}
    <li>
        {{ dep.name }}
        <pre><code>{{ dep.contents }}</code></pre>
    </li>
{% endfor %}
        </ul>
    {% endif %}

    {% if config.data.code.js.length > 0 %}
        <{{ subheading }}><abbr title="JavaScript">JS</abbr></{{ subheading }}>
        <p>Hier komen de contents van de JavaScript dependencies.</p>
        <ul>
            {% for dep in config.data.code.js %}
    <li>
        {{ dep.name }}
        <pre><code>{{ dep.contents }}</code></pre>
    </li>
{% endfor %}
        </ul>
    {% endif %}

{% endif %}

{# Expected data for rendering this component. #}

{% if config.data.data %}
    <{{ heading }}>Data</{{ heading }}>
    <p>{{ config.data.data.name }}</p>
<pre><code>{{ config.data.data.contents }}</code></pre>
{% endif %}
