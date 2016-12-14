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

$.fn.changeSelectbyID = function(url, route, id){
        var field = this;
        var id = id;
        $.getJSON(url+route, function(result){
                var items="";
                $.each(result, function(i, data){
                        if(data.id == id){
                                console.log('id equal');
                        }                      
                });
	});
        return field;
}

})(OC, window, jQuery);
