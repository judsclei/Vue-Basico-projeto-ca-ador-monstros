"use strict";
new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            if (this.playerLife == 0) {
                this.registerLog(`O Heroi caiu perante o poderoso Monstro`, 'monsterLog');
                alert("Você Perdeu!");
            }
            else if ((this.monsterLife == 0)) {
                this.registerLog(`O Heroi Derrtou o Monstro`, 'healLog');
                alert("Parabens Você ganhou!");
            }
            return this.playerLife == 0 || this.monsterLife == 0;
        }
    },
    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
        },
        attack(especial) {
            this.damage('monsterLife', 5, 10, especial, 'Heroi', 'Monstro', 'playerLog');
            if (this.monsterLife > 0) {
                this.damage('playerLife', 7, 12, false, 'Monstro', 'Heroi', 'monsterLog');
            }
        },
        damage(atr, min, max, especial, source, target, cls) {
            const plusDmg = especial ? this.getRandom(7, 10) : 0;
            const damage = this.getRandom(min + plusDmg, max + plusDmg);
            this[atr] = Math.max(this[atr] - damage, 0);
            this.registerLog(`${source} Lançou um ataque ao ${target} com o dano de: ${damage}`, cls);
        },
        haelAndHurt() {
            if (this.playerLife == 100) {
                alert("O Heroi esta com a vida completa");
            }
            else {
                this.heal(5, 15);
                this.damage('playerLife', 7, 12, false, 'Monstro', 'Heroi', 'monsterLog');
            }
        },
        heal(min, max) {
            const heal = this.getRandom(max, min);
            this.playerLife = Math.min(this.playerLife + heal, 100);
            this.registerLog(`O Heroi foi curado em ${heal}`, 'healLog');
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min;
            return Math.round(value);
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls });
        },
    },
    watch: {
        hasResult(value) {
            if (value)
                this.running = false;
        }
    }
});
//# sourceMappingURL=app.js.map