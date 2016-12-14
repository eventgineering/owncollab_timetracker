<!-- translation strings -->
<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
	<p>
	<table>
	<tr><td><span><?php p($l->t('Start')); ?></span></td><td></td><td><span><?php p($l->t('End')); ?></span></td><td></td></tr>
	<tr>
	<td><input type="text" name="startdate" id="startdate" {{#if event.startdate}} value="{{ event.startdate }}" {{/if}}/></td>
	<td><input id="starttime" type="time" name="starttime" {{#if event.starttime}} value="{{ event.starttime }}" {{/if}}/></td>
        <td><input type="text" name="enddate" id="enddate" {{#if event.enddate}} value="{{ event.enddate }}" {{/if}}/></td>
	<td><input id="endtime" type="time" name="endtime" {{#if event.endtime}} value="{{ event.endtime }}" {{/if}}/></td></tr>
	<tr>
	<td><?php p($l->t('Client')); ?></td>
	<td colspan="3"><select id ="select_client" name="select_client" style="width: calc(100% - 3px);">
		<option value="" label="Client1">Select Client</option></select>
	</td></tr>
	        <tr>
        <td><?php p($l->t('Project')); ?></td>
        <td colspan="3"><select id ="select_project" name="select_project" style="width: calc(100% - 3px);">
                <option value="" label="Project1">Select Project</option></select>
        </td></tr>
        <tr>
        <td><?php p($l->t('Job')); ?></td>
        <td colspan="3"><select id ="select_job" name="select_job" style="width: calc(100% - 3px);">
                <option value="" label="Job1">Select Job</option></select>
        </td></tr>
        <tr style="height:200px">
	<td colspan="4"><div class="input"><textarea style="width: calc(100% -  3px); height: 200px;" placeholder="{{{ event.content }}}"></textarea></div></td></tr>
	<tr><td colspan="4"><div class="save" style="width: calc(100% -  3px);"><button><?php p($l->t('Save')); ?></button></div></td></tr></table>
	</p>
    {{else}}
        {{#if client}}
        <?php print_unescaped($this->inc('part.content.clients')); ?>
    {{/if}}
    <p>Hello <?php p($_['user']) ?>! Hier wird irgendwann die Statistik zu finden sein.</p>

        <input type="text" name="startdate" id="startdate" placeholder="<?php p($l->t('startdate date')); ?>" disabled>
        <input type="text" name="enddate" id="enddate" placeholder="<?php p($l->t('enddate date')); ?>" disabled>
	</p>
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}

</script>
<div id="editor"></div>

