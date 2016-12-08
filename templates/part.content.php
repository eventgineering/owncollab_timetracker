<script id="content-tpl" type="text/x-handlebars-template">
    {{#if event}}
	<p>
        		<fieldset class="event-time events--fieldset" ng-disabled="readOnly">
			<div class="event-time-interior pull-left">
				<span><?php p($l->t('starts')); ?></span>
				<ocdatetimepicker ng-model="properties.dtstart.value" disabletime="properties.allDay"></ocdatetimepicker>
				<span ng-show="edittimezone">{{ properties.dtstart.parameters.zone | timezoneFilter }}</span>
			</div>
			<div class="event-time-interior pull-right">
				<span><?php p($l->t('ends')); ?></span>
				<ocdatetimepicker ng-model="properties.dtend.value" disabletime="properties.allDay"></ocdatetimepicker>
				<span ng-show="edittimezone">{{ properties.dtend.parameters.zone | timezoneFilter }}</span>
			</div>
			<div class="clear-both"></div>
			<div class="events--checkbox pull-left">
				<input type="checkbox" name="alldayeventcheckbox"
					   ng-model="properties.allDay"
					   id="alldayeventcheckbox" class="event-checkbox"
					   ng-change="toggledAllDay()" />
				<label for="alldayeventcheckbox"><?php p($l->t('All day Event'))?></label>
			</div>
		</fieldset>
        
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
