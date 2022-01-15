define(['utils/wallet', 'json!../../config.json'], function (Wallet, config) {
    class TokenManager {
        constructor() {
            this.url = 'http://' + config.ip_auth + ':' + config.port_auth;
            this.wallet = new Wallet();
            this.token = Object();
        }
        
        _activateToken(token, signature, callback) {
            var self = this;

            $.get(self.url + '/activate_token', {'token': token, 'signature': signature}, function(resp) {
                callback(token);
            });
        }
        
        _requestToken(wallet_address, nft_address, callback) {
            var self = this;
            $.get(self.url + '/request_token', {'wallet_address': wallet_address, 'nft_address': nft_address}, function(resp) {  
                self.token[nft_address] = resp['token'];
                self.wallet.signToken(self.token[nft_address]).then((resp) => {
                    self._activateToken(self.token[nft_address], resp['signature'], callback);
                });
            });
        }

        getCharacters(callback) {
            if (this.wallet.tokenAddresses) {
                callback(this.wallet.tokenAddresses, this.wallet.tokenImages);
            } else {
                this.wallet.getCharacters(callback);
            }
        }

        getToken(nft_address, callback) {
            if (this.token[nft_address]) {
                callback(this.token[nft_address]);
            } else {
                this._requestToken(this.wallet.address, nft_address, callback);
            }
        }
    }

    return TokenManager;
});    