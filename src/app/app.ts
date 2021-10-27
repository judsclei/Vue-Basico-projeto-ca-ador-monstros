new Vue({
    el: '#app',
    data:{
        running: false,
        playerLife: 100,
        monsterLife:100,
        logs:[]
    },
    computed:{
        hasResult() :boolean
        {
            if(this.playerLife ==0) 
            {
                this.registerLog(`O Heroi caiu perante o poderoso Monstro`,'monsterLog')
                alert ("Você Perdeu!")
            }
            else if((this.monsterLife ==0)){
                this.registerLog(`O Heroi Derrtou o Monstro`,'healLog')
                alert("Parabens Você ganhou!")
            }
            return this.playerLife ==0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs =[]
        },
        attack(especial : boolean){
            this.damage('monsterLife',5,10,especial,'Heroi','Monstro','playerLog');
            if(this.monsterLife>0)
            {
                this.damage('playerLife',7,12,false,'Monstro','Heroi','monsterLog');
            }
            
        },
        damage(atr:string,min:number, max:number, especial:boolean, source:string, target:string, cls:string)
        {
            const plusDmg = especial ? this.getRandom(7,10):0;
            const damage = this.getRandom(min+plusDmg, max+plusDmg)
            this[atr] = Math.max(this[atr] - damage, 0);
            this.registerLog(`${source} Lançou um ataque ao ${target} com o dano de: ${damage}`, cls);
        },
        haelAndHurt()
        {
            if(this.playerLife == 100)
            {
                alert("O Heroi esta com a vida completa");
            }
            else
            {
                this.heal(5,15);
                this.damage('playerLife',7,12,false, 'Monstro','Heroi','monsterLog');
            }
            
        },
        heal(min: number, max:number)
        {
            const heal= this.getRandom(max, min);
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`O Heroi foi curado em ${heal}`,'healLog')
        },
        getRandom(min: number, max:number){
            const value = Math.random() * (max- min) + min;
            return Math.round(value);
        },
        registerLog(text: string, cls:string)
        {
            this.logs.unshift({text, cls})
        },
    },
    watch:{
        hasResult(value: boolean): void{
            if(value) this. running = false
        }
        
    }
})