import Instruccion from "../Abstracto/Instruccion.js";
import Arbol from "../Simbolo/Arbol.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import DatoNativo from "../Simbolo/DatoNativo.js";
import Errores from "../Simbolo/Errores.js";
import Instr_DeclaracionVar from "./Instr_DeclaracionVar.js";
import Tipo from "../Simbolo/Tipo.js";
import Instr_Break from "./Instr_Break.js";
import Simbolos from "../Simbolo/Simbolos.js";

class Instr_Switch extends Instruccion {
    constructor(condicion, Casos, Linea, Columna){
        super(new Tipo(DatoNativo.VOID), Linea, Columna);
        this.condicion = condicion;
        this.Casos = Casos;
    }

    Interpretar(arbol, tabla) {

        let valorCond = this.condicion.Interpretar(arbol, tabla);
        let Condicion_cumplida = false;

        if(valorCond === null) return null;

        if(valorCond instanceof Errores) return valorCond;

        let newTabla = new TablaSimbolos(tabla);
        newTabla.setNombre(tabla.getNombre() + "- SWITCH");

        for(let element of this.Casos){

            if(element.EsCaso){

                let caso = element.Interpretar(arbol, tabla);

                if(caso instanceof Errores) return caso;

                if(caso === null) return null;

                if(this.condicion.Tipo.getTipo() === element.Tipo.getTipo()){

                    if((caso === valorCond) || (Condicion_cumplida)){
                        
                        for(let inst of element.InstrCaso){

                            if(inst instanceof Errores) return inst;

                            if(inst instanceof Instr_Break) return inst;

                            if(inst instanceof Instr_DeclaracionVar) inst.setEntorno(newTabla.getNombre());

                            if(inst === null) return null;

                            let resultado = inst.Interpretar(arbol, newTabla);

                            if(resultado instanceof Errores) return resultado;

                            if(inst instanceof Instr_Break) return inst;

                        }

                        Condicion_cumplida = true;

                    }
    
                } else {
                    return new Errores("Semantico", "El tipo de la condicion del caso no coincide con el tipo de la expresion del switch", this.Linea, this.Columna);
                }

            } else {

                for(let inst of element.InstrCaso){

                    if(inst instanceof Errores) return inst;

                    if(inst instanceof Instr_DeclaracionVar) inst.setEntorno(newTabla.getNombre());

                    if(inst instanceof Instr_Break) return inst;

                    if(inst === null) return null;

                    let resultado = inst.Interpretar(arbol, newTabla);

                    if(resultado instanceof Errores) return resultado;

                    if(inst instanceof Instr_Break) return inst;

                }

            }

        }

        return null;

    }

}

export default Instr_Switch;