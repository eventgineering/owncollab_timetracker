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

$(document).ready(function () {

var translations = {
    newClient: $('#new-client-string').text()
};

// this clients object holds all our clients
var Clients = function (baseUrl) {
    this._baseUrl = baseUrl;
    this._clients = [];
    this._activeClient = undefined;
};

Clients.prototype = {
    load: function (id) {
        var self = this;
        this._clients.forEach(function (client) {
            if (client.id === id) {
                client.active = true;
                self._activeClient = client;
            } else {
                client.active = false;
            }
        });
    },
    getActive: function () {
        return this._activeClient;
    },
    removeActive: function () {
        var index;
        var deferred = $.Deferred();
        var id = this._activeClient.id;
        this._clients.forEach(function (client, counter) {
            if (client.id === id) {
                index = counter;
            }
        });

        if (index !== undefined) {
            // delete cached active client if necessary
            if (this._activeClient === this._clients[index]) {
                delete this._activeClient;
            }

            this._clients.splice(index, 1);

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
    create: function (client) {
        var deferred = $.Deferred();
        var self = this;
        $.ajax({
            url: this._baseUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(client)
        }).done(function (client) {
            self._clients.push(client);
            self._activeClient = client;
            self.load(client.id);
            deferred.resolve();
        }).fail(function () {
            deferred.reject();
        });
        return deferred.promise();
    },
    getAll: function () {
        return this._clients;
    },
    loadAll: function () {
        var deferred = $.Deferred();
        var self = this;
        $.get(this._baseUrl).done(function (clients) {
            self._activeClient = undefined;
            self._clients = clients;
            deferred.resolve();
        }).fail(function () {
            deferred.reject();
        });
        return deferred.promise();
    },
    updateActive: function (title, content) {
        var client = this.getActive();
        client.title = title;
        client.content = content;

        return $.ajax({
            url: this._baseUrl + '/' + client.id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(client)
        });
    }
};

// this will be the view that is used to update the html
var View = function (clients) {
    this._clients = clients;
};

View.prototype = {
    renderContent: function () {
        var source = $('#content-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({client: this._clients.getActive()});

        $('#editor').html(html);

        // handle saves
        var textarea = $('#app-content textarea');
        var self = this;
        $('#app-content button').click(function () {
            var content = textarea.val();
            var title = content.split('\n')[0]; // first line is the title

            self._clients.updateActive(title, content).done(function () {
                self.render();
            }).fail(function () {
                alert('Could not update client, not found');
            });
        });
    },
    renderNavigation: function () {
        var source = $('#navigation-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({clients: this._clients.getAll()});

        $('#app-navigation ul').html(html);

        // create a new client
        var self = this;
        $('#new-client').click(function () {
            var client = {
                title: translations.newClient,
                content: ''
            };

            self._clients.create(client).done(function() {
                self.render();
                $('#editor textarea').focus();
            }).fail(function () {
                alert('Could not create client');
            });
        });

        // show app menu
        $('#app-navigation .app-navigation-entry-utils-menu-button').click(function () {
            var entry = $(this).closest('.client');
            entry.find('.app-navigation-entry-menu').toggleClass('open');
        });

        // delete a client
        $('#app-navigation .client .delete').click(function () {
            var entry = $(this).closest('.client');
            entry.find('.app-navigation-entry-menu').removeClass('open');

            self._clients.removeActive().done(function () {
                self.render();
            }).fail(function () {
                alert('Could not delete client, not found');
            });
        });

        // load a client
        $('#app-navigation .client > a').click(function () {
            var id = parseInt($(this).parent().data('id'), 10);
            self._clients.load(id);
            self.render();
            $('#editor textarea').focus();
        });
    },
    render: function () {
        this.renderNavigation();
        this.renderContent();
    }
};

var clients = new Clients(OC.generateUrl('/apps/ownclients/clients'));
var view = new View(clients);
clients.loadAll().done(function () {
    view.render();
}).fail(function () {
    alert('Could not load clients');
});


});

})(OC, window, jQuery);