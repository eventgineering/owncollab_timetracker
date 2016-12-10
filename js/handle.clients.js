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

// this notes object holds all our notes
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
            // delete cached active note if necessary
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
    updateActive: function (name) {
        var client = this.getActive();
        client.name = name;

        return $.ajax({
            url: this._baseUrl + '/' + client.id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(note)
        });
    }
};

// this will be the view that is used to update the html
var View = function (clients) {
    this._clients = clients;
};

View.prototype = {

    renderSelector: function () {
        var source = $('#content-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({clients: this._clients.getAll()});
        console.log('ran renderSelector')
        console.log(html);
        // $('#editor select_client').html(html);

        // show app menu
        // $('#app-navigation .app-navigation-entry-utils-menu-button').click(function () {
        //    var entry = $(this).closest('.note');
        //    entry.find('.app-navigation-entry-menu').toggleClass('open');
        // });

    },
    render: function () {
        this.renderSelector();
    }
};

var clients = new Clients(OC.generateUrl('/apps/owncollab_timetracker/clients'));
var view = new View(clients);
clients.loadAll().done(function () {
    view.render();
}).fail(function () {
    alert('Could not load notes');
});


});

})(OC, window, jQuery);