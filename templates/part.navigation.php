<ul>
	<li><a href="#">First level entry</a></li>
	<li>
		<a href="#">First level container</a>
		<ul>
			<li><a href="#">Second level entry</a></li>
			<li><a href="#">Second level entry</a></li>
		</ul>
	</li>
</ul>
<!-- translation strings -->
<div style="display:none" id="new-note-string"><?php p($l->t('New note')); ?></div>
<<<<<<< HEAD
    <li id="new-note"><a href="#"><?php p($l->t('Add note')); ?></a></li>
<ul></ul>
=======

<script id="navigation-tpl" type="text/x-handlebars-template">
    <li id="new-note"><a href="#"><?php p($l->t('Add note')); ?></a></li>
    {{#each notes}}
        <li class="note with-menu {{#if active}}active{{/if}}"  data-id="{{ id }}">
            <a href="#">{{ title }}</a>
            <div class="app-navigation-entry-utils">
                <ul>
                    <li class="app-navigation-entry-utils-menu-button svg"><button></button></li>
                </ul>
            </div>

            <div class="app-navigation-entry-menu">
                <ul>
                    <li><button class="delete icon-delete svg" title="delete"></button></li>
                </ul>
            </div>
        </li>
    {{/each}}
</script>

<ul></ul>

>>>>>>> parent of 543a847... changed content style
