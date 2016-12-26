<?php
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
$langurl = "i18n/datepicker-" . $lang;
script('owncollab_timetracker', 'handlebars');
script('owncollab_timetracker', 'jquery.localisation');
script('owncollab_timetracker', $langurl);
script('owncollab_timetracker', 'timepicki/timepicki');
script('owncollab_timetracker', 'get.select');
script('owncollab_timetracker', 'get.bySelection');
script('owncollab_timetracker', 'get.selectbyid');
script('owncollab_timetracker', 'handle.clients');
script('owncollab_timetracker', 'handle.projects');
script('owncollab_timetracker', 'handle.jobs');
script('owncollab_timetracker', '/ag-grid/dist/ag-grid');
script('owncollab_timetracker', 'script');
script('owncollab_timetracker', 'handle.events');
style('owncollab_timetracker', 'timepicki/timepicki');
style('owncollab_timetracker', 'subnavigation');
style('owncollab_timetracker', 'style');
style('owncollab_timetracker', 'ag-grid/ag-grid');
?>

<div id="app">
	<div id="app-navigation">
		<?php print_unescaped($this->inc('part.navigation')); ?>
		<?php print_unescaped($this->inc('part.settings')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('part.content.clients')); ?>
			<?php print_unescaped($this->inc('part.content.projects')); ?>
			<?php print_unescaped($this->inc('part.content.jobs')); ?>
			<?php print_unescaped($this->inc('part.content')); ?>
			<?php print_unescaped($this->inc('part.content.projects.editor')); ?>
			<?php print_unescaped($this->inc('part.content.jobs.editor')); ?>
			<?php print_unescaped($this->inc('part.content.events.editor')); ?>
		</div>
	</div>
</div>
