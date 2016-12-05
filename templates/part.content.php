<p><button id="hello">click me</button></p>

<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
        <div class="input"><textarea>{{ event.notes }}</textarea></div>
        <div class="save"><button><?php p($l->t('Save')); ?></button></div>
    {{else}}
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}
</script>
<div id="editor"></div>