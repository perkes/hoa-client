/**
 * Created by thurs on 21/12/21.
 */

 define([], function () {
    class ElegirPjUI {
        constructor() {
            
        }

        inicializar() {

        }

        setBotonJugarCallback(cb) {
            $('#botonJugar').click(function () {
                cb();
            });
        }

        setBotonVolverCallback(cb) {
            var self = this;
            $('#crearBotonVolver').click(function () {
                cb();
            });
        }

        setPlayButtonState(enabled) {
            var $playButton = $('#botonJugar');

            if (enabled) {
                $playButton.prop('disabled', false);
            } else {
                $playButton.prop('disabled', true);
            }
        }

        mostrarPersonajes(token_images) {
            var table = '<tr>';
            for (let i in token_images) {
                if (token_images.hasOwnProperty(i)) {
                    var id = i.replace('#', '').replace(' ', '_');
                    table += '<td><img id="' + id + '" style="width:128px;height:128px;padding:10px;" src="' + token_images[i] + '" alt="character"></td>';
                }
            }
            table += '</tr>'
            $('#charactersTable').append(table);
        }
    }
    return ElegirPjUI;
});