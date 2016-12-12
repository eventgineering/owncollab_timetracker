/**
 * ownCloud - owncollab_timetracker
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author andy <info@eventgineering.de>
 * @copyright andy 2016
 */

(function (OC, window, $, undefined) {
'use strict';

    $(document).ready(function () {

        $.getJSON("/index.php/apps/owncollab_timetracker/clients", function(result){
	        var items="";
		    $.each(result, function(i, data){
                items+="<option value='"+data.id+"'>"+data.name+"</option>";
                console.log('id: ', data.id, 'name: ', data.name);
	    	});
            $("#a1_title").append(items); 
    	});

    });

})(OC, window, jQuery);