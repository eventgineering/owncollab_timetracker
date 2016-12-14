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

$.fn.changeSelectbyID = function(url, route, id, selector, selectorid){
        var field = this;
        var id = id;
	var selector = selector;
	var selectorid = selectorid
        $.getJSON(url+route, function(result){
                var items="";
                        $.each(result, function(i, data){
				if (selector != ''){
					if (data[selector] == selectorid){
		                                if(data.id == id){
                		                        items+="<option selected value='"+data.id+"'>"+data.name+"</option>";
                                		}
                                		else{
                                        		items+="<option value='"+data.id+"'>"+data.name+"</option>";
                                		}
					}
				else{
					if(data.id == id){
						items+="<option selected value='"+data.id+"'>"+data.name+"</option>";
					}
					else{
						items+="<option value='"+data.id+"'>"+data.name+"</option>";
					}
				}
                        });
                $(field).html(items);
	});
        return field;
}

})(OC, window, jQuery);
