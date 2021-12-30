define(['model/gamemanager', 'view/renderer', 'network/gameclient', 'utils/wallet'], function (GameManager, Renderer, GameClient, Wallet) {
    class App {
        constructor(assetManager, uiManager, settings) {
            this.assetManager = assetManager;
            this.uiManager = uiManager;
            this.client = null;
            this.ready = false;
            this.settings = settings;
            this.wallet = new Wallet();
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

        _initCrearPjCallbacks() {
            var self = this;
            this.uiManager.crearPjUI.setBotonTirarDadosCallback(function () {
                self.client.sendThrowDices();
            });
            this.uiManager.crearPjUI.setBotonVolverCallback(function () {
                self.uiManager.setLoginScreen();
            });
            this.uiManager.crearPjUI.setBotonCrearCallback(function (nombre, password, raza, genero, clase, cabeza, mail, ciudad) {
                self.startGame(true, nombre, password, raza, genero, clase, cabeza, mail, ciudad);
            });
        }

        _initClientCallbacks(client) {
            var self = this;

            client.setDisconnectCallback(function () {
                self.uiManager.setLoginScreen();
                self.assetManager.audio.stopMusic();
                self.gameManager.resetGame(self.uiManager.escala);
                self.starting = false;
            });

            client.setLogeadoCallback(function () {
                self.gameManager.game.start();
                self.uiManager.setGameScreen();
                self.starting = false;
            });

            client.setDadosCallback(function (Fuerza, Agilidad, Inteligencia, Carisma, Constitucion) {
                self.uiManager.crearPjUI.updateDados(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion);
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
            this.uiManager.loginUI.setCrearButtonState(false);
            var self = this;

            this.wallet.getCharacters(function(token_addresses, token_images) {
                self.uiManager.setElegirPjScreen();
                self.uiManager.elegirPjUI.showCharacters(token_images);
                self.addCharacterLoginHooks(token_addresses, token_images);
            });
        }

        addCharacterLoginHooks(token_addresses, token_images) {
            var self = this;
            for (let i in token_images) {
                if (token_images.hasOwnProperty(i)) {
                    var id = i.replace('#', '').replace(' ', '_');
                    $('#' + id).click(function () {
                        self.tryStartingGameNew(token_addresses[i]);
                    });
                }
            }
        }

        tryStartingGameNew(token_address) {
            var wallet_address = window.solana.publicKey.toString();
            this.gameManager.game.inicializar(null);
            this.client.intentarLogear(wallet_address, token_address);
        }

        setCrearPJ() {
            //this.setElegirPJ();
            this.uiManager.crearPjUI.inicializar();
            this.uiManager.loginUI.setCrearButtonState(false);
            var self = this;

            this.client.intentarCrearPersonaje(function () {
                self.uiManager.setCrearPJScreen();
                self.uiManager.loginUI.setCrearButtonState(true);
            });
        }

        tryStartingGame() {
            if (this.starting) {
                return;
            }

            log.info(" Trying to start game...");

            var username = this.uiManager.loginUI.getUsername();
            var userpw = this.uiManager.loginUI.getPassword();
            if (!this.validarLogin(username, userpw)) {
                return;
            }

            this.starting = true;
            this.uiManager.loginUI.setPlayButtonState(false);
            this.startGame(false, username, userpw);
        }

        startGame(newChar, username, userpw, raza, genero, clase, cabeza, mail, ciudad) {
            if (this.gameManager.game.started) {
                return;
            }
            this.gameManager.game.inicializar(username);
            if (!newChar) {
                this.client.intentarLogear(username, userpw);
            }
            else {
                this.client.sendLoginNewChar(username, userpw, raza, genero, clase, cabeza, mail, ciudad);
            }
        }

        start() {
            this._initLoginCallbacks();
            this.uiManager.hideIntro();
            this.inicializarGame();

            log.info("App initialized.");
        }

        validarLogin(username, userpw) {
            if (!username) {
                this.uiManager.showMensaje("Debes ingresar un usuario");
                return false;
            }

            if (!userpw) {
                this.uiManager.showMensaje("Debes ingresar un password");
                return false;
            }

            return true;
        }

    }
    return App;
});
