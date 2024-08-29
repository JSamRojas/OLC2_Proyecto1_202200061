
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
      Instr_Sout: "../Instrucciones/Instr_Sout.js",
      Instr_DeclaracionVar: "../Instrucciones/Instr_DeclaracionVar.js",
      Errores: "../Simbolo/Errores.js",
    },
  };