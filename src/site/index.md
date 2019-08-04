---
title: Virtual Lollipop
subtitle: We all know someone whi deserves a lolly for being awesome
layout: layouts/base.njk
---


## home

About vlolly site

- [make a new lolly](/create)
- [look up a lolly which is being frozen](/lolly/almost-ready)
- [not a lolly](/lolly/nope)

<hr />

<ul>
{% for lolly in lollies %}
<li><a href="/lolly/{{ lolly.data.lollyPath }}">{{ lolly.data.lollyPath }}</a></li>
{% endfor %}
</ul>
