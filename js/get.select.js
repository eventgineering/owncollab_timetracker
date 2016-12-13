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

$.fn.changeSelect = function(url, route){
        var field = this;
        $.getJSON(url+route, function(result){
                var items="";
		console.log(url);
                $.each(result, function(i, data){
                        items+="<option value='"+data.id+"'>"+data.name+"</option>";
                });
		$(field).append(items);
	});
        return field;
}

})(OC, window, jQuery);
