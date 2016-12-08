<?php
script('owncollab_timetracker', 'handlebars');
script('owncollab_timetracker', 'lib/angular/angular');
script('owncollab_timetracker', 'lib/angular-route/angular-route');
script('owncollab_timetracker', 'lib/angular-bootstrap/ui-bootstrap.min');
script('owncollab_timetracker', 'lib/angular-bootstrap/ui-bootstrap-tpls.min');
script('owncollab_timetracker', 'lib/jquery-timepicker/jquery.ui.timepicker');
script('owncollab_timetracker', 'lib/angular-ui-calendar/src/calendar');
script('owncollab_timetracker', 'script');
script('owncollab_timetracker', 'app');
style('owncollab_timetracker', 'datepicker');
style('owncollab_timetracker', 'jquery.ui.timepicker');
style('owncollab_timetracker', 'globals');
style('owncollab_timetracker', 'calendar');
style('owncollab_timetracker', 'datepicker');
style('owncollab_timetracker', 'eventdialog');
style('owncollab_timetracker', 'style');

foreach ($styles as $style) {
	style('calendar', $style);
}
?>

<div class="app" ng-app="Calendar" ng-controller="CalController">

<div id="app">
	<div id="app-navigation">
		<?php print_unescaped($this->inc('part.navigation')); ?>
		<?php print_unescaped($this->inc('part.settings')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('part.content')); ?>
		</div>
	</div>
</div>

</div>