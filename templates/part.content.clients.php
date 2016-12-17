<!-- translation strings -->
<div id="sub-navigation">
<div style="display:none" id="new-client-string"><?php p($l->t('New client')); ?></div>
<script id="clients-tpl" type="text/x-handlebars-template">
    <li id="new-client"><a href="#"><?php p($l->t('Add client')); ?></a></li>
    {{#each clients}}
        <li class="client with-menu" data-id="{{ id }}">
            <a href="#">{{ name }}</a>
            <div class="sub-navigation-entry-utils">
                <ul>
                    <li class="sub-navigation-entry-utils-menu-button svg"><button></button></li>
                </ul>
            </div>

            <div class="sub-navigation-entry-menu bubble menu">
                <ul>
                    <li><a class="menuitem action permanent" href="#"><span><button class="delete icon-delete svg" title="delete"></button></span><span><?php p($l->t('Delete')); ?></span></a></li><br />
                    <li><a class="menuitem action permanent" href="#"><span><button class="rename icon-rename svg" title="rename"></button></span><?php p($l->t('Rename')); ?></a></li>
                </ul>
            </div>
        </li>
    {{/each}}
</script>
<ul></ul>
</div>
