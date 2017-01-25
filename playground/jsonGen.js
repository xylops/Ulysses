// generator JSON info at http://www.json-generator.com/
//client generator
[
    '{{repeat(800)}}',
    {
        _id: '{{objectId()}}',
        id: '{{floating(1000, 4000, 2, "0,0")}}',
        name: '{{firstName()}} {{surname()}}',
        phone: '+1 {{phone()}}',
        address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
        delieverytime:'{{date(new Date(2014, 0, 1), new Date(), "hh:mm")}} - {{date(new Date(2014, 0, 1), new Date(), "hh:mm")}}',
        paymentMethod: function (tags) {
            var method = ['COD', 'PAYPAL', '30DAYS'];
            return method[tags.integer(0, method.length - 1)];
        },
        location:'{{state()}}'
    }
]
