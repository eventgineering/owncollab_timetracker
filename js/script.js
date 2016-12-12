/**
 * ownCloud - owncollab_timetracker
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author andy <info@eventgineering.de>
 * @copyright andy 2016
 */
var instanceUrl = OC.generateUrl('/apps/owncollab_timetracker/');

(function (OC, window, $, undefined) {
'use strict';

$(document).ready(function () {
        $().changeSelect(instanceUrl, 'clients', '#a1_title');

var translations = {
    newEvent: $('#new-event-string').text()
};

// this events object holds all our events
var Events = function (baseUrl) {
    this._baseUrl = baseUrl;
    this._events = [];
    this._activeEvent = undefined;
};

Events.prototype = {
    load: function (id) {
        var self = this;
        this._events.forEach(function (event) {
            if (event.id === id) {
                event.active = true;
                self._activeEvent = event;
            } else {
                event.active = false;
            }
        });

console.log(this._baseUrl);
    },
    getActive: function () {
        return this._activeEvent;
    },
    removeActive: function () {
        var index;
        var deferred = $.Deferred();
        var id = this._activeEvent.id;
        this._events.forEach(function (event, counter) {
            if (event.id === id) {
                index = counter;
            }
        });

        if (index !== undefined) {
            // delete cached active event if necessary
            if (this._activeEvent === this._events[index]) {
                delete this._activeEvent;
            }

            this._events.splice(index, 1);

            $.ajax({
                url: this._baseUrl + '/' + id,
                method: 'DELETE'
            }).done(function () {
                deferred.resolve();
            }).fail(function () {
                deferred.reject();
            });
        } else {
            deferred.reject();
        }
        return deferred.promise();
    },
    create: function (event) {
        var deferred = $.Deferred();
        var self = this;
        $.ajax({
            url: this._baseUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(event)
        }).done(function (event) {
            self._events.push(event);
            self._activeEvent = event;
            self.load(event.id);
            deferred.resolve();
        }).fail(function () {
            deferred.reject();
        });
        return deferred.promise();
    },
    getAll: function () {
        return this._events;
    },
    loadAll: function () {
        var deferred = $.Deferred();
        var self = this;
        $.get(this._baseUrl).done(function (events) {
            self._activeEvent = undefined;
            self._events = events;
            deferred.resolve();
        }).fail(function () {
            deferred.reject();
        });
        return deferred.promise();
    },
    updateActive: function (title, content, startdate, starttime, enddate, endtime) {
        var event = this.getActive();
        event.title = title;
        event.content = content;
        event.startdate = startdate;
        event.starttime = starttime;
        event.enddate = enddate;
        event.endtime = endtime;
	console.log(event.content);

        return $.ajax({
            url: this._baseUrl + '/' + event.id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(event)
        });
    }
};

// this will be the view that is used to update the html
var View = function (events) {
    this._events = events;
};

View.prototype = {
    renderContent: function () {
        var source = $('#content-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({event: this._events.getActive()});

        $('#editor').html(html);

        // handle saves
        var textarea = $('#app-content textarea');
        var self = this;
        $('#app-content button').click(function () {
            if ($('#startdate').val()==''){
                var startdate = $('#startdate').attr('placeholder');
            }
            else{
                var startdate = $('#startdate').val();
            }
            if ($('#starttime').val()==''){
                var starttime = $('#starttime').attr('placeholder');
            }
            else{
                var starttime = $('#starttime').val();
            }
            if ($('#enddate').val()==''){
                var enddate = $('#enddate').attr('placeholder');
            }
            else{
                var enddate = $('#enddate').val();
            }
            if ($('#endtime').val()==''){
                var endtime = $('#endtime').attr('placeholder');
            }
            else{
                var endtime = $('#endtime').val();
            }
            if (textarea.val()==''){
                var content = textarea.attr('placeholder');
            }
            else{
                var content = textarea.val();
            }

            var title = content.split('\n')[0]; // first line is the title
            

            self._events.updateActive(title, content, startdate, starttime, enddate, endtime).done(function () {
                self.render();
            }).fail(function () {
                alert('Could not update event, not found');
            });
        });
    },
    renderNavigation: function () {
        var d = new Date();
        var now = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        var today = ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." + d.getFullYear();
        var source = $('#navigation-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({events: this._events.getAll()});

        $('#app-navigation ul').html(html);

        // create a new event
        var self = this;
        $('#new-event').click(function () {
            var event = {
                title: translations.newEvent,
                content: 'content here . . .'
            };

            self._events.create(event).done(function() {
                self.render();
                startdate.placeholder=today;
                enddate.placeholder=today;
                $( "#startdate" ).datepicker({
    	            minDate: new Date(2016, 1 - 1, 1)});
                $( "#enddate" ).datepicker();
            	$('#starttime').timepicki({
                	show_meridian:false,
                	min_hour_value:0,
                	max_hour_value:23,
                	overflow_minutes:true
                });
                starttime.placeholder=now;
                $('#endtime').timepicki({
                	show_meridian:false,
                	min_hour_value:0,
                	max_hour_value:23,
                	overflow_minutes:true
                });
                endtime.placeholder=now;
                $('#editor textarea').focus();
            }).fail(function () {
                alert('Could not create event');
            });

        });

        // show app menu
        $('#app-navigation .app-navigation-entry-utils-menu-button').click(function () {
            var entry = $(this).closest('.event');
            entry.find('.app-navigation-entry-menu').toggleClass('open');
        });

        // delete a event
        $('#app-navigation .event .delete').click(function () {
            var entry = $(this).closest('.event');
            entry.find('.app-navigation-entry-menu').removeClass('open');

            self._events.removeActive().done(function () {
                self.render();
            }).fail(function () {
                alert('Could not delete event, not found');
            });
        });

        // load a event
        $('#app-navigation .event > a').click(function () {

	    var d = new Date();
            var now = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
            var today = ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." + d.getFullYear();
            var id = parseInt($(this).parent().data('id'), 10);
            self._events.load(id);
            self.render();
            if ($('#startdate').val()==''){startdate.placeholder=today;}
            if ($('#enddate').val()==''){enddate.placeholder=today;}
            $( "#startdate" ).datepicker({
                minDate: new Date(2016, 1 - 1, 1)});
            $( "#enddate" ).datepicker();
            $('#starttime').timepicki({
                show_meridian:false,
                min_hour_value:0,
                max_hour_value:23,
                overflow_minutes:true
                });
            if ($('#starttime').val()==''){starttime.placeholder=now;}
            $('#endtime').timepicki({
                show_meridian:false,
                min_hour_value:0,
                max_hour_value:23,
                overflow_minutes:true
                });
            if ($('#endtime').val()==''){endtime.placeholder=now;}
            $('#editor textarea').focus();

        });
    },
    render: function () {
        this.renderNavigation();
        this.renderContent();
    }
};



var events = new Events(OC.generateUrl('/apps/owncollab_timetracker/events'));
var view = new View(events);
events.loadAll().done(function () {
    view.render();
}).fail(function () {
    alert('Could not load events');
});


});

})(OC, window, jQuery);
