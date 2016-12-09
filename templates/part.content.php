<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
	<p>
	<table>
	<tr><td><span><?php p($l->t('Start')); ?></span></td><td></td><td><span><?php p($l->t('End')); ?></span></td><td></td></tr>
	<tr>
	<td><input type="text" name="start" id="start" {{#if event.start}} value="{{ event.start }}" {{/if}}/></td>
	<td><input id="starttime" type="time" name="starttime"/></td>
        <td><input type="text" name="end" id="end" {{#if event.end}} value="{{ event.end }}" {{/if}}/></td>
	<td><input id="endtime" type="time" name="starttime"/></td></tr>
	<tr>
	<td><?php p($l->t('Client')); ?></td>
	<td colspan="3"><select style="width: calc(100% - 3px);">
		<option label="Client1" value="1">Client1</option>
		<option label="Client2" value="2">Cleint2</option></select>
	</td></tr>
	        <tr>
        <td><?php p($l->t('Project')); ?></td>
        <td colspan="3"><select	style="width: calc(100% -  3px);">
                <option label="Project1" value="1">Project1</option>
                <option label="Project2" value="2">Project2</option></select>
        </td></tr>
        <tr style="height:200px">
	<td colspan="4"><div class="input"><textarea style="width: calc(100% -  3px); height: 200px;" placeholder="{{ event.content }}"></textarea></div></td></tr>
	<tr><td colspan="4"><div class="save" style="width: calc(100% -  3px);"><button><?php p($l->t('Save')); ?></button></div></td></tr></table>
	</p>
    {{else}}
    <p>Hello <?php p($_['user']) ?>! Hier wird irgendwann die Statistik zu finden sein.</p>

    <p><button id="hello">click me</button></p>
	<p>
        <input type="text" name="start" id="start" placeholder="<?php p($l->t('start date')); ?>" disabled>
        <input type="text" name="end" id="end" placeholder="<?php p($l->t('end date')); ?>" disabled>
	</p>
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}
</script>
<div id="editor"></div>


