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

// this clients object holds all our clients
var Clients = function (baseUrl) {
    this._baseUrl = baseUrl;
    this._clients = [];
    this._activeClient = undefined;
};

Clients.prototype = {
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
    }
};

// this will be the view that is used to update the html
var View = function (clients) {
    this._clients = clients;
};

View.prototype = {
    renderClients: function () {
        var source = $('#content-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({clients: this._clients.getAll()});

        $('#editor').html(html);
        var entry = $(this).closest('.client);
    },
    render: function () {
        this.renderClients();
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
