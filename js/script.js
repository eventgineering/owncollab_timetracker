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
    updateActive: function (title, content, startdate, starttime, enddate, endtime, clientid, projectid, jobid) {
        var event = this.getActive();
        event.title = title;
        event.content = content;
        event.startdate = startdate;
        event.starttime = starttime;
        event.enddate = enddate;
        event.endtime = endtime;
        event.clientid = clientid;
        event.projectid = projectid;
        event.jobid = jobid;
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
        if (this._events.getActive()){
		if (this._events.getActive().clientid) {
                	if (this._events.getActive().clientid == 0){
                        	$('#select_client').changeSelect(instanceUrl, 'clients');
                            $('#select_client').change(function () {$('#select_project').changebySelect(instanceUrl, 'projects', this.value);});
                	}
		    	else{
				    $('#select_client').changeSelectbyID(instanceUrl, 'clients', this._events.getActive().clientid, '', '');
                    $('#select_project').changeSelectbyID(instanceUrl, 'projects', this._events.getActive().projectid, 'clientid', this._events.getActive().clientid);
                    $('#select_client').change(function () {$('#select_project').changebySelect(instanceUrl, 'projects', this.value);});
		    	}
		}
		if (this._events.getActive().jobid){
			if (this._events.getActive().jobid == 0){
				$('#select_job').changeSelect(instanceUrl, 'jobs');
			}
			else{
                		$('#select_job').changeSelectbyID(instanceUrl, 'jobs', this._events.getActive().jobid, '', '');
            		}
		}
        }


        // handle saves
        var textarea = $('#app-content textarea');
        var self = this;
        $('#save').click(function () {
	    if ($('#select_client').val() != '' && $('#select_project').val() != ''){
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
	            var clientid = $('#select_client').val();
	            var projectid = $('#select_project').val();
	            var jobid = $('#select_job').val();
	            self._events.updateActive(title, content, startdate, starttime, enddate, endtime, clientid, projectid, jobid).done(function () {
	                self.render();
	            }).fail(function () {
	                alert('Could not update event, not found');
	            });
	    }
	    else{
		alert('Please provide client, project and job');
	    }
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

	$('#edit-clients').click(function () {
		$('#client-sub-navigation').addClass('open');
		$('#project-sub-navigation').removeClass('open');
		$('#project-editor').removeClass('open');
		$('#job-sub-navigation').removeClass('open');
		$('#job-editor').removeClass('open');
        $('#event-editor').removeClass('open');
		$('#editor').removeClass('open');
    	});
    $('#edit-projects').click(function () {
        $('#client-sub-navigation').removeClass('open');
        $('#project-sub-navigation').addClass('open');
		$('#project-editor').addClass('open');
        $('#job-sub-navigation').removeClass('open');
		$('#job-editor').removeClass('open');
        $('#event-editor').removeClass('open');
        $('#editor').removeClass('open');
    	});
    $('#edit-jobs').click(function () {
		$('#client-sub-navigation').removeClass('open');
        $('#project-sub-navigation').removeClass('open');
		$('#project-editor').removeClass('open');
        $('#job-sub-navigation').addClass('open');
		$('#job-editor').addClass('open');
        $('#event-editor').removeClass('open');
        $('#editor').removeClass('open');
    	});

        // create a new event
        var self = this;
        $('#new-event').click(function () {
	    $('#client-sub-navigation').removeClass('open');
	    $('#project-sub-navigation').removeClass('open');
	    $('#project-editor').removeClass('open');
	    $('#job-sub-navigation').removeClass('open');
	    $('#job-editor').removeClass('open');
	    $('#editor').addClass('open');
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
                $('#select_client').changeSelect(instanceUrl, 'clients');
                $('#select_client').change(function () {$('#select_project').changebySelect(instanceUrl, 'projects', this.value);});
		$('#select_job').changeSelect(instanceUrl, 'jobs');
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
	 $('#app-navigation .app-navigation-entry-utils-menu-button').focusout(function () {
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
	    $('#editor').addClass('open');
	    $('#client-sub-navigation').removeClass('open');
	    $('#project-sub-navigation').removeClass('open');
	    $('#project-editor').removeClass('open');
	    $('#job-sub-navigation').removeClass('open');
	    $('#job-editor').removeClass('open');
        $('#event-editor').removeClass('open');
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
