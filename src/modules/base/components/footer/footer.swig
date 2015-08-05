------
<div class="c-footer">
    {% for x in data.local %}
        <ul>
            <li>{{ loop.key }}</li>
        </ul>
    {%  endfor %}
</div>
------