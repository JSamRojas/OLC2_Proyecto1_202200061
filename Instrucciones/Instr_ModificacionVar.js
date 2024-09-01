import Instruccion from "../Abstracto/Instruccion.js";
import Arbol from "../Simbolo/Arbol.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import DatoNativo from "../Simbolo/DatoNativo.js";
import Errores from "../Simbolo/Errores.js";
import Tipo from "../Simbolo/Tipo.js";
import Simbolos from "../Simbolo/Simbolos.js";
import { ListaSimbolos, ListaErrores } from "../Interfaz/Codigo_GUI.js";

class Instr_ModificacionVar extends Instruccion{
    constructor(ID, expresion, modificador, Linea, Columna){
        super(new Tipo(DatoNativo.VOID), Linea, Columna);
        this.ID = ID;
        this.expresion = expresion;
        this.modificador = modificador;

    }

    Interpretar(arbol, tabla){
        let variable = tabla.getVariable(this.ID);
        if(variable === null){
            return new Errores("Semantico", "La variable " + this.ID + " no existe", this.Linea, this.Columna);
        }

        if(this.modificador === null){

            let nuevoValor = this.expresion.Interpretar(arbol, tabla);
            if(nuevoValor instanceof Errores) return nuevoValor;

            if(nuevoValor === null){
                return null;
            }

            if(variable.getTipo().getTipo() === "VOID"){
                return new Errores("Semantico", "La variable " + this.ID + " es inaccesible porque tiene valor null", this.Linea, this.Columna);
            }

            if(variable.getTipo().getTipo() !== this.expresion.Tipo.getTipo()){
                if(variable.getTipo().getTipo() === "DECIMAL" && this.expresion.Tipo.getTipo() === "ENTERO"){
                    nuevoValor = parseFloat(nuevoValor).toFixed(1);
                } else {
                    return new Errores("Semantico", "La variable es de tipo " + variable.getTipo().getTipo() + " y el valor asignado es de tipo " + this.expresion.Tipo.getTipo(), this.Linea, this.Columna);
                }
            }

            variable.setValor(nuevoValor);

        } else {

            let nuevoValor = this.expresion.Interpretar(arbol, tabla);
            if(nuevoValor instanceof Errores) return nuevoValor;
            if(nuevoValor === null) return null;

            let valorActual = variable.getValor();
            let tipo1 = variable.getTipo().getTipo();
            let tipo2 = this.expresion.Tipo.getTipo();

            switch (this.modificador) {
                case "AUMENTO":
                    switch (tipo1) {
                        case "ENTERO":
                            if(tipo2 === "ENTERO"){
                                variable.setValor(parseInt(valorActual,10) + parseInt(nuevoValor,10));
                                break;
                            } else {
                                return new Errores("Semantico", "La variable es de tipo " + tipo1 + " y el valor asignado es de tipo " + tipo2, this.Linea, this.Columna);
                            }
                        case "DECIMAL":
                            if(tipo2 === "ENTERO"){
                                variable.setValor(parseFloat(valorActual).toFixed(1) + parseInt(nuevoValor,10));
                                break;
                            } else if(tipo2 === "DECIMAL"){
                                variable.setValor(parseFloat(valorActual).toFixed(1) + parseFloat(nuevoValor));
                                break;
                            } else {
                                return new Errores("Semantico", "La variable es de tipo " + tipo1 + " y el valor asignado es de tipo " + tipo2, this.Linea, this.Columna);
                            }
                        case "CADENA":
                            if(tipo2 === "CADENA"){
                                variable.setValor(valorActual + nuevoValor);
                                break;
                            } else {
                                return new Errores("Semantico", "La variable es de tipo " + tipo1 + " y el valor asignado es de tipo " + tipo2, this.Linea, this.Columna);
                            }
                        default:
                            return new Errores("Semantico", "La variable es de tipo " + tipo1 + " y no se puede aumentar", this.Linea, this.Columna);
                    }
                    break;
                case "DECREMENTO":
                    switch (tipo1) {
                        case "ENTERO":
                            if(tipo2 === "ENTERO"){
                                variable.setValor(parseInt(valorActual,10) - parseInt(nuevoValor,10));
                                break;
                            } else {
                                return new Errores("Semantico", "La variable es de tipo " + tipo1 + " y el valor asignado es de tipo " + tipo2, this.Linea, this.Columna);
                            }
                        case "DECIMAL":
                            if(tipo2 === "ENTERO"){
                                variable.setValor(parseFloat(valorActual).toFixed(1) - parseInt(nuevoValor,10));
                                break;
                            } else if(tipo2 === "DECIMAL"){
                                variable.setValor(parseFloat(valorActual).toFixed(1) - parseFloat(nuevoValor));
                                break;
                            } else {
                                return new Errores("Semantico", "La variable es de tipo " + tipo1 + " y el valor asignado es de tipo " + tipo2, this.Linea, this.Columna);
                            }
                        default:
                            return new Errores("Semantico", "La variable es de tipo " + tipo1 + " y no se puede aumentar", this.Linea, this.Columna);
                    }
            }

        }

        return null;

    }
}

export default Instr_ModificacionVar;