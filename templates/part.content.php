<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
	<p>
        <input type="text" name="start" id="start" {{#if event.start}} value="{{ event.start }}" {{/if}}>
        <input type="text" name="end" id="end" {{#if event.end}} value="{{ event.end }}" {{/if}}>
	</p>
        <div class="input"><textarea placeholder="{{ event.content }}"></textarea></div>
        <div class="save"><button><?php p($l->t('Save')); ?></button></div>
    {{else}}
    <p>Hello World <?php p($_['user']) ?></p>

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
