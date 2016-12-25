var instanceUrl = OC.generateUrl('/apps/owncollab_timetracker/');

(function (OC, window, $, undefined) {
'use strict';

$(document).ready(function () {

var translations = {
    newJob: $('#new-job-string').text()
};

// this jobs object holds all our jobs
var Jobs = function (baseUrl) {
    this._baseUrl = baseUrl;
    this._jobs = [];
    this._activeJob = undefined;
};

Jobs.prototype = {
    load: function (id) {
        var self = this;
        this._jobs.forEach(function (job) {
            if (job.id === id) {
                job.active = true;
                self._activeJob = job;
            } else {
                job.active = false;
            }
        });

    },
    getActive: function () {
        return this._activeJob;
    },
    removeActive: function () {
        var index;
        var deferred = $.Deferred();
        var id = this._activeJob.id;
        this._jobs.forEach(function (job, counter) {
            if (job.id === id) {
                index = counter;
            }
        });

        if (index !== undefined) {
            // delete cached active job if necessary
            if (this._activeJob === this._jobs[index]) {
                delete this._activeJob;
            }

            this._jobs.splice(index, 1);

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
    create: function (job) {
        var deferred = $.Deferred();
        var self = this;
        $.ajax({
            url: this._baseUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(job)
        }).done(function (job) {
            self._jobs.push(job);
            self._activeJob = job;
            self.load(job.id);
            deferred.resolve();
        }).fail(function () {
            deferred.reject();
        });
        return deferred.promise();
    },
    getAll: function () {
        return this._jobs;
    },
    loadAll: function () {
        var deferred = $.Deferred();
        var self = this;
        $.get(this._baseUrl).done(function (jobs) {
            self._activeJob = undefined;
            self._jobs = jobs;
            deferred.resolve();
        }).fail(function () {
            deferred.reject();
        });
        return deferred.promise();
    },
    updateActive: function (name, rate, currency) {
        var job = this.getActive();
        job.name = name;
        job.rate = rate;
        job.currency = currency
        return $.ajax({
            url: this._baseUrl + '/' + job.id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(job)
        });
    }
};

// this will be the view that is used to update the html
var View = function (jobs) {
    this._jobs = jobs;
};

View.prototype = {
    renderContent: function () {
        var source = $('#job-content-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({job: this._jobs.getActive()});
        $('#job-editor').html(html);

        // handle saves
        var self = this;
        $('#job-save').click(function () {
	            var name = $('#name').val();
                var rate = $('#rate').val();
                var currency = $('#currency').val();
	            self._jobs.updateActive(name, rate, currency).done(function () {
	                self.render();
	            }).fail(function () {
	                alert('Could not update job, not found');
	            });
	 });
    },
    renderNavigation: function () {
        var source = $('#jobs-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({jobs: this._jobs.getAll()});
        $('#job-sub-navigation ul').html(html);

        // create a new job
        var self = this;
        $('#new-job').click(function () {
            var job = {
                name: translations.newJob,
            };

            self._jobs.create(job).done(function() {
                self.render();
                $('#name').focus();
            }).fail(function () {
                alert('Could not create job');
            });
        });

        // show app menu
        $('#job-sub-navigation .sub-navigation-entry-utils-menu-button').click(function () {
            var entry = $(this).closest('.job');
            entry.find('.sub-navigation-entry-menu').toggleClass('open');
            console.log(entry.find('.sub-navigation-entry-menu'));
        });

        // delete a job
        $('#job-sub-navigation .job .delete').click(function () {
            var entry = $(this).closest('.job');
            entry.find('.sub-navigation-entry-menu').removeClass('open');

            self._jobs.removeActive().done(function () {
                self.render();
            }).fail(function () {
                alert('Could not delete job, not found');
            });
        });

        // load a job
        $('#job-sub-navigation .job > a').click(function () {

            var id = parseInt($(this).parent().data('id'), 10);
            self._jobs.load(id);
            self.render();
            $('#name').focus();

        });
    },
    render: function () {
        this.renderNavigation();
        this.renderContent();
    }
};



var jobs = new Jobs(OC.generateUrl('/apps/owncollab_timetracker/jobs'));
var view = new View(jobs);
jobs.loadAll().done(function () {
    view.render();
}).fail(function () {
    alert('Could not load jobs');
});


});

})(OC, window, jQuery);
