"use strict";

var rules = [

];

var selection = [
    {
        when: '$data.bairro !== "undefined" && $data.tipo !== "undefined"',
        abstract: 'detalhe',
        concrete: 'detalhe'
    }
];

var interface_abstracts = [
    {
        name: "landing",
        widgets: [{
            name: "container",
            children: [{
                name: "head",
                children: [{name: "title"}]
            },
                {
                    name: "content",
                    children: [{
                        name: "items",
                        datasource: "url:/api/imovel",
                        children: [{
                            name: "item",
                            children: [{
                                name: "tipo",
                                children: [{
                                    name: "link",
                                    children: [
                                        {name: "nome"},
                                        {name: "bairro"}
                                    ]
                                }]
                            }]
                        }]
                    }]
                }]
        }]
    },
    {
        name: "detalhe",
        widgets: [{
            name: "carousel",
            children: [{name: "carousel_item"}],
            datasource: "$data.fotos"
        },
            {
                name: "content",
                children: [{
                    name: "nome"
                },
                    {
                        name: "detalhes",
                        children: [{
                            name: "row",
                            children: [{
                                name: "localizacao_box",
                                children: [{
                                    name: "localizacao_title"
                                },
                                    {
                                        name: "localizacao_lista",
                                        children: [{name: "localizacao_item"}],
                                        datasource: "$data.localizacao"
                                    }]
                            },
                                {
                                    name: "negociacao_box",
                                    children: [{
                                        name: "negociacao_title"
                                    },
                                        {
                                            name: "negociacao_lista",
                                            children: [{name: "negociacao_item"}],
                                            datasource: "$data.negociacao"
                                        }]
                                }]
                        },
                            {name: "descricao_title"},
                            {name: "descricao"}]
                    },
                    {
                        name: "mapa_box",
                        children: [{name: "mapa"}]
                    }]
            }]
    }
];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: 'Imóvel'}
];

var concrete_interface = [
    {
        name: "landing",
        head: head,
        maps: [
            { name: "container", class: 'container' },
            { name: "head", class: 'jumbotron' },
            { name: "title", class: 'text-center', tag: 'h1', value: 'Escolha seu imóvel'},
            { name: "content", class: 'row col-md-10 col-md-offset-1' },
            { name: "items" },
            { name: "item", class: 'col-md-6'},
            { name: "tipo", class: 'panel-body alert-info alert', when: '$data.tipo === "Aluguel"'  },
            { name: "tipo", class: 'panel-body alert-warning alert', when: '$data.tipo === "Venda"'  },
            { name: "tipo", class: 'panel-body alert-success alert', when: '$data.tipo === "Lançamento"' },
            { name: "link", href: 'navigate("/api/imovel/" + $data.id)', tag: 'a'},
            { name: "nome", class: 'lead text-center', value: '$data.nome', tag: 'h3'},
            { name: "bairro", class: 'text-center', value: '$data.bairro', tag: 'p'}
        ]
    },
    {
        name: "detalhe",
        head: head,
        maps: [
            { name: "carousel", widget: 'BootstrapCarousel' },
            { name: "carousel_item", widget: 'BootstrapCarouselItem', value: '$data.desktop' },
            { name: "carousel_item", widget: 'BootstrapCarouselItem', value: '$data.tablet', when: '$env.device.tablet == true' },
            { name: "carousel_item", widget: 'BootstrapCarouselItem', value: '$data.mobile', when: '$env.device.mobile == true' },
            { name: "content", class: 'container' },
            { name: "nome", tag: 'h1', class: 'alert-info alert text-center', when: '$data.tipo === "Aluguel"', value: '$data.nome'},
            { name: "nome", tag: 'h1', class: 'alert-warning alert text-center', when: '$data.tipo === "Venda"', value: '$data.nome'},
            { name: "nome", tag: 'h1', class: 'alert-success alert text-center', when: '$data.tipo === "Lançamento"', value: '$data.nome'},
            { name: "detalhes", class: 'col-md-8'},
            { name: "row", class: 'row well' },
            { name: "localizacao_box", class: 'col-md-6' },
            { name: "localizacao_title", value: 'Localização', tag: 'h3'},
            { name: "localizacao_lista", tag: 'ul' },
            { name: "localizacao_item", value: '$data.item', tag: 'li' },
            { name: "negociacao_box", class: 'col-md-6' },
            { name: "negociacao_title", value: '"Contrato de locação', tag: 'h3', when: '$data.tipo === "Aluguel"' },
            { name: "negociacao_title", value: 'Formas de pagamento', tag: 'h3', when: '$data.tipo === "Venda"' },
            { name: "negociacao_title", value: 'Lançamento', tag: 'h3', when: '$data.tipo === "Lançamento"' },
            { name: "negociacao_lista", tag: 'ul' },
            { name: "negociacao_item", value: '$data.item', tag: 'li'},
            { name: "descricao_title", class: 'text-center', tag: 'h3' },
            { name: "descricao", value: '$data.aluguel', when: '$data.tipo === "Aluguel"' },
            { name: "descricao", value: '$data.venda', when: '$data.tipo === "Venda"' },
            { name: "descricao", value: '$data.lancamento', when: '$data.tipo === "Lançamento"' },
            { name: "mapa_box", class: 'col-md-4' },
            { name: "mapa", widget: 'MapDynamic', address: '$data.bairro', options: {
                zoom: 13
            } },
            { name: "mapa", widget: 'MapStatic', value: '$data.bairro', when: '$env.device.desktop == false'}
        ]
    }
];

if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Index() {
            console.log('entrou');
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {
    exports.ajaxSetup = {};
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


