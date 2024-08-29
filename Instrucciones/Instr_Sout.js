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
        this.expresion.forEach((element) => {
            if (element === null){
                console.log("Elemento nulo");
            }
            let resultado = element.Interpretar(arbol, tabla);
            if(resultado instanceof Errores) return resultado;
            consola += resultado + " ";
        });
        arbol.Print(consola);
        return null;
    }
}

export default Instr_Sout;