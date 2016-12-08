<?php
script('owncollab_timetracker', 'handlebars');
script('owncollab_timetracker', 'script');
script('owncollab_timetracker/lib/angular-ui-calendar/src', 'calendar');
script('owncollab_timetracker/lib/jquery-timepicker', 'jquery.ui.timepicker');
style('owncollab_timetracker', 'style');
style('owncollab_timetracker', 'datepicker');
style('owncollab_timetracker', 'jquery.ui.timepicker');
?>

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
