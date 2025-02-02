---
title: Recipes
permalink: /recipes/
layout: single
---

<ul>
  {% for recipe in site.recipes %}
    <li><a href="{{ recipe.url }}">{{ recipe.title }}</a></li>
  {% endfor %}
</ul> 