
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

    removebyId: function (id) {
	var deferred = $.Deferred();
	var self = this;
	this._clients.forEach(function (client){
		if(client.id === id) {
			client.active = true;
			$.ajax({
				url: clients._baseUrl + '/' + id,
				method: 'DELETE'
			}).done(function () {
				deferred.resolve();
			}).fail(function () {
				deferred.reject();
			});
		} else {
			deferred.reject();
		}
	});
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
            data: JSON.stringify(client)
        });
    }
};

// this will be the view that is used to update the html
var View = function (clients) {
    this._clients = clients;
};

View.prototype = {

    renderNavigation: function () {
        var source = $('#clients-tpl').html();
        var template = Handlebars.compile(source);
        var html = template({clients: this._clients.getAll()});
        $('#client-sub-navigation ul').html(html);

        // create a new client
        var self = this;
        $('#new-client').click(function () {
            var client = {
                name: translations.newClient,
            };

            self._clients.create(client).done(function() {
                self.render();
		var id = $('li.active').data('id');
		$("input[data-id='" + id +"']").toggle();
		$("input[data-id='" + id +"']").focus();
		$("a[data-id='" + id +"']").toggle();
		$("input[data-id='" + id +"']").keydown(function(e) {
			if (e.keyCode == 13){
				$("input[data-id='" + id +"']").blur();
				var name = $("input[data-id='" + id +"']").val();
				self._clients.load(id);
				self._clients.updateActive(name).done(function () {
					self.render();
				}).fail(function () {
					alert('Could not update client, not found');
				});
			}
			if (e.keyCode == 27){
				$("input[data-id='" + id +"']").blur();
			}
		});
		$("input[data-id='" + id +"']").blur(function () {
			$("input[data-id='" + id +"']").toggle();
			$("a[data-id='" + id +"']").toggle();
		});
        }).fail(function () {
                alert('Could not create client');
        });
        });

        // show app menu
        $('#cliet-sub-navigation .sub-navigation-entry-utils-menu-button').click(function () {
            var entry = $(this).closest('.client');
            entry.find('.sub-navigation-entry-menu').toggleClass('open');
        });

        // delete a client
        $('#client-sub-navigation .delete').click(function () {
		var entry = $(this).closest('.client');
		entry.find('.sub-navigation-entry-menu').removeClass('open');
		var id = parseInt($(this).parent().data('id'), 10);
		self._clients.removebyId(id);
		self._clients.loadAll().done(function () {
			view.render();
		});
		self.render();
        });

        // rename a client
        $('#client-sub-navigation .client .rename').click(function () {
            var entry = $(this).closest('.client');
            entry.find('.sub-navigation-entry-menu').removeClass('open');
            var id = parseInt($(this).parent().data('id'), 10);
            self._clients.load(id);
            $("input[data-id='" + id +"']").toggle();
            $("input[data-id='" + id +"']").focus();
            $("a[data-id='" + id +"']").toggle();
            $("input[data-id='" + id +"']").keydown(function(e) {
                if (e.keyCode == 13){
                    $("input[data-id='" + id +"']").blur();
                    var name = $("input[data-id='" + id +"']").val();
                    self._clients.load(id);
                    self._clients.updateActive(name).done(function () {
                        self.render();
                    }).fail(function () {
                        alert('Could not update client, not found');
                    });
                }
                if (e.keyCode == 27){
                    $("input[data-id='" + id +"']").blur();
                }
            });
            $("input[data-id='" + id +"']").blur(function () {
                $("input[data-id='" + id +"']").toggle();
                $("a[data-id='" + id +"']").toggle();
            });
        });


        // load a client
        $('#client-sub-navigation .client > a').click(function () {
            var id = parseInt($(this).parent().data('id'), 10);
            self._clients.load(id);
            self.render();
        });
    },
    render: function () {
        this.renderNavigation();
        //this.renderContent();
    }
};

var clients = new Clients(OC.generateUrl('/apps/owncollab_timetracker/clients'));
var view = new View(clients);
clients.loadAll().done(function () {
    view.render();
}).fail(function () {
    alert('Could not load clients');
});


});

})(OC, window, jQuery);
