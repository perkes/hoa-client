define([], function () {
    class Wallet {

        get address() {
            return window.solana.publicKey.toString();
        }

        async signToken(message) {
            const encodedMessage = new TextEncoder().encode(message);
            const signedMessage = await window.solana.request({
                method: "signMessage",
                params: {
                    message: encodedMessage,
                    display: "hex",
                },
            });
            return signedMessage;
        }

        getCharacters(callback) {
            var promises = [];
            var token_images = Object();
            var token_addresses = Object();
            window.solana.connect({onlyIfTrusted: false}).then(() => {
                var wallet_address = window.solana.publicKey.toString();
                var tokens_url = 'https://public-api.solscan.io/account/tokens?account=' + wallet_address;
                $.ajax({
                    url: tokens_url,
                    type: 'GET',
                    success: function(result) {
                        var arrayLength = result.length;
                        for (var i = 0; i < arrayLength; i++) {
                            var tokenAddress = result[i]['tokenAddress'];
                            var url = 'https://api.solscan.io/account?address=' + tokenAddress;
                            $.get(url, function(resp, status) {
                                try {
                                    if (status == 'success') {
                                        if (resp['data']['metadata']['updateAuthority'] == 'C1PTKRiUZncRUMyUtek2f8AZR6kjnfBgXTRTXUJafWRA') {
                                            var arweave_url = resp['data']['metadata']['data']['uri'];
                                            token_addresses[resp['data']['metadata']['data']['name']] = resp['data']['account']; 
                                            var promise = $.get(arweave_url, function(resp, status) {
                                                if (status == 'success') {
                                                    token_images[resp['name']] = resp['image'];
                                                }
                                            });
                                            promises.push(promise);
                                        }
                                    }
                                } catch(error) {

                                }
                            });
                        }
                        Promise.all(promises).then(data => {
                            setTimeout(function()
                            {
                                callback(token_addresses, token_images);
                            }, 5000);
                        });
                    }
                });
                }
            );
        }
    }

    return Wallet;
});