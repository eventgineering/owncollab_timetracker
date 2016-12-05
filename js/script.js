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
    updateActive: function (start, end, notes, client, project) {
        var event = this.getActive();
        event.start = start;
        event.end = end;
        event.notes = notes;
        event.client = client;
        event.project = project;

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
            var notes = textarea.val();
            var project = content.split('\n')[0]; // first line is the title

            self._events.updateActive(project, notes).done(function () {
                self.render();
            }).fail(function () {
                alert('Could not update event, not found');
            });
        });
    },
    renderNavigation: function () {
        var source = $('#navigation-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({events: this._events.getAll()});

        $('#app-navigation ul').html(html);

        // create a new event
        var self = this;
        $('#new-event').click(function () {
            var event = {
                project: translations.newEvent,
                notes: ''
            };

            self._events.create(event).done(function() {
                self.render();
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

        // delete an event
        $('#app-navigation .event .delete').click(function () {
            var entry = $(this).closest('.event');
            entry.find('.app-navigation-entry-menu').removeClass('open');

            self._events.removeActive().done(function () {
                self.render();
            }).fail(function () {
                alert('Could not delete event, not found');
            });
        });

        // load an event
        $('#app-navigation .event > a').click(function () {
            var id = parseInt($(this).parent().data('id'), 10);
            self._events.load(id);
            self.render();
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