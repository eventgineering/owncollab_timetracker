/**
 * ownCloud - owncollab_timetracker
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author andy <info@eventgineering.de>
 * @copyright andy 2016
 */

$array = array(
	"datepickerFormatDate" => json_encode($l->l('jsdate', null)),
	"dayNames" =>  json_encode(
		array(
			(string)$l->t('Sunday'),
			(string)$l->t('Monday'),
			(string)$l->t('Tuesday'),
			(string)$l->t('Wednesday'),
			(string)$l->t('Thursday'),
			(string)$l->t('Friday'),
			(string)$l->t('Saturday')
		)
	),
	"dayNamesShort" =>  json_encode(
		array(
			(string)$l->t('Sun.'),
			(string)$l->t('Mon.'),
			(string)$l->t('Tue.'),
			(string)$l->t('Wed.'),
			(string)$l->t('Thu.'),
			(string)$l->t('Fri.'),
			(string)$l->t('Sat.')
		)
	),
	"dayNamesMin" =>  json_encode(
		array(
			(string)$l->t('Su'),
			(string)$l->t('Mo'),
			(string)$l->t('Tu'),
			(string)$l->t('We'),
			(string)$l->t('Th'),
			(string)$l->t('Fr'),
			(string)$l->t('Sa')
		)
	),
	"monthNames" => json_encode(
		array(
			(string)$l->t('January'),
			(string)$l->t('February'),
			(string)$l->t('March'),
			(string)$l->t('April'),
			(string)$l->t('May'),
			(string)$l->t('June'),
			(string)$l->t('July'),
			(string)$l->t('August'),
			(string)$l->t('September'),
			(string)$l->t('October'),
			(string)$l->t('November'),
			(string)$l->t('December')
		)
	),
	"monthNamesShort" => json_encode(
		array(
			(string)$l->t('Jan.'),
			(string)$l->t('Feb.'),
			(string)$l->t('Mar.'),
			(string)$l->t('Apr.'),
			(string)$l->t('May.'),
			(string)$l->t('Jun.'),
			(string)$l->t('Jul.'),
			(string)$l->t('Aug.'),
			(string)$l->t('Sep.'),
			(string)$l->t('Oct.'),
			(string)$l->t('Nov.'),
			(string)$l->t('Dec.')
		)
	),
	"firstDay" => json_encode($l->l('firstday', null))
);


(function ($, OC) {

	$(document).ready(function () {
       	if(typeof monthNames != 'undefined'){
		// min date should always be the next day
		var minDate = new Date();
		minDate.setDate(minDate.getDate()+1);
		$.datepicker.setDefaults({
			monthNames: monthNames,
			monthNamesShort: monthNamesShort,
			dayNames: dayNames,
			dayNamesMin: dayNamesMin,
			dayNamesShort: dayNamesShort,
			firstDay: firstDay,
			minDate : minDate
		});
	}
    	$(this).click(function(event) {
		var target = $(event.target);
		var isMatched = !target.is('.drop, .ui-datepicker-next, .ui-datepicker-prev, .ui-icon')
			&& !target.closest('#ui-datepicker-div').length && !target.closest('.ui-autocomplete').length;
	});


		$('#hello').click(function () {
			alert('Hello from your script file');
		});

		$('#echo').click(function () {
			var url = OC.generateUrl('/apps/owncollab_timetracker/echo');
			var data = {
				echo: $('#echo-content').val()
			};

			$.post(url, data).success(function (response) {
				$('#echo-result').text(response.echo);
			});

		});
	});

})(jQuery, OC);

(function (OC, window, $, undefined) {
'use strict';

$(document).ready(function () {

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
    updateActive: function (title, content, start, end) {
        var event = this.getActive();
        event.title = title;
        event.content = content;
        event.start = start;
        event.end = end;


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
            if ($('#start').val()==''){
                var start = $('#start').attr('placeholder');
            }
            else{
                var start = $('#start').val();
            }
            if ($('#end').val()==''){
                var end = $('#end').attr('placeholder');
            }
            else{
                var end = $('#end').val();
            }
            if (textarea.val()==''){
                var content = textarea.attr('placeholder');
            }
            else{
                var content = textarea.val();
            }

            var title = content.split('\n')[0]; // first line is the title
            

            self._events.updateActive(title, content, start, end).done(function () {
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
		start.placeholder=today;
		end.placeholder=today;
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
            if ($('#start').val()==''){start.placeholder=today;}
            if ($('#end').val()==''){end.placeholder=today;}
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