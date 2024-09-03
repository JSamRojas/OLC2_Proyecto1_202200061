import Instruccion from "../Abstracto/Instruccion.js";
import Arbol from "../Simbolo/Arbol.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import DatoNativo from "../Simbolo/DatoNativo.js";
import Errores from "../Simbolo/Errores.js";
import Tipo from "../Simbolo/Tipo.js";
import Simbolos from "../Simbolo/Simbolos.js";
import { ListaSimbolos, ListaErrores } from "../Interfaz/Codigo_GUI.js";

class Instr_ModificacionArray extends Instruccion {
    constructor(ID, posicion, expresion, Linea, Columna) {
        super(new Tipo(DatoNativo.VOID), Linea, Columna);
        this.ID = ID;
        this.posicion = posicion;
        this.expresion = expresion;
    }

    Interpretar(arbol, tabla) {

        let simbolo = tabla.getVariable(this.ID);

        if(simbolo === null){
            return new Errores("Semantico", "La variable " + this.ID + " no existe", this.Linea, this.Columna);
        }

        if(this.expresion === null){
            return new Errores("Semantico", "La posicion de acceso no debe ser null", this.Linea, this.Columna);
        }

        let pos = this.posicion.Interpretar(arbol, tabla);

        if(pos instanceof Errores) return pos;

        if(this.posicion.Tipo.getTipo() !== "ENTERO"){
            return new Errores("Semantico", "La posicion de acceso debe ser de tipo entero", this.Linea, this.Columna);
        }

        let newValor = this.expresion.Interpretar(arbol, tabla);

        if(newValor instanceof Errores) return newValor;

        if(simbolo.getTipo().getTipo() !== this.expresion.Tipo.getTipo()){
            return new Errores("Semantico", "El tipo de dato no coincide con el tipo del arreglo", this.Linea, this.Columna);
        }

        if(pos < 0 || pos >= simbolo.getValor().length){
            return new Errores("Semantico", "La posicion " + pos + " se sale de los limites del arreglo", this.Linea, this.Columna);
        }

        simbolo.getValor()[pos] = newValor;

        return null;

    }

}

export default Instr_ModificacionArray;