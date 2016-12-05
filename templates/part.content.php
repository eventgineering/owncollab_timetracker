<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
    <p>
        <input type="text" name="start" id="start" placeholder="start date">
        <input type="text" name="end" id="end" placeholder="end date">
        <select id="client" name="client">
            <option value="0" selected>Select Client</option>
            <option value="1">Client 1</option>
            <option value="2">Client 2</option>
        </select>
        <select id="project" name="project">
            <option value="0" selected>Select Project</option>
            <option value="1">Project 1</option>
            <option value="2">Project 2</option>
        </select>
        <p>Hello World <?php p($_['user']) ?></p>
        </p>
        <div class="input"><textarea>{{ event.notes }}</textarea></div>
        <div class="save"><button><?php p($l->t('Save')); ?></button></div>
    {{else}}
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}
</script>
<div id="editor"></div>