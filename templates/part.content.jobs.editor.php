<!-- translation strings -->
<script id="job-content-tpl" type="text/x-handlebars-template">
    {{#if job}}
        <p>
        <input type="text" name="job-name" id="job-name" {{#if job.name}} value="{{ job.name }}" {{/if}}/>
        <input type="text" name="rate" id="rate" {{#if job.rate}} value="{{ job.rate }}" {{/if}}/>
        <input type="text" name="currency" id="currency" {{#if job.currency}} value="{{ job.currency }}" {{/if}}/>
	<div class="save" style="width: calc(100% -  3px);"><button id="job-save" name="job-save"><?php p($l->t('Save')); ?></button></div>
	</p>
    {{else}}
        <p>
        <input disabled type="text" name="job-name" id="job-name" placeholder="<?php p($l->t('job name')); ?>" />
        <input disabled type="text" name="rate" id="rate" placeholder="<?php p($l->t('job rate')); ?>" />
        <input disabled type="text" name="currency" id="currency" placeholder="<?php p($l->t('job currency')); ?>" />
        </p>
	<div class="save" style="width: calc(100% -  3px);"><button disabled id="job-save" name="job-save"><?php p($l->t('Save')); ?></button></div>
    {{/if}}

</script>
<div id="job-editor"></div>

