<?php
script('owncollab_timetracker', 'handlebars');
script('owncollab_timetracker', 'script');
script('owncollab_timetracker', 'app');
style('owncollab_timetracker', 'datepicker');
style('owncollab_timetracker', 'style');

foreach ($styles as $style) {
	style('calendar', $style);
}
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
