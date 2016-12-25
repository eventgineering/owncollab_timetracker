<!-- translation strings -->
<script id="project-content-tpl" type="text/x-handlebars-template">
    {{#if project}}
        <p>
        <input type="text" name="name" id="name" {{#if project.name}} value="{{ project.name }}" {{/if}}/>
        <select id ="select_client" name="select_client">
		<option value="" label="Client1">Select Client</option></select>
	<div class="save" style="width: calc(100% -  3px);"><button id="project-save" name="project-save"><?php p($l->t('Save')); ?></button></div>
	</p>
    {{else}}
        <p>Hello Hello!
        <input disabled type="text" name="name" id="name" placeholder="<?php p($l->t('Project name')); ?>" />
        <select disabled id ="select_client" name="select_client">
		<option value="" label="Client1">Select Client</option></select>
        </p>
	<div class="save" style="width: calc(100% -  3px);"><button disabled id="project-save" name="project-save"><?php p($l->t('Save')); ?></button></div>
    {{/if}}

</script>
<div id="project-editor"></div>

