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

$.fn.changebySelect = function(url, route, value){
    $.getJSON(url+route+'/'+value, function(result){
        var items="";
		console.log(url+route+'/'+value);
		console.log('result: ',result);
                $.each(result, function(i, data){
                        items+="<option value='"+result.id+"'>"+result.name+"</option>";
                        console.log('items: ', items);
                        console.log('data: ', data);
                });
                $(field).append(items);
        });
}

})(OC, window, jQuery);