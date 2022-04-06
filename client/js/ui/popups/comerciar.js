/**
 * Created by horacio on 2/22/16.
 */

define(["text!../../../menus/comerciar.html!strip", 'ui/popups/popup', 'ui/game/itemgrid', 'jquery-ui'], function (DOMdata, PopUp, ItemGrid) {

    class Comerciar extends PopUp {
        constructor(game, acciones) {

            var options = {
                width: 615,
                height: 445,
                minWidth: 250,
                minHeight: 200
            };
            super(DOMdata, options);

            this.game = game;
            this.acciones = acciones;

            this.shopGrid = new ItemGrid("comerciarGridComprar",20);
            this.userGrid = new ItemGrid("comerciarGridVender",20);

            this.initCallbacks();
        }

        show() {
            super.show();
            var self = this;
            this.userGrid.clear();
            this.game.inventario.forEachSlot(
                function (slot) {
                    var numGraf = self.game.assetManager.getNumCssGraficoFromGrh(slot.grh);
                    self.userGrid.modificarSlot(slot.numero, slot.cantidad, numGraf, slot.objName, false, true);
                });
            this.shopGrid.deselect();
            this.userGrid.deselect();
            this.completarLabels("", "", "", "", "", "", "", "");
        }

        hide(incomingFromServer) {
            super.hide();
            this.shopGrid.clear();
            if (!incomingFromServer) { // TODO: (en comerciar y en boveda!!) que el cliente no le tenga que mandar al sv cuando cierra, esta accion no deberia estar
                this.acciones.cerrarComerciar();
            }
        }

        cambiarSlotCompra(Slot, Amount, numGrafico, objName, canUse) {
            this.shopGrid.modificarSlot(Slot, Amount, numGrafico, objName, false, canUse);
        }

        cambiarSlotVenta(Slot, Amount, numGrafico, objName, canUse) {
            this.userGrid.modificarSlot(Slot, Amount, numGrafico, objName, false, true);
        }

        borrarSlotCompra(slot) {
            this.shopGrid.borrarItem(slot);
        }

        borrarSlotVenta(slot) {
            this.userGrid.borrarItem(slot);
        }

        initCallbacks() {
            var self = this;

            $("#comerciarBotonComprar").click(function () {
                var slot = self.shopGrid.getSelectedSlot();
                if (slot) {
                    var inputCantidad = $("#comerciarInputCantidad").val();
                    if (!isNaN(inputCantidad)) {
                        if (inputCantidad > 0) {
                            self.acciones.comprar(slot, inputCantidad);
                        }
                    }
                }
            });

            $("#comerciarBotonVender").click(function () {
                var slot = self.userGrid.getSelectedSlot();
                if (slot) {
                    var inputCantidad = $("#comerciarInputCantidad").val();
                    if (!isNaN(inputCantidad)) {
                        if (inputCantidad > 0) {
                            self.acciones.vender(slot, inputCantidad);
                        }
                    }
                }
            });

            this.shopGrid.setSelectionCallback(
                function (slot) {
                    var item = self.game.inventarioShop.getSlot(slot);
                    self.displayItemData(item);
                });

            this.userGrid.setSelectionCallback(
                function (slot) {
                    var item = self.game.inventario.getSlot(slot);
                    self.displayItemData(item);
                });
        }

        clearDom() {
            super.clearDom();
            $('#comerciarInputCantidad').val(1);
        }

        displayItemData(item) {
            var minLabel = "";
            var maxLabel = "";

            if (item.minDef) {
                minLabel = "MIN DEFENSE";
            }
            if (item.minHit) {
                minLabel = "MIN HIT";
            }

            if (item.maxDef) {
                maxLabel = "MAX DEFENSE";
            }
            if (item.maxHit) {
                maxLabel = "MAX HIT";
            }

            var minVal = item.minDef || item.minHit;
            var maxVal = item.maxDef || item.maxHit;

            this.completarLabels(item.objName.toUpperCase(), item.precio, "USABLE", item.canUse, minLabel, minVal, maxLabel, maxVal);
        }

        completarLabels(nombreVal, precioVal, canUseLabel, canUseVal, minLabel, minVal, maxLabel, maxVal) {
            if (!minLabel) {
                minVal = "";
            }
            if (!maxLabel) {
                maxVal = "";
            }

            var usableVal = "NO";
            if (canUseVal) {
                usableVal = "YES";
            }

            if (canUseLabel == "") {
                usableVal = "";
            }

            $('#comerciarPrecio').text("PRICE");
            $('#comerciarNombre').text("NAME");
            $('#comerciarPrecioValor').text(precioVal);
            $('#comerciarUsable').text(canUseLabel);
            $('#comerciarUsableValor').text(usableVal);
            $('#comerciarNombreValor').text(nombreVal);
            $('#comerciarMin').text(minLabel);
            $('#comerciarMinValor').text(minVal);
            $('#comerciarMax').text(maxLabel);
            $('#comerciarMaxValor').text(maxVal);
        }
    }

    return Comerciar;
});
