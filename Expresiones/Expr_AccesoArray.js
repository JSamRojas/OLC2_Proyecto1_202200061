import Expresion from "../Abstracto/Expresion.js";
import Arbol from "../Simbolo/Arbol.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import DatoNativo from "../Simbolo/DatoNativo.js";
import Errores from "../Simbolo/Errores.js";
import Tipo from "../Simbolo/Tipo.js";
import Simbolos from "../Simbolo/Simbolos.js";
import { ListaSimbolos, ListaErrores } from "../Interfaz/Codigo_GUI.js";

class Expr_AccesoArray extends Expresion {
    constructor(ID, expresion, Linea, Columna){
        super(new Tipo(DatoNativo.VOID), Linea, Columna);
        this.ID = ID;
        this.expresion = expresion;
    }

    Interpretar(arbol, tabla) {

        let simbolo = tabla.getVariable(this.ID);

        if(simbolo === null){
            return new Errores("Semantico", "No existe la variable " + this.ID, this.Linea, this.Columna);
        }

        if(simbolo.Tipo.getTipo() === "VOID"){
            return new Errores("Semantico", "La variable " + this.ID + " es inaccesible porque tiene valor null", this.Linea, this.Columna);
        }

        let posicion = this.expresion.Interpretar(arbol, tabla);

        if(posicion instanceof Errores) return posicion;

        if(this.expresion.Tipo.getTipo() !== "ENTERO"){
            return new Errores("Semantico", "La posicion debe ser de tipo entero", this.Linea, this.Columna);
        }

        if(posicion < 0 || posicion >= simbolo.getValor().length){
            return new Errores("Semantico", "La posicion " + posicion + " se sale de los limites del arreglo", this.Linea, this.Columna);
        }

        this.Tipo.setTipo(simbolo.getTipo().getTipo());
        return simbolo.getValor()[posicion];

    }

}

export default Expr_AccesoArray;