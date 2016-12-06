<p>Hello World <?php p($_['user']) ?></p>

<p><button id="hello">click me</button></p>

    <div class="tbl">

        <div class="tbl_cell width25 valign_top">
            <?php print_unescaped($this->inc("part.content.list")); ?>
        </div>

<script id="content-tpl" type="text/x-handlebars-template">
    {{#if note}}
	<p>
        <input type="text" name="startts" id="startts" placeholder="{{ note.startts }}">
        <input type="text" name="endts" id="endts" placeholder="{{ note.endts }}">
	</p>
        <div class="input"><textarea>{{ note.content }}</textarea></div>
        <div class="save"><button><?php p($l->t('Save')); ?></button></div>
    {{else}}
	<p>
        <input type="text" name="startts" id="startts" placeholder="start date" disabled>
        <input type="text" name="endts" id="endts" placeholder="end date" disabled>
	</p>
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}
</script>    </div>
<div id="editor"></div>
