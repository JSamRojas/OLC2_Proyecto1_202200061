import Instr_DeclaracionStructs from "../Instrucciones/Instr_DeclaracionStruct.js"

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

    getStructs(ID){
        for (let element of this.Structs) {
            if(element instanceof Instr_DeclaracionStructs){
                if(element.ID === ID){
                    return element;
                }
            }
        }
        return null;
    }

    addStructs(struct){
        if(struct instanceof Instr_DeclaracionStructs){
            let encontro = this.getStructs(struct.ID);
            if(encontro !== null){
                this.Errores.push(new Errores("Semantico", "Ya existe un struct con el ID: " + struct.ID, struct.Linea, struct.Columna));
            } else {
                this.Structs.push(struct);
            }
        }
    }

}

export default Arbol;