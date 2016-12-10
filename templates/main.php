<?php
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
$langurl = "i18n/datepicker-" . $lang;
script('owncollab_timetracker', 'handlebars');
script('owncollab_timetracker', 'jquery.localisation');
script('owncollab_timetracker', $langurl);
script('owncollab_timetracker', 'timepicki/timepicki');
script('owncollab_timetracker', 'script');
script('owncollab_timetracker', 'handle.clients');
style('owncollab_timetracker', 'timepicki/timepicki');
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
