/**
 * Created by horacio on 3/27/16.
 */

define(['jquery-ui'], function () {

    class PopUp {
        constructor(DOMdata, addiotionalOptions, general, modal) { // los pop ups generales se ven en todas las pantallas (no solo juego) y estan centrados en el medio
            if (!DOMdata) {
                throw new Error("DOMdata required");
            }
            this.$this = $(DOMdata);

            this.parentID = "#container";
            var self = this;
            this.options = {
                appendTo: self.parentID,
                autoOpen: false,
                modal: modal,
                dialogClass: 'dialog_default',
                close: function (event, ui) {
                    self.hide();
                }
            };
            $.extend(this.options, addiotionalOptions);
            if (!general) {
                var position = {position: {my: "center", at: "left+40%", of: "#container"}};
                $.extend(this.options, position);
            }

            this._createDom();

            this.visible = false;
        }

        _createDom() {
            this.$this.dialog(this.options).parent().draggable("disable").resizable("disable");
            this._checkDuplicate();
        }

        _checkDuplicate() {
            let myID = this.$this.attr('id');
            this.$this.parent().siblings(".ui-dialog").each(function () {
                if ($(this).find('#' + myID).length) {
                    throw new Error("pop up inicializado dos veces: " + myID);
                }
            });
        }


        initButtonsSound(playSoundCallback){
            this.$this.find("button").click(function(event) {
                playSoundCallback($(this));
            });
        }

        _inicializarTabDesactivable($tab) {
            $tab.click(function () {
                if ($(this).hasClass('disabled')) {
                    return false;
                }
            });
        }

        _activarTab($tab) {
            $tab.removeClass('disabled');
        }

        _desactivarTab($tab) {
            $tab.addClass('disabled');
        }

        getDomElement() {
            return this.$this;
        }

        show() {
            this.clearDom();
            this.$this.dialog("open");
            this.visible = true;
        }

        hide() { // OJO, en algunos se cierra con el comando que viene del server (y se puede cerrar 2 veces)
            this.$this.dialog("close");
            this.visible = false;
        }

        clearDom() { // todo: ver esto
            //this.$this.find('span').text('');
            this.$this.find('input').val('');
            this.$this.find('input[type=number]').val(1);
        }

    }
    return PopUp;
});