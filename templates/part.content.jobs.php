<!-- translation strings -->
<div id="job-sub-navigation">
<div style="display:none" id="new-job-string"><?php p($l->t('New job')); ?></div>
<script id="jobs-tpl" type="text/x-handlebars-template">
    <li id="new-job"><a href="#"><?php p($l->t('Add job')); ?></a></li>
    {{#each jobs}}
        <li class="job with-menu {{#if active}}active{{/if}}" data-id="{{ id }}">
            <a href="#">{{ name }}</a>
            <div class="sub-navigation-entry-utils">
                <ul>
                    <li class="sub-navigation-entry-utils-menu-button svg"><button></button></li>
                </ul>
            </div>

            <div class="sub-navigation-entry-menu">
                <ul>
		    <li><a class="delete" href="#"><button class="icon-delete svg" title="delete"></button><?php p($l->t('Delete')); ?></a></li>
                </ul>
            </div>
        </li>
    {{/each}}
</script>
<ul></ul>
</div>
