---
title: Forms
---

﻿{% extends '../_layouts/styleguide/default.swig' %}

{% set title = 'Forms' %}

{% block title %}
    {{ title }}
{% endblock title %}

{% block header %}
    {{ title }}
{% endblock header %}

{% block content %}

    <form action=".">
        <div>
            <input type="hidden" name="hidden field" value="42"/>
            This is a form containing various fields (with some initial
            values (defaults) set, so that you can see how input text looks
            like without actually typing it):</div>
        <ul>
            <li><label for="zname">Name</label><input type="text" class="classed" required="" placeholder=" Name" id="zname"></li>
            <li><label for="zemail">Email</label><input type="email" class="classed" multiple="" placeholder="email addresses" required="" id="zemail"></li>
            <li><label for="zdob">Birthday</label><input type="date" class="classed" required="" id="zdob"></li>
            <li><label for="zage">Age</label><input type="number" class="classed" required="" min="21" max="105" id="zage"></li>
            <li><label for="zphone">Phone</label><input type="tel" class="classed" pattern="\d{3}-\d{3}-\d{4}" placeholder="XXX-XXX-XXXX" id="zphone"></li>
            <li><label for="zrange">Satisfaction</label><input type="range" id="zrange" min="0" max="10" step="1" list="zrangelist">

                <datalist id="zrangelist">
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </datalist>
            </li><li><label for="ztweet">Twitter</label><input type="text" class="classed" pattern="@\w*" placeholder="@twitter" required="" id="ztweet"></li>
            <li>
                <input type="submit" value="submit"></li>
        </ul>

        <div><label for="but">Button:
                <button id="but" type="submit" name="foo" value="bar">A cool<br>button</button></label></div>

        <div><label for="f0">Reset button:
                <input id="f0" type="reset" name="reset" value="Reset"></label></div>

        <div><label for="f1">Single-line text input field: <input id="f1" name="text" size="20" value="Default text."></label></div>

        <div><label for="f2">Multi-line text input field (textarea):</label><br>
<textarea id="f2" name="textarea" rows="2" cols="20">
Default text.
</textarea></div>

        <div>The following two radio buttons are inside
            a <code>fieldset</code> element with a <code>legend</code>:</div>

        <fieldset>
            <legend>Legend</legend>
            <div><label for="f3"><input id="f3" type="radio" name="radio" value="1"> Radio button 1</label></div>
            <div><label for="f4"><input id="f4" type="radio" name="radio" value="2" checked> Radio button 2 (initially checked)</label></div>
        </fieldset>

        <fieldset>
            <legend>Check those that apply</legend>
            <div><label for="f5"><input id="f5" type="checkbox" name="checkbox"> Checkbox 1</label></div>
            <div><label for="f6"><input id="f6" type="checkbox" name="checkbox2" checked> Checkbox 2 (initially checked)</label></div>
        </fieldset>

        <div><label for="f10">A <code>select</code> element with <code>size="1"</code>
                (dropdown box):
                <select id="f10" name="select1" size="1">
                    <option>one</option>
                    <option selected>two (default)</option>
                    <option>three</option>
                </select></label></div>

        <div><label for="f11">A <code>select</code> element with <code>size="3"</code>
                (listbox):</label><br>
            <select id="f11" name="select2" size="3">
                <option>one</option>
                <option selected>two (default)</option>
                <option>three</option>
            </select></div>
        <div><label for="f99">Submit button:
                <input id="f99" type="submit" name="submit" value="Just a test"></label></div>
    </form>

{% endblock %}

