class Arbol{
    constructor(Instrucciones){
        this.Instrucciones = Instrucciones;
        this.consola = "";
        this.TablaGlobal = new Map();
        this.Errores = [];
        this.FuncYMetod = [];
        this.Structs = [];
    }

    getInstrucciones(){
        return this.Instrucciones;
    }

    setInstrucciones(){
        this.Instrucciones = Instrucciones;
    }

    getConsola(){
        return this.consola;
    }

    setConsola(consola){
        this.consola = consola;
    }

    getTablaGlobal(){
        return this.TablaGlobal;
    }

    setTablaGlobal(TablaGlobal){
        this.TablaGlobal = TablaGlobal;
    }

    getErrores(){
        return this.Errores;
    }

    setErrores(Errores){
        this.Errores = Errores;
    }

    Print(Valor){
        this.consola += Valor + "\n";
    }

    getFuncYMetod(){
        return this.FuncYMetod;
    }

    setFuncYMetod(FuncYMetod){
        this.FuncYMetod = FuncYMetod;
    }
}

export default Arbol;