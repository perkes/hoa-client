/**
 * Created by thurs on 2/24/22.
 */

define(["text!../../../menus/comerciarUsuarios.html!strip", 'ui/popups/popup', 'ui/game/itemgrid', 'jquery-ui'], function (DOMdata, PopUp, ItemGrid) {

    class ComerciarUsuarios extends PopUp {
        constructor(game, acciones) {

            var options = {
                width: 740,
                height: 525,
                minWidth: 740,
                minHeight: 525,
                maxWidth: 740,
                maxHeight: 525
            };
            super(DOMdata, options);

            this.game = game;
            this.acciones = acciones;

            this.inventory = new ItemGrid("comerciarUsuariosGridInventario", 20);
            this.userOfferGrid = new ItemGrid("comerciarUsuariosGridMiOferta",20);
            this.otherUserOfferGrid = new ItemGrid("comerciarUsuariosGridSuOferta",20);

            this.numItemsOfferGrid = 0;
            this.numItemsOtherUserOfferGrid = 0;

            this.userOfferNumSlots = new Object();
            this.userOfferAmounts = new Object();
            this.inventoryNumSlots = new Object();
            this.inventoryAmounts = new Object();
            this.indexToNumSlot = new Object();

            this.initCallbacks();
        }

        show() {
            super.show();
            var self = this;
            this.inventory.clear();
            this.game.inventario.forEachSlot(
                function (slot) {
                    var numGraf = self.game.assetManager.getNumCssGraficoFromGrh(slot.grh);
                    self.inventory.modificarSlot(slot.numero, slot.cantidad, numGraf, slot.objName, false, true);
                    self.inventoryAmounts[slot.objIndex] = slot.cantidad;
                    self.indexToNumSlot[slot.objIndex] = slot.numero;
                });

            this.userOfferGrid.clear();
            this.otherUserOfferGrid.clear();
            this.numItemsOfferGrid = 0;
            this.numItemsOtherUserOfferGrid = 0;
            
            $("#comerciarUsuariosOroRestante").text(this.game.atributos.oro.toString());
            $("#comerciarUsuariosInput").val(1);
            $("#comerciarUsuariosMiOfertaOro").text('0');
            $("#comerciarUsuariosSuOfertaOro").text('0');

            this.inventory.deselect();
            this.userOfferGrid.deselect();
            this.otherUserOfferGrid.deselect();
        }

        hide(incomingFromServer) {
            super.hide();
            if (!incomingFromServer) { // TODO: (en comerciar y en boveda!!) que el cliente no le tenga que mandar al sv cuando cierra, esta accion no deberia estar
                this.acciones.cerrarComerciar();
                this.game.client.sendUserCommerceEnd();     
            }
        }

        cambiarSlotInventario(Slot, Amount, numGrafico, objName) {
            this.inventory.modificarSlot(Slot, Amount, numGrafico, objName, false, true);
        }

        cambiarSlotOferta(Slot, Amount, numGrafico, objName) {
            this.numItemsOfferGrid += 1;
            this.userOfferGrid.modificarSlot(this.numItemsOfferGrid, Amount, numGrafico, objName, false, true);
        }

        cambiarSlotOfertaContraparte(Slot, Amount, numGrafico, objName, canUse) {
            this.numItemsOtherUserOfferGrid += 1;
            this.otherUserOfferGrid.modificarSlot(this.numItemsOtherUserOfferGrid, Amount, numGrafico, objName, false, canUse);
        }

        borrarSlotInventario(slot) {
            this.inventory.borrarItem(slot);
        }

        borrarSlotOferta(slot) {
            this.userOfferGrid.borrarItem(slot);
        }

        incrementarUserOfferAmount(objIndex) {
            var amount = parseInt($("#comerciarUsuariosInput").val());
            if (this.inventoryAmounts[objIndex] > amount) {
                if (this.userOfferAmounts[objIndex]) {
                    this.userOfferAmounts[objIndex] += amount;
                } else {
                    this.userOfferAmounts[objIndex] = amount;
                }
                this.inventoryAmounts[objIndex] -= amount;
            } else {
                if (this.userOfferAmounts[objIndex]) {
                    this.userOfferAmounts[objIndex] += this.inventoryAmounts[objIndex];
                } else {
                    this.userOfferAmounts[objIndex] = this.inventoryAmounts[objIndex];
                }
                this.inventoryAmounts[objIndex] = 0;
            }
        }

        decrementarUserOfferAmount(objIndex) {
            var amount = parseInt($("#comerciarUsuariosInput").val());
            if (this.userOfferAmounts[objIndex]) {
                if ((this.userOfferAmounts[objIndex] - amount) > 0) {
                    this.userOfferAmounts[objIndex] -= amount;
                    this.inventoryAmounts[objIndex] += amount;
                } else {
                    this.inventoryAmounts[objIndex] += this.userOfferAmounts[objIndex];
                    this.userOfferAmounts[objIndex] = 0;
                }
            }
        }

        mostrarOfertaContraparte(OfferSlot, ObjIndex, Amount, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, Price, CanUse, ObjName) {
            console.log(OfferSlot, ObjIndex, Amount, GrhIndex, ObjName);
            if (OfferSlot == 21) {
                $("#comerciarUsuariosSuOfertaOro").text(Amount.toString());
                return;
            }

            var numGrafico = this.game.assetManager.getNumCssGraficoFromGrh(GrhIndex);
            this.cambiarSlotOfertaContraparte(OfferSlot, Amount, numGrafico, ObjName, CanUse);
        }

        initCallbacks() {
            var self = this;

            $("#comerciarUsuariosBotonAgregarOro").click(function () {
                var oro_disponible = parseInt($("#comerciarUsuariosOroRestante").text());
                var oro_actual_oferta = parseInt($("#comerciarUsuariosMiOfertaOro").text());
                var oro_oferta = parseInt($("#comerciarUsuariosInput").val());

                if (oro_oferta <= 0) {
                    self.game.gameUI.showMensaje("An offer must be for an amount greater than zero.");
                    return;
                }

                oro_disponible -= oro_oferta;
                oro_actual_oferta += oro_oferta;

                if (oro_disponible >= 0) {
                    $("#comerciarUsuariosOroRestante").text(oro_disponible.toString());
                    $("#comerciarUsuariosMiOfertaOro").text(oro_actual_oferta.toString());
                } else {
                    self.game.gameUI.showMensaje("You don't have that amount.");
                }
            });
            
            $("#comerciarUsuariosBotonQuitarOro").click(function () {
                var oro_disponible = parseInt($("#comerciarUsuariosOroRestante").text());
                var oro_actual_oferta = parseInt($("#comerciarUsuariosMiOfertaOro").text());
                var oro_oferta = parseInt($("#comerciarUsuariosInput").val());

                if (oro_oferta <= 0) {
                    self.game.gameUI.showMensaje("An offer must be for an amount greater than zero.");
                    return;
                }

                oro_disponible += oro_oferta;
                oro_actual_oferta -= oro_oferta;

                if (oro_actual_oferta >= 0) {
                    $("#comerciarUsuariosOroRestante").text(oro_disponible.toString());
                    $("#comerciarUsuariosMiOfertaOro").text(oro_actual_oferta.toString());
                } else {
                    self.game.gameUI.showMensaje("You haven't offered that amount.");
                }
            });

            $("#comerciarUsuariosBotonAgregar").click(function () {
                var numSlot = self.inventory.getSelectedSlot();
                var slot = self.game.inventario.getSlot(numSlot);
                if (slot) {    
                    self.incrementarUserOfferAmount(slot.objIndex);
                    var numGrafico = self.game.assetManager.getNumCssGraficoFromGrh(slot.grh);
                    self.cambiarSlotOferta(numSlot, self.userOfferAmounts[slot.objIndex], numGrafico, slot.objName);
                    self.cambiarSlotInventario(numSlot, self.inventoryAmounts[slot.objIndex], numGrafico, slot.objName);
                    if (self.inventoryAmounts[slot.objIndex] == 0) {
                        self.borrarSlotInventario(numSlot);
                    }
                }
            });

            $("#comerciarUsuariosBotonQuitar").click(function () {
                var numSlot = self.userOfferGrid.getSelectedSlot();
                var slot = self.game.inventario.getSlot(numSlot);
                if (slot) {    
                    self.decrementarUserOfferAmount(slot.objIndex);
                    var numGrafico = self.game.assetManager.getNumCssGraficoFromGrh(slot.grh);
                    self.cambiarSlotOferta(numSlot, self.userOfferAmounts[slot.objIndex], numGrafico, slot.objName);
                    self.cambiarSlotInventario(numSlot, self.inventoryAmounts[slot.objIndex], numGrafico, slot.objName);
                    if (self.userOfferAmounts[slot.objIndex] == 0) {
                        self.borrarSlotOferta(numSlot);
                    }
                }
            });

            $("#comerciarUsuariosBotonConfirmar").click(function () {
                for (var index in self.userOfferAmounts) {
                    if (self.userOfferAmounts.hasOwnProperty(index)) {
                        var amount = self.userOfferAmounts[index];
                        var numSlot = self.indexToNumSlot[index];
                        self.game.client.sendUserCommerceOffer(numSlot, amount, numSlot);
                    }
                }

                var oro_actual_oferta = parseInt($("#comerciarUsuariosMiOfertaOro").text());

                if (oro_actual_oferta > 0) {
                    self.game.client.sendUserCommerceOffer(31, oro_actual_oferta, 21);
                }

                self.game.client.sendUserCommerceConfirm();
            });

            $("#comerciarUsuariosBotonAceptar").click(function () {
                self.game.client.sendUserCommerceOk();  
            });

            $("#comerciarUsuariosBotonRechazar").click(function () {
                self.game.client.sendUserCommerceReject();
            });
        }

        clearDom() {
            super.clearDom();
        }
    }

    return ComerciarUsuarios;
});
