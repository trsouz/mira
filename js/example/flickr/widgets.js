"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'mira/helper',
    'mira/widgets/bootstrap-base',
    'example/flickr/jquery.lightSlider.min',
    'example/flickr/jquery.collagePlus.min'
], function ($, _, Backbone, Helper, BootstrapBase, lightSlider, collage) {

    var flickr = {
        FlickrGallery : function($parent, name, $context, options){
            var new_options = _.defaults(options, {
                    tag: 'ul'
                });
            var ret = BootstrapBase.Simple($parent, name, $context, new_options);

            $context.$dataObj.on('complete', function(opt){
                ret.$children.lightSlider({
                    gallery: true,
                    item: 1,
                    vertical: true,
                    verticalHeight: 295,
                    vThumbWidth: 75,
                    thumbItem: 5,
                    thumbMargin: 5,
                    slideMargin: 0
                });
            });

            return ret;
        },
        FlickrGalleryItem : function($parent, name, $context, options){
            var new_options = _.omit(_.defaults(options, {
                tag: 'li'
            }), 'img', 'link');
            var ret = BootstrapBase.Simple($parent, name, $context, new_options);
            var children = ret.$children;
            if(options.link){
                var link_options = _.defaults(options.link || {}, {
                    tag: 'a'
                });
                var link = BootstrapBase.Simple(ret.$children, name, $context, link_options);
                children = link.$children;
            }

            var img_options = _.defaults(options.img || {}, {
                tag: 'img'
            });
            var img = BootstrapBase.Simple(children, name, $context, img_options);

            return ret;

        },

        FlickrCollage: function($parent, name, $context, options) {
            var options = _.defaults(options, { class:'' });
            options.class += 'Collage';

            var ret = BootstrapBase.Simple($parent, name, $context, options);

            $data.on('complete', function(opt){
                ret.$children.collagePlus();
            });

            return ret;
        }


    };
    return flickr;
});