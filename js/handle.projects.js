var instanceUrl = OC.generateUrl('/apps/owncollab_timetracker/');

(function (OC, window, $, undefined) {
'use strict';

$(document).ready(function () {

var translations = {
    newProject: $('#new-project-string').text()
};

// this projects object holds all our projects
var Projects = function (baseUrl) {
    this._baseUrl = baseUrl;
    this._projects = [];
    this._activeProject = undefined;
};

Projects.prototype = {
    load: function (id) {
        var self = this;
        this._projects.forEach(function (project) {
            if (project.id === id) {
                project.active = true;
                self._activeProject = project;
            } else {
                project.active = false;
            }
        });

    },
    getActive: function () {
        return this._activeProject;
    },
    removeActive: function () {
        var index;
        var deferred = $.Deferred();
        var id = this._activeProject.id;
        this._projects.forEach(function (project, counter) {
            if (project.id === id) {
                index = counter;
            }
        });

        if (index !== undefined) {
            // delete cached active project if necessary
            if (this._activeProject === this._projects[index]) {
                delete this._activeProject;
            }

            this._projects.splice(index, 1);

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
    create: function (project) {
        var deferred = $.Deferred();
        var self = this;
        $.ajax({
            url: this._baseUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(project)
        }).done(function (project) {
            self._projects.push(project);
            self._activeProject = project;
            self.load(project.id);
            deferred.resolve();
        }).fail(function () {
            deferred.reject();
        });
        return deferred.promise();
    },
    getAll: function () {
        return this._projects;
    },
    loadAll: function () {
        var deferred = $.Deferred();
        var self = this;
        $.get(this._baseUrl).done(function (projects) {
            self._activeProject = undefined;
            self._projects = projects;
            deferred.resolve();
        }).fail(function () {
            deferred.reject();
        });
        return deferred.promise();
    },
    updateActive: function (name, clientid) {
        var project = this.getActive();
        project.name = name;
        project.clientid = clientid;
        return $.ajax({
            url: this._baseUrl + '/' + project.id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(project)
        });
    }
};

// this will be the view that is used to update the html
var View = function (projects) {
    this._projects = projects;
};

View.prototype = {
    renderContent: function () {
        var source = $('#project-content-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({project: this._projects.getActive()});
        $('#project-editor').html(html);
        if (this._projects.getActive()){
		    if (this._projects.getActive().clientid) {
                	if (this._projects.getActive().clientid == 0){
                        $('#select_client').changeSelect(instanceUrl, 'clients');
                	}
		    	    else{
				        $('#select_client').changeSelectbyID(instanceUrl, 'clients', this._projects.getActive().clientid, '', '');
		    	}
		}

        }


        // handle saves
        var self = this;
        $('#project-save').click(function () {
	    console.log('client-value: ', $('#select_client').val());
	    if ($('#select_client').val() != '' && $('#select_project').val() != ''){

	            var name = $('#name').val();
	            var clientid = $('#select_client').val();
	            self._projects.updateActive(name, clientid).done(function () {
	                self.render();
	            }).fail(function () {
	                alert('Could not update project, not found');
	            });
	    }
	    else{
		alert('Please provide client');
	    }
	 });
    },
    renderNavigation: function () {
        var source = $('#projects-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({projects: this._projects.getAll()});
        $('#project-sub-navigation ul').html(html);

        // create a new project
        var self = this;
        $('#new-project').click(function () {
            var project = {
                title: translations.newProject,
                name: 'Project name . . .'
            };

            self._projects.create(project).done(function() {
                self.render();
                $('#select_client').changeSelect(instanceUrl, 'clients');
                $('#name').focus();
            }).fail(function () {
                alert('Could not create project');
            });

        });

        // show app menu
        $('# .sub-navigation-entry-utils-menu-button').click(function () {
            var entry = $(this).closest('.project');
            entry.find('.app-navigation-entry-menu').toggleClass('open');
        });

        // delete a project
        $('#project-sub-navigation .project .delete').click(function () {
            var entry = $(this).closest('.project');
            entry.find('.sub-navigation-entry-menu').removeClass('open');

            self._projects.removeActive().done(function () {
                self.render();
            }).fail(function () {
                alert('Could not delete project, not found');
            });
        });

        // load a project
        $('#project-sub-navigation .project > a').click(function () {

            var id = parseInt($(this).parent().data('id'), 10);
            self._projects.load(id);
            self.render();
            $('#name').focus();

        });
    },
    render: function () {
        this.renderNavigation();
        this.renderContent();
    }
};



var projects = new Projects(OC.generateUrl('/apps/owncollab_timetracker/projects'));
var view = new View(projects);
projects.loadAll().done(function () {
    view.render();
}).fail(function () {
    alert('Could not load projects');
});


});

})(OC, window, jQuery);
