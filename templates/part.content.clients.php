<!-- translation strings -->
<div id="client-sub-navigation">
<div style="display:none" id="new-client-string"><?php p($l->t('New client')); ?></div>
<script id="clients-tpl" type="text/x-handlebars-template">
    <li id="new-client"><a href="#"><?php p($l->t('Add client')); ?></a></li>
    {{#each clients}}
        <li class="client with-menu {{#if active}}active{{/if}}" {{#if active}}active{{/if}} data-id="{{ id }}">
            <input class="sub-navigation-entry-edit" type="text" name="{{ name }}" value="{{ name }}" data-id="{{ id }}"/><a href="#" name="{{ name }}" data-id="{{ id }}">{{ name }}</a>
            <div class="sub-navigation-entry-utils">
                <ul>
                    <li class="sub-navigation-entry-utils-menu-button svg"><button></button></li>
                </ul>
            </div>

            <div class="sub-navigation-entry-menu bubble menu">
                <ul>
                    <li data-id="{{ id }}"><a class="menuitem action permanent delete" href="#"><button class="icon-delete svg" title="delete"></button><?php p($l->t('Delete')); ?></a></li><br />
                    <li data-id="{{ id }}"><a class="menuitem action permanent rename" href="#"><button class="icon-rename svg" title="rename"></button><?php p($l->t('Rename')); ?></a></li>
                </ul>
            </div>
        </li>
    {{/each}}
</script>
<ul></ul>
</div>