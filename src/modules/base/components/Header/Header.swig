<div class="c-header">
    <ul>
        {% for x in data.local.items %}
            <li>
                <a href="#" class="screenreader screenreader--focusable">{{ x }}</a>
            </li>
        {%  endfor %}
    </ul>
</div>