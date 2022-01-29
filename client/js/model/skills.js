/**
 * Created by horacio on 4/23/16.
 */


define(['enums'], function (Enums) {

    class Skills {
        constructor() {
            this.MAX_PUNTOS_SKILL = 100;
            this._nombres = [];
            this._skills = [];
            this._initNombresSkills(this._nombres);
            this.puntosLibres = 0;
        }

        setSkillsLibres(cant) {
            this.puntosLibres = cant;
        }

        agregarSkillsLibres(cant) {
            this.puntosLibres += cant;
        }

        setSkills(skills) { // llegan cant puntos de skill i, porcentaje de skill i
            this._skills = [];
            for (var i = 0; i < skills.length; i++) {
                var skill = {};
                skill.numSkill = (i / 2) + 1;
                skill.puntos = skills[i];
                skill.porcentaje = skills[i + 1];
                skill.nombre = this.getNombreSkill(skill.numSkill);
                this._skills[skill.numSkill] = skill;
            }
        }

        asignarSkill(numSkill) {
            var skill = this._skills[numSkill];
            if ((this.puntosLibres < 1 ) || (skill.puntos >= this.MAX_PUNTOS_SKILL )) {
                return false;
            }
            this.puntosLibres--;
            this._skills[numSkill].puntos++;
            return true;
        }

        desAsignarSkill(numSkill) {
            var skill = this._skills[numSkill];
            if (skill.puntos < 0) {
                return false;
            }
            this.puntosLibres++;
            this._skills[numSkill].puntos--;
        }

        getPuntosSkill(numSkill) {
            return this._skills[numSkill].puntos;
        }

        forEachSkill(callback) { // callback(numSkill,puntos,porcentaje,nombre)
            _.each(this._skills, function (skill) {
                if (skill) {
                    callback(skill.numSkill, skill.puntos, skill.porcentaje, skill.nombre);
                }
            });
        }

        getNombreSkill(numSkill) {
            return this._nombres[numSkill];
        }

        _initNombresSkills(nombres) { // TODO: sacar esto de aca
            nombres[Enums.Skill.magia] = "Magic";
            nombres[Enums.Skill.robar] = "Stealing";
            nombres[Enums.Skill.tacticas] = "Evasion";
            nombres[Enums.Skill.armas] = "Hand-to-hand combat";
            nombres[Enums.Skill.meditar] = "Meditate";
            nombres[Enums.Skill.apunalar] = "Stabbing";
            nombres[Enums.Skill.ocultarse] = "Hiding";
            nombres[Enums.Skill.supervivencia] = "Survival";
            nombres[Enums.Skill.talar] = "Woodchopping";
            nombres[Enums.Skill.comerciar] = "Trade";
            nombres[Enums.Skill.defensa] = "Use of shields";
            nombres[Enums.Skill.pesca] = "Fishing";
            nombres[Enums.Skill.mineria] = "Mining";
            nombres[Enums.Skill.carpinteria] = "Carpentry";
            nombres[Enums.Skill.herreria] = "Blacksmithery";
            nombres[Enums.Skill.liderazgo] = "Leadership";
            nombres[Enums.Skill.domar] = "Animal taming";
            nombres[Enums.Skill.proyectiles] = "Ranged combat";
            nombres[Enums.Skill.wrestling] = "Brawl";
            nombres[Enums.Skill.navegacion] = "Seafaring";
            nombres[Enums.Skill.fundirmetal] = "????";
        }
    }
    return Skills;
});


