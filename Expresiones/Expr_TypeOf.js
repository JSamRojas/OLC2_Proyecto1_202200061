import Expresion from "../Abstracto/Expresion.js";
import Arbol from "../Simbolo/Arbol.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import DatoNativo from "../Simbolo/DatoNativo.js";
import Errores from "../Simbolo/Errores.js";
import Tipo from "../Simbolo/Tipo.js";

class Expr_TypeOf extends Expresion {
    constructor(expresion, Linea, Columna){
        super(new Tipo(DatoNativo.CADENA), Linea, Columna);
        this.expresion = expresion;
    }

    Interpretar(arbol, tabla) {
                
        let valor = this.expresion.Interpretar(arbol, tabla);

        if(valor instanceof Errores) return valor;

        if(valor === null) return null;

        switch (this.expresion.Tipo.getTipo()) {
            case "ENTERO":
                return "int";
            case "DECIMAL":
                return "float";
            case "BOOLEANO":
                return "boolean";
            case "CADENA":
                return "string";
            case "CARACTER":
                return "char";
            default:
                return new Errores("Semantico", "No se puede obtener el tipo de la expresion", this.Linea, this.Columna);
        }
        
    }

}

export default Expr_TypeOf;