<p>Hello World <?php p($_['user']) ?></p>

<p><button id="hello">click me</button></p>

<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
	<p>
        <input type="text" name="start" id="start" placeholder="{{ event.start }}">
        <input type="text" name="end" id="end" placeholder="{{ event.end }}">
	</p>
        <div class="input"><textarea>{{ event.content }}</textarea></div>
        <div class="save"><button><?php p($l->t('Save')); ?></button></div>
    {{else}}
	<p>
        <input type="text" name="start" id="start" placeholder="start date" disabled>
        <input type="text" name="end" id="end" placeholder="end date" disabled>
	</p>
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}
</script>
<div id="editor"></div>
