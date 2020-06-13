var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "hpqcbgfjtpgjnrwj",
    publicKey: "jpdnvpxfvhm89r35",
    privateKey: "ae492da32f8f3d7e1178d7ec65b355fb"
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amountFromTheClient
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    });
}