import Instruccion from "../Abstracto/Instruccion.js";
import Arbol from "../Simbolo/Arbol.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import DatoNativo from "../Simbolo/DatoNativo.js";
import Errores from "../Simbolo/Errores.js";
import Tipo from "../Simbolo/Tipo.js";

class Instr_Sout extends Instruccion {
    constructor(expresion, Linea, Columna) {
        super(new Tipo(DatoNativo.VOID), Linea, Columna);
        this.expresion = expresion;
    }

    Interpretar(arbol, tabla){
        let consola = "";

        for(let element of this.expresion){
            let resultado = element.Interpretar(arbol, tabla);
            if (resultado === null) continue;
            if (resultado instanceof Errores) return resultado;
            consola += resultado + " ";
        }
        arbol.Print(consola);
        return null;
    }
}

export default Instr_Sout;