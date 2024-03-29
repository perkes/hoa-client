/**
 * Created by horacio on 3/24/16.
 */

define(["text!../../../menus/boveda.html!strip", 'ui/popups/popup', 'ui/game/itemgrid'], function (DOMdata, PopUp, ItemGrid) {

    class Boveda extends PopUp {
        constructor(game, acciones) {
            var options = {
                width: 620,
                height: 520,
                minWidth: 250,
                minHeight: 200
            };
            super(DOMdata, options);
            this.game = game;
            this.acciones = acciones;

            this.shopGrid = new ItemGrid("bovedaGridComprar",40);
            this.userGrid = new ItemGrid("bovedaGridVender",20);
            this.initCallbacks();
            this.completarLabels("","","","","","");
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
        }

        hide(incomingFromServer) {
            super.hide();
            if (!incomingFromServer) {
                this.acciones.cerrarBoveda();
            }
        }

        cambiarSlotRetirar(Slot, Amount, numGrafico, objName) {
            this.shopGrid.modificarSlot(Slot, Amount, numGrafico, objName, false, true);
        }

        cambiarSlotDepositar(Slot, Amount, numGrafico, objName) {
            this.userGrid.modificarSlot(Slot, Amount, numGrafico, objName, false, true);
        }

        borrarSlotRetirar(slot) {
            this.shopGrid.borrarItem(slot);
        }

        borrarSlotDepositar(slot) {
            this.userGrid.borrarItem(slot);
        }

        setOroDisponible(oro) {
            $("#bovedaOroDisponibleLabel").text("AVAILABLE GOLD");
            $("#bovedaOroDisponibleVal").text(oro);
        }

        initCallbacks() {
            var self = this;

            $("#bovedaBotonRetirarOro").click(function () {
                var inputCantidad = $("#bovedaInputCantidadOro").val();
                if (!isNaN(inputCantidad)) {
                    if (inputCantidad > 0) {
                        self.acciones.retirarOro(inputCantidad);
                    }
                }
            });

            $("#bovedaBotonDepositarOro").click(function () {
                var inputCantidad = $("#bovedaInputCantidadOro").val();
                if (!isNaN(inputCantidad)) {
                    if (inputCantidad > 0) {
                        self.acciones.depositarOro(inputCantidad);
                    }
                }
            });

            $("#bovedaBotonRetirarItem").click(function () {
                var slot = self.shopGrid.getSelectedSlot();
                if (slot) {
                    var inputCantidad = $("#bovedaInputCantidadItem").val();
                    if (isNaN(inputCantidad) || (inputCantidad < 0) || !inputCantidad) {
                        inputCantidad = 1;
                    }
                    self.acciones.retirarItem(slot, inputCantidad);
                }
            });

            $("#bovedaBotonDepositarItem").click(function () {
                var slot = self.userGrid.getSelectedSlot();
                if (slot) {
                    var inputCantidad = $("#bovedaInputCantidadItem").val();
                    if (isNaN(inputCantidad) || (inputCantidad < 0) || !inputCantidad) {
                        inputCantidad = 1;
                    }
                    self.acciones.depositarItem(slot, inputCantidad);
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

            this.completarLabels(item.objName.toUpperCase(), minLabel, minVal, maxLabel, maxVal);
        }

        completarLabels(nombreVal, minLabel, minVal, maxLabel, maxVal) {
            if (!minLabel) {
                minVal = "";
            }
            if (!maxLabel) {
                maxVal = "";
            }
            
            $('#bovedaNombreVal').text(nombreVal);
            $('#bovedaMinLabel').text(minLabel);
            $('#bovedaMinVal').text(minVal);
            $('#bovedaMaxLabel').text(maxLabel);
            $('#bovedaMaxVal').text(maxVal);
        }
    }

    return Boveda;
});