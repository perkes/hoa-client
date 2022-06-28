/**
 * Created by thurs on 4/12/22.
 */

define(["text!../../../menus/actualizarNoticias.html!strip", 'ui/popups/popup'], function (DOMdata, PopUp) {

    class ActualizarNoticias extends PopUp {
        constructor(game) {

            var options = {
                width: 500,
                height: 400,
                minWidth: 250,
                minHeight: 300
            };

            super(DOMdata, options);

            this.game = game;
            this.$noticias = $("#nuevasNoticias");
            this.$botonEnviar = $("#noticiasClanBotonEnviar");
            this.$botonCancelar = $("#noticiasClanBotonCancelar");

            this.initCallbacks();
        }

        show() {
            super.show();
        }

        initCallbacks() {
            var self = this;

            this.$botonEnviar.click(function () {
                self.game.client.sendGuildUpdateNews(self.$noticias.val());
                self.hide();
            });

            this.$botonCancelar.click(function () {
                self.hide();
            });
        }

    }

    return ActualizarNoticias;
});