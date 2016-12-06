<?php
script('ownnotes', 'handlebars');
script('ownnotes', 'script');
style('ownnotes', 'style');
?>

<div id="app">
	<div id="app-navigation">
		<?php print_unescaped($this->inc('part.navigation')); ?>
		<?php print_unescaped($this->inc('part.settings')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper">
		    <div class="tbl">

        <div class="tbl_cell width25 valign_top">
            <?php print_unescaped($this->inc('part.content.list')); ?>
        </div>

        <div class="loader_min" style="display: none"></div>
        <div id="r_messages" class="tbl_cell valign_top" style="display: none"></div>

    </div>
			
			<?php print_unescaped($this->inc('part.content')); ?>
		</div>
	</div>
</div>
