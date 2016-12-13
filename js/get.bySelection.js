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
    var field = this;
    $.getJSON(url+route, function(result){
        var items="";
                $.each(result, function(i, data){
                        if (data.clientid == value){
                            items+="<option value='"+data.id+"'>"+data.name+"</option>";
                        }
                });
                $(field).html(items);
        });
}

})(OC, window, jQuery);