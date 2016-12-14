<!-- translation strings -->
<div style="display:none" id="new-client-string"><?php p($l->t('New client')); ?></div>
<script id="clients-tpl" type="text/x-handlebars-template">
    <li id="new-client"><a href="#"><?php p($l->t('Add client')); ?></a></li>
    {{#each clients}}
        <li class="client with-menu {{#if active}}active{{/if}}"  data-id="{{ id }}">
            <a href="#">{{ name }}</a>
            <div class="sub-navigation-entry-utils">
                <ul>
                    <li class="sub-navigation-entry-utils-menu-button svg"><button></button></li>
                </ul>
            </div>

            <div class="sub-navigation-entry-menu">
                <ul>
                    <li><button class="delete icon-delete svg" title="delete"></button></li>
                </ul>
            </div>
        </li>
    {{/each}}
</script>
<div id="sub-navigation"></div>