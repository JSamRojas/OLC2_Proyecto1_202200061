
module.exports = {
    format: "es",
    input: "parser.pegjs",
    dependencies: {
      Expresion: "../Abstracto/Expresion.js",
      Instruccion: "../Abstracto/Instruccion.js",
      Simbolos: "../Simbolo/Simbolos.js",
      Tipo: "../Simbolo/Tipo.js",
      Nativo: "../Expresiones/Nativo.js",
      DatoNativo: "../Simbolo/DatoNativo.js",
      Expr_Aritmeticas: "../Expresiones/Expr_Aritmeticas.js",
      Expr_Relacionales: "../Expresiones/Expr_Relacionales.js",
      Expr_Logicas: "../Expresiones/Expr_Logicas.js",
      Expr_AccesoVar: "../Expresiones/Expr_AccesoVar.js",
      Expr_AccesoArray: "../Expresiones/Expr_AccesoArray.js",
      Expr_AccesoMatriz: "../Expresiones/Expr_AccesoMatriz.js",
      Expr_Ternaria: "../Expresiones/Expr_Ternaria.js",
      Expr_IndexOf: "../Expresiones/Expr_IndexOf.js",
      Expr_Join: "../Expresiones/Expr_Join.js",
      Expr_Length: "../Expresiones/Expr_Length.js",
      Expr_ParseInt: "../Expresiones/Expr_ParseInt.js",
      Expr_ParseFloat: "../Expresiones/Expr_ParseFloat.js",
      Expr_ToString: "../Expresiones/Expr_ToString.js",
      Expr_ToLowerCase: "../Expresiones/Expr_ToLowerCase.js",
      Expr_ToUpperCase: "../Expresiones/Expr_ToUpperCase.js",
      Expr_TypeOf: "../Expresiones/Expr_TypeOf.js",
      Instr_Sout: "../Instrucciones/Instr_Sout.js",
      Instr_DeclaracionVar: "../Instrucciones/Instr_DeclaracionVar.js",
      Instr_DeclaracionArray: "../Instrucciones/Instr_DeclaracionArray.js",
      Instr_DeclaracionMatriz: "../Instrucciones/Instr_DeclaracionMatriz.js",
      Instr_DeclaracionStruct: "../Instrucciones/Instr_DeclaracionStruct.js",
      Instr_ModificacionVar: "../Instrucciones/Instr_ModificacionVar.js",
      Instr_ModificacionArray: "../Instrucciones/Instr_ModificacionArray.js",
      Instr_Switch: "../Instrucciones/Instr_Switch.js",
      Casos_switch: "../Instrucciones/Casos_switch.js",
      Instr_Break : "../Instrucciones/Instr_Break.js",
      Instr_Continue: "../Instrucciones/Instr_Continue.js",
      Instr_While: "../Instrucciones/Instr_While.js",
      Instr_If: "../Instrucciones/Instr_If.js",
      Instr_For: "../Instrucciones/Instr_For.js",
      Instr_ForEach: "../Instrucciones/Instr_ForEach.js",
      Errores: "../Simbolo/Errores.js",
    },
  };