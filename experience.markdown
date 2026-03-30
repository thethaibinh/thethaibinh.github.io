---
layout: page
title: Experience
permalink: /experience/
---

{% for post in site.categories.experience %}
{% include post-timeline-card.html post=post %}
{% endfor %}
