<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
        	<div class="expirationDateContainer {{#unless isExpirationSet}}visible{{/unless}}">
			<label for="expirationDate" class="hidden-visually" value="{{expirationDate}}">{{expirationLabel}}</label>
			<input id="expirationDate" class="datepicker" type="text" placeholder="{{expirationDatePlaceholder}}" value="{{expirationValue}}" />
			</div>
        <div class="input"><textarea>{{ event.notes }}</textarea></div>
        <div class="save"><button><?php p($l->t('Save')); ?></button></div>
    {{else}}
        <div class="input"><textarea disabled></textarea></div>
        <div class="save"><button disabled><?php p($l->t('Save')); ?></button></div>
    {{/if}}
</script>
<div id="editor"></div>