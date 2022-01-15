define(['model/gamemanager', 'view/renderer', 'network/gameclient', 'utils/token_manager'], function (GameManager, Renderer, GameClient, TokenManager) {
    class App {
        constructor(assetManager, uiManager, settings) {
            this.assetManager = assetManager;
            this.uiManager = uiManager;
            this.client = null;
            this.ready = false;
            this.settings = settings;
            this.token_manager = new TokenManager();
        }

        _initLoginCallbacks() {
            var self = this;
            this.uiManager.loginUI.setBotonJugarCallback(function () {
                self.setElegirPJ();
            });
        }

        _initElegirPjCallbacks() {
            var self = this;
            this.uiManager.elegirPjUI.setBotonVolverCallback(function () {
                self.uiManager.setLoginScreen();
            });
        }

        _initClientCallbacks(client) {
            var self = this;

            client.setDisconnectCallback(function () {
                self.uiManager.setElegirPjScreen();
                self.assetManager.audio.stopMusic();
                self.gameManager.resetGame(self.uiManager.escala);
                self.starting = false;
            });

            client.setLogeadoCallback(function () {
                self.gameManager.game.start();
                self.uiManager.setGameScreen();
                self.starting = false;
            });
        }

        inicializarGame() {
            var renderer = new Renderer(this.assetManager, this.uiManager.escala);
            this.gameManager = new GameManager(this.assetManager, renderer);

            var gameUI = this.uiManager.inicializarGameUI(this.gameManager, this.settings);
            this.client = new GameClient(this.gameManager.game, this.uiManager, gameUI);
            this._initClientCallbacks(this.client);
            this.gameManager.setup(this.client, gameUI);
            this.ready = true;
        }

        setElegirPJ() {
            this.uiManager.elegirPjUI.inicializar();
            var self = this;

            this.token_manager.getCharacters(function(token_addresses, token_images) {
                self.uiManager.setElegirPjScreen();
                self.uiManager.elegirPjUI.showCharacters(token_addresses, token_images);
                self.uiManager.elegirPjUI.setBotonJugarCallback(function () {
                    var nft_address = self.uiManager.elegirPjUI.currentNFTAddress;
                    self.gameManager.game.inicializar(null);
                    self.token_manager.getToken(nft_address, function(token) {
                        self.client.intentarLogear(token, nft_address);
                    });
                });
            });
        }

        start() {
            this._initLoginCallbacks();
            this.uiManager.hideIntro();
            this.inicializarGame();

            log.info("App initialized.");
        }
    }

    return App;
});