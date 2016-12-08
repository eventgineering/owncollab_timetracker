<?php
script('owncollab_timetracker', 'handlebars');
script('owncollab_timetracker', 'lib/dhtmlxcalendar/codebase/dhtmlxcalendar');
script('owncollab_timetracker', 'script');
style('owncollab_timetracker', 'style');
style('owncollab_timetracker', 'lib/dhtmlxcalendar/codebase/dhtmlxcalendar')
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
