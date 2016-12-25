<!-- translation strings -->
<div id="project-sub-navigation">
<div style="display:none" id="new-project-string"><?php p($l->t('New project')); ?></div>
<script id="projects-tpl" type="text/x-handlebars-template">
    <li id="new-project"><a href="#"><?php p($l->t('Add project')); ?></a></li>
    {{#each projects}}
        <li class="project with-menu {{#if active}}active{{/if}}" data-id="{{ id }}">
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
<ul></ul>
</div>