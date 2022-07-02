define(['../utils/util', 'storage/storage', 'json!../../config.json'], function (Utils, Storage, config) {
    class Wallet {

        constructor() {
            this.storage = new Storage();
        }

        get tokenAddresses() {
            return this.storage.getItem('token_addresses', null);
        }

        get tokenImages() {
            return this.storage.getItem('token_images', null);
        }

        async signToken(message) {
            const encodedMessage = new TextEncoder().encode(message);
            var signedMessage;
            if (window.solana) {
                signedMessage = await window.solana.request({
                    method: "signMessage",
                    params: {
                        message: encodedMessage,
                        display: "hex",
                    },
                });
            } else {
                signedMessage = await window.solflare.signMessage(encodedMessage, 'utf8');
                signedMessage.signature = Utils.encode_b58(Utils.toHexString(signedMessage.signature));
            }
            
            return signedMessage;
        }

        async getAddress(callback) {
            if (window.solana) {
                const resp = await window.solana.connect();
                callback(resp.publicKey.toString());
                //window.solana.connect({onlyIfTrusted: false}).then(() => {
                 //   callback(window.solana.publicKey.toString());
                //});
            } else {
                window.solflare.connect().then(() => {
                    callback(window.solflare.publicKey.toString());
                });
            }
        }

        clearCharacters() {
            this.storage.removeItem('token_addresses');
            this.storage.removeItem('token_images');
        }

        getCharacters(callback) {
            var promises = [];
            var token_images = Object();
            var token_addresses = Object();
            var self = this;
            var wallet = '';

            if (window.solana) {
                wallet = 'solana';
            } else {
                wallet = 'solflare';
            }
            console.log(wallet);
            window[wallet].connect().then(() => {
                var wallet_address = window[wallet].publicKey.toString();
                var tokens_url = 'https://public-api.solscan.io/account/tokens?account=' + wallet_address;
                $.ajax({
                    url: tokens_url,
                    type: 'GET',
                    success: function(result) {
                        var arrayLength = result.length;
                        for (var i = 0; i < arrayLength; i++) {
                            if (result[i]['tokenAmount']['amount'] == 0) {
                                continue;
                            }

                            var tokenAddress = result[i]['tokenAddress'];
                            var url = 'https://api.solscan.io/account?address=' + tokenAddress;
                            var promise = $.ajax({
                                url: url,
                                type: 'GET',
                                success: function(resp, status) {
                                    try {
                                        if (status == 'success') {
                                            if (resp['data']['metadata']['updateAuthority'] == 'C1PTKRiUZncRUMyUtek2f8AZR6kjnfBgXTRTXUJafWRA') {
                                                var nft_number = resp['data']['tokenInfo']['name'].split('#')[1];
                                                var nft_name = resp['data']['metadata']['data']['name'];
                                                token_addresses[nft_name] = resp['data']['account']; 
                                                token_images[nft_name] = 'https://' + config.ip + ':' + config.http_port + '/play/images/' + nft_number + '.png';
                                            }
                                        }
                                    } catch(error) {

                                    }
                                }
                            });

                            promises.push(promise);
                        }

                        Promise.all(promises).then(data => {
                            self.storage.setItem('token_addresses', token_addresses);
                            self.storage.setItem('token_images', token_images);
                            callback(token_addresses, token_images);
                        });
                    }
                });
                }
            );
        }
    }

    return Wallet;
});
