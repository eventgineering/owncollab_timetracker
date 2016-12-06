<p>Hello World <?php p($_['user']) ?></p>

<p><button id="hello">click me</button></p>

<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
	<p>
        <input type="text" name="startts" id="startts" value="{{ event.startts }}">
        <input type="text" name="endts" id="endts" placeholder="{{ event.endts }}">
	</p>
        <div class="input"><textarea>{{ event.content }}</textarea></div>
        <div class="save"><button><?php p($l->t('Save')); ?></button></div>
    {{else}}
	<p>
        <input type="text" name="startts" id="startts" placeholder="start date" disabled>
        <input type="text" name="endts" id="endts" placeholder="end date" disabled>
	</p>
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}
</script>
<div id="editor"></div>
