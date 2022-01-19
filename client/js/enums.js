define({
    /* valor default primer elemento enums en VB: 0 */

    Heading: {
        norte: 1,
        este: 2,
        sur: 3,
        oeste: 4
    },

    eMessage: {
        DontSeeAnything: 0,
        NPCSwing: 1,
        NPCKillUser: 2,
        BlockedWithShieldUser: 3,
        BlockedWithShieldOther: 4,
        UserSwing: 5,
        SafeModeOn: 6,
        SafeModeOff: 7,
        ResuscitationSafeOff: 8,
        ResuscitationSafeOn: 9,
        NobilityLost: 10,
        CantUseWhileMeditating: 11,
        NPCHitUser: 12,
        UserHitNPC: 13,
        UserAttackedSwing: 14,
        UserHittedByUser: 15,
        UserHittedUser: 16,
        WorkRequestTarget: 17,
        HaveKilledUser: 18,
        UserKill: 19,
        EarnExp: 20,
        Home: 21,
        CancelHome: 22,
        FinishHome: 23
    },

    Ciudad: {
        Ullathorpe: 1,
        Nix: 2,
        Banderbill: 3,
        Lindos: 4,
        Arghal: 5
    },

    Raza: {
        humano: 1,
        elfo: 2,
        elfoOscuro: 3,
        gnomo: 4,
        enano: 5
    },

    Clase: {
        mago: 1,
        clerigo: 2,
        guerrero: 3,
        asesino: 4,
        ladron: 5,
        bardo: 6,
        druida: 7,
        bandido: 8,
        paladin: 9,
        cazador: 10,
        trabajador: 11,
        pirata: 12
    },


    NombreClase: {
        1: "Wizard",
        2: "Cleric",
        3: "Fighter",
        4: "Assassin",
        5: "Rogue",
        6: "Bard",
        7: "Druid",
        8: "Brigand",
        9: "Paladin",
        10: "Hunter",
        11: "Worker",
        12: "Pirate"
    },

    Genero: {
        hombre: 1,
        mujer: 2
    },

    ParteCuerpo: {
        cabeza: 1,
        piernaIzquierda: 2,
        piernaDerecha: 3,
        brazoDerecho: 4,
        brazoIzquierdo: 5,
        torso: 6
    },

    Skill: {
        magia: 1,
        robar: 2,
        tacticas: 3,
        armas: 4,
        meditar: 5,
        apunalar: 6,
        ocultarse: 7,
        supervivencia: 8,
        talar: 9,
        comerciar: 10,
        defensa: 11,
        pesca: 12,
        mineria: 13,
        carpinteria: 14,
        herreria: 15,
        liderazgo: 16,
        domar: 17,
        proyectiles: 18,
        wrestling: 19,
        navegacion: 20,
        fundirmetal: 88
    },

    Muerto: {
        cabezaCasper: 500,
        cuerpoFragataFantasmal: 87
    },

    MensajeConsola: {
        ESTAS_MUERTO: "You're dead!!!",
        MENSAJE_1: "",
        MENSAJE_2: "!!",
        MENSAJE_11: "",
        MENSAJE_22: "!",
        MENSAJE_GOLPE_CRIATURA_1: "You've dealt the creature ",
        MENSAJE_GOLPE_CABEZA: "The creature has landed a blow to your head and dealt ",
        MENSAJE_GOLPE_BRAZO_IZQ: "The creature has landed a blow to your left arm and dealt an amount of damage points equal to ",
        MENSAJE_GOLPE_BRAZO_DER: "The creature has landed a blow to your right arm and dealt an amount of damage points equal to ",
        MENSAJE_GOLPE_PIERNA_IZQ: "The creature has landed a blow to your left leg and dealt an amount of damage points equal to ",
        MENSAJE_GOLPE_PIERNA_DER: "The creature has landed a blow to your right leg and dealt an amount of damage points equal to ",
        MENSAJE_GOLPE_TORSO: "The creature has landed a blow to your torso and dealt an amount of damage points equal to ",
        CRIATURA_FALLA_GOLPE: "The creature missed!!!",
        CRIATURA_MATADO: "The creature has killed you!!!",
        RECHAZO_ATAQUE_ESCUDO: "You blocked the attack with your shield!!!",
        USUARIO_RECHAZO_ATAQUE_ESCUDO: "The user has blocked the attack with their shield!!!",
        FALLADO_GOLPE: "You've missed!!!",
        SEGURO_ACTIVADO: ">>SAFETY ON<<",
        SEGURO_DESACTIVADO: ">>SAFETY OFF<<",
        PIERDE_NOBLEZA: "You've lost some noble points and gained some criminal points! If you keep aiding criminals you'll become one of them and you'll be pursued by the authorities.",
        USAR_MEDITANDO: "You're meditating! You need to stop meditating in order to use objects.",
        SEGURO_RESU_ON: "RESURRECTION SAFETY ON",
        SEGURO_RESU_OFF: "RESURRECTION SAFETY OFF",
        ATAQUE_FALLO: " attacked you and failed!!",
        RECIBE_IMPACTO_CABEZA: " has hit your head resulting in an amount of damage points equal to ",
        RECIBE_IMPACTO_BRAZO_IZQ: " has hit your left arm resulting in an amount of damage points equal to ",
        RECIBE_IMPACTO_BRAZO_DER: " has hit your right arm resulting in an amount of damage points equal to ",
        RECIBE_IMPACTO_PIERNA_IZQ: " has hit your left leg resulting in an amount of damage points equal to ",
        RECIBE_IMPACTO_PIERNA_DER: " has hit your right leg resulting in an amount of damage points equal to ",
        RECIBE_IMPACTO_TORSO: " has hit your torso resulting in an amount of damage points equal to ",
        PRODUCE_IMPACTO_1: "You've hit ",
        PRODUCE_IMPACTO_CABEZA: " points of the damage in its head.",
        PRODUCE_IMPACTO_BRAZO_IZQ: " points of the damage in its left arm.",
        PRODUCE_IMPACTO_BRAZO_DER: " points of the damage in its right arm.",
        PRODUCE_IMPACTO_PIERNA_IZQ: " points of the damage in its left leg.",
        PRODUCE_IMPACTO_PIERNA_DER: " points of the damage in its right leg.",
        PRODUCE_IMPACTO_TORSO: " points of damage to its torso.",
        TRABAJO_MAGIA: "Click the target...",
        TRABAJO_PESCA: "Click a body of water...",
        TRABAJO_ROBAR: "Click the victim...",
        TRABAJO_TALAR: "Click a tree...",
        TRABAJO_MINERIA: "Click the lode...",
        TRABAJO_FUNDIRMETAL: "Click the forge...",
        TRABAJO_PROYECTILES: "Click the victim...",
        TRABAJO_DOMAR: "Click the creature...",
        ENTRAR_PARTY_1: "If you wish to join ",
        ENTRAR_PARTY_2: "'s party, write /joinparty",
        NENE: "Amount of NPCs: ",
        FRAGSHOOTER_TE_HA_MATADO: "has killed you!",
        FRAGSHOOTER_HAS_MATADO: "You've killed",
        FRAGSHOOTER_HAS_GANADO: "You've gained ",
        FRAGSHOOTER_PUNTOS_DE_EXPERIENCIA: "XP.",
        NO_VES_NADA_INTERESANTE: "You don't see anything of interest.",
        HAS_MATADO_A: "You've killed ",
        HAS_GANADO_EXPE_1: "You've gained ",
        HAS_GANADO_EXPE_2: " XP.",
        TE_HA_MATADO: " has killed you!",
        HOGAR: "You're home. The journey is over.",
        HOGAR_CANCEL: "Your journey has been canceled.",
        MACRO_TRABAJO_ACTIVADO: "Work macro ENABLED click the target...",
        MACRO_TRABAJO_DESACTIVADO: "Work macro DISABLED",
        MACRO_TABAJO_REQUIERE_EQUIPAR: "You need to equip a tool to work!",
        MACRO_HECHIZOS_ACTIVADO: "Automatic spellcasting ENABLED, click the target...",
        MACRO_HECHIZOS_DESACTIVADO: "Automatic spellcasting DISABLED",
        MACRO_HECHIZOS_REQUIRE_SELECCIONAR: "First pick a spell to cast.",
        MENSAJE_HOGAR : "You're home. The journey is over.",
        MENSAJE_HOGAR_CANCEL : "Your journey has been canceled."
    },

    Intervalo: {
        macroHechizos: 2788,
        macroTrabajo: 900,
        ataque: 1500,
        ataqueConArco: 1400,
        hechizo: 1400,
        ataqueHechizo: 1000,
        hechizoAtaque: 1000,
        trabajar: 700,
        usarItemConU: 450,
        usarItemConDobleClick: 500,
        requestPostionUpdate: 2000,
        domar: 700,
        robar: 700
    },

    SONIDOS: {
        paso1: "23",
        paso2: "24",
        pasoNavegando: "50",
        lluvia_outdoor: "lluviaout",
        lluvia_indoor: "lluviain",
        lluvia_start_indoor: "lluviainst",
        lluvia_start_outdoor: "lluviaoutst",
        lluvia_end_indoor: "lluviainend",
        lluvia_end_outdoor: "lluviaoutend",
        comprar_vender: 'sell_buy_item',
        retirar_depositar: 'withdraw_deposit_item',
        click: 'click',
        dados: 'cupdice'
    },

    ClanType: {
        ROYAL_ARMY: 0,
        EVIL: 1,
        NEUTRAL: 2,
        GM: 3,
        LEGAL: 4,
        CRIMINAL: 5
    }
});