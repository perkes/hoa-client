/**
 * Created by horacio on 7/9/16.
 */

define([], function () {

    class SettingsClan {
        constructor(actualizarNoticiasCb, actualizarCodexCb) {
            this.actualizarNoticiasCb = actualizarNoticiasCb;
            this.actualizarCodexCb = actualizarCodexCb;
            this.initCallbacks();
        }

        initCallbacks() {
            var self = this;
            $('#clanesEditarNoticias').click(function () {
                self.actualizarNoticiasCb();
            });

            $('#clanesEditarCodex').click(function () {
                self.actualizarCodexCb();
            });
        }
    }

    return SettingsClan;
});
