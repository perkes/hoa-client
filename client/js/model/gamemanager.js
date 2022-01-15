/**
 * Created by horacio on 5/3/16.
 */

define(['model/game', 'model/intervalos', 'model/acciones', 'model/comandoschat'], function (Game, Intervalos, Acciones, ComandosChat) {

    class GameManager {
        constructor(assetManager, renderer) {
            this.renderer = renderer; // temporal, pasarselo directamente al constructor de game ?
            this.assetManager = assetManager;
            this.game = new Game(assetManager);

            this.intervalos = new Intervalos();
            this.acciones = new Acciones(this.game, this.intervalos);
            this.comandosChat = new ComandosChat(this.game, this.acciones);
        }

        setup(client, gameUI) {
            this.game.setup(client, gameUI, this.renderer, this.assetManager.audio);
        }

        resetGame(escala) {
            this.renderer.clean(escala);
            var ui = this.game.gameUI;
            var client = this.game.client;
            
            this.assetManager.audio.reset();
            this.game.init(this.assetManager);
            this.game.setup(client, ui, this.renderer, this.assetManager.audio);
        }

    }
    return GameManager;
});