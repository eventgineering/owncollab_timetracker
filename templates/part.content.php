<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
        <input type="text" name="start" id="start">
        <input type="text" name="end" id="end">
        <select id="client" name="client">
            <option value="0" selected=""</option>
            <option value="1">Client 1</option>
            <option value="2">Client 2</option>
        <div class="input"><textarea>{{ event.notes }}</textarea></div>
        <div class="save"><button><?php p($l->t('Save')); ?></button></div>
    {{else}}
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}
</script>
<div id="editor"></div>