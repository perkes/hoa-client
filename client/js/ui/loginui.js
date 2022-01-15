/**
 * Created by horacio on 4/6/16.
 */

define(['utils/charcodemap'], function (CharcodeMap) {
    class LoginUI {

        setBotonJugarCallback(cb) {
            $('#botonConectar').click(function () {
                cb();
            });
        }

        setPlayButtonState(enabled) {
            var $playButton = $('#botonConectar');

            if (enabled) {
                $playButton.prop('disabled', false);
            } else {
                $playButton.prop('disabled', true);
            }
        }
    }

    return LoginUI;
});
