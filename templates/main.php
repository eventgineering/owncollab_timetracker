<?php
script('owncollab_timetracker', 'handlebars');
script('owncollab_timetracker', 'lib/jquery/external/jquery/jquery');
script('owncollab_timetracker', 'lib/jquery/jquery-ui');
script('owncollab_timetracker', 'script');
style('owncollab_timetracker', 'style');
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
