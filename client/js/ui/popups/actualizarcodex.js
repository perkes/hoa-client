/**
 * Created by thurs on 4/19/22.
 */

 define(["text!../../../menus/actualizarClan.html!strip", 'ui/popups/popup', 'utils/util'], function (DOMdata, PopUp, Utils) {

    class ActualizarCodex extends PopUp {
        constructor(game) {

            var options = {
                width: 500,
                height: 400,
                minWidth: 250,
                minHeight: 300
            };

            super(DOMdata, options);

            this.game = game;
            this.$desc = $("#actualizarClanDescripcion");
            this.$botonActualizar = $("#actualizarClanBotonActualizar");
            this.$botonCancelar = $("#actualizarClanBotonCancelar");
            this.prefixCodex = "actualizarClanCodex_";

            this.initCallbacks();
        }

        show(targetClan) {
            super.show();
            this.game.client.sendGuildRequestDetails(targetClan);
            this.clan = targetClan;
        }

        setClanInfo(GuildName, URL, Codex, GuildDesc) {
            $("#actualizarClanNombre").text(GuildName);
            $("#actualizarClanWebsite").text(URL);
            $("#actualizarClanDescripcion").val(GuildDesc);

            var codex_lines = Codex.split('\n');
            let NUMBER_OF_LINES = 8;
            for (let i = 0; i < NUMBER_OF_LINES; i++) {
                $('#' + this.prefixCodex + i).val(codex_lines[i]);
            }
        }

        _getCodexText() {
            let NUMBER_OF_LINES = 8;
            let MINIMUM_LINES = 4;
            let result = [];
            let completedLines = 0;
            for (let i = 0; i < NUMBER_OF_LINES; i++) {
                let $inputLine = $('#' + this.prefixCodex + i);
                let text = $inputLine.val();
                if (text) {
                    completedLines++;
                    result.push(text);
                }
            }
            if (completedLines < MINIMUM_LINES) {
                return false;
            }
            return Utils.joinNullArray(result);
        }

        initCallbacks() {
            var self = this;

            this.$botonActualizar.click(function () {
                var codex_text = self._getCodexText();
                if (codex_text) {
                    self.game.client.sendClanCodexUpdate(self.$desc.val(), codex_text);
                    self.hide();
                }
            });

            this.$botonCancelar.click(function () {
                self.hide();
            });
        }

    }

    return ActualizarCodex;
});