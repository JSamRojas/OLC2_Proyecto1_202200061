import Instruccion from "../Abstracto/Instruccion.js";
import Arbol from "../Simbolo/Arbol.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import DatoNativo from "../Simbolo/DatoNativo.js";
import Errores from "../Simbolo/Errores.js";
import Tipo from "../Simbolo/Tipo.js";
import Simbolos from "../Simbolo/Simbolos.js";
import { ListaSimbolos, ListaErrores } from "../Interfaz/Codigo_GUI.js";

class Instr_DeclaracionStruct extends Instruccion {
    constructor(ID, Atributos, Linea, Columna) {
        super(new Tipo(DatoNativo.STRUCT), Linea, Columna);
        this.ID = ID;
        this.Atributos = Atributos;
    }

    Interpretar(arbol, tabla) {


    }

    Inter_Struct(arbol, ID, Attribs){

        let MapaPrincipal = new Map();
        let MapaAtributos = new Map();

        for (let map of Attribs) {
            for (let clave of map.keys()) {
                let atributos = map.get(clave);
                let busqueda = arbol.getStructs(atributos.tipo);
                if(busqueda instanceof Instr_DeclaracionStruct){
                    let Valores = this.Inter_Struct(arbol, atributos.tipo, busqueda.Atributos);
                }
            }
        }

    }

}

export default Instr_DeclaracionStruct;