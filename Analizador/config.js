
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
      Expr_Ternaria: "../Expresiones/Expr_Ternaria.js",
      Instr_Sout: "../Instrucciones/Instr_Sout.js",
      Instr_DeclaracionVar: "../Instrucciones/Instr_DeclaracionVar.js",
      Instr_ModificacionVar: "../Instrucciones/Instr_ModificacionVar.js",
      Instr_Switch: "../Instrucciones/Instr_Switch.js",
      Casos_switch: "../Instrucciones/Casos_switch.js",
      Instr_Break : "../Instrucciones/Instr_Break.js",
      Instr_While: "../Instrucciones/Instr_While.js",
      Instr_If: "../Instrucciones/Instr_If.js",
      Errores: "../Simbolo/Errores.js",
    },
  };