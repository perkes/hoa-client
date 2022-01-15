/**
 * Created by thurs on 21/12/21.
 */

 define([], function () {
    class ElegirPjUI {

        constructor() {
            this.currentCharacterAddress = null;
            this.loaded = false;
        }

        inicializar() {
            
        }

        get currentNFTAddress() {
            return this.currentCharacterAddress;
        }

        setBotonJugarCallback(cb) {
            var self = this;
            $('#botonJugar').click(function () {
                cb(self.currentCharacterAddress);
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

        showCharacters(token_addresses, token_images) {
            if (this.loaded)
                return;
            
            var table = '';
            var class_name = 'item active';
            var self = this;

            for (let i in token_images) {
                if (token_images.hasOwnProperty(i)) {
                    var id = i.replace('#', '').replace(' ', '_');
                    table += '<div class="' + class_name + '"><img id="' + id + '" src="' + token_images[i] + '"></div>';
                }
                class_name = 'item';
            }

            $('.carousel-inner').append(table);

            var token_ids = Object.keys(token_images);
            var total_characters = token_ids.length;
            var i = 1;

            this.currentCharacterAddress = token_addresses[token_ids[0]];
            $('#carousel_pcs').on('slide.bs.carousel', function(e) {
                self.currentCharacterAddress = token_addresses[token_ids[i%total_characters]];
                i += 1;
            });

            this.loaded = true;
        }
    }

    return ElegirPjUI;
});