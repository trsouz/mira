"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/view'
], function ($, _, Backbone, BaseView) {

    return BaseView.extend({

        el: '#qualquer_lugar',

        initialize: function(routes, abstracts, concrets, rules){
            this.routes = routes;
            this.abstracts = abstracts;
            this.concrets = concrets;
            this.rules = rules;

            this.routes.each(function(route){
                route.on('selection', this.abstract_selection, this);
                route.on('get_collection', this.render, this)
            }, this);

            this.concrets.invoke('load');

        },

        render: function(options){
            this.$el.empty();
            this.model = options.model;
            this.abstract.getHtml(this.$el, this.model);

        },

        widgets_selection: function(model, request, device){
            var widgets_abstract = this.abstract.getAllChildren();
            this.concrete.mapWidgets(widgets_abstract, model, request, device);
        },

        abstract_selection: function(options){
            this.abstract = this.abstracts.get(options.name);
            this.concrete = this.concrets.get(options.name);
        }

    });

});