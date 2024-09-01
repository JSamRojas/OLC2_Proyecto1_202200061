//-------------------- Imports ----------------------

{
  const ARITHMETIC_OP = {
    SUMA: "SUMA",
    MENOS: "MENOS",
    MULTIPLICACION: "MULTIPLICACION",
    DIVISION: "DIVISION",
    MODULO: "MODULO",
    NEGACION: "NEGACION",
  };

  const RELATIONAL_OP = {
    MENOR_QUE: "MENOR_QUE",
    MENOR_IGUAL: "MENOR_IGUAL",
    MAYOR_QUE: "MAYOR_QUE",
    MAYOR_IGUAL: "MAYOR_IGUAL",
    IGUAL: "IGUAL",
    NO_IGUAL: "NO_IGUAL",
  };

  const LOGICAL_OP = {
    AND: "AND",
    OR: "OR",
    NOT: "NOT",
  };

  const MOD_OP = {
    AUMENTO: "AUMENTO",
    DECREMENTO: "DECREMENTO",
  }
}

//-------------------- Analisis Sintactico ----------------------

S
  = instrucciones

instrucciones 
  = _ inst:instruccion list:instruccionesp { return [inst].concat(list); }

instruccionesp 
  = list:instrucciones { return list; }
  / epsilon { return []; }

instruccion =  inst:print
  / inst:declaracion
  / inst:asignacion
  / inst:if_else_if
  / inst:switch_case
  / inst:while_state
  / inst:break_state

// GRAMATICA PARA EL SOUT
print = SOUTtoken "(" _ expr:expresion_lista _ ")" _ ";" _ {
  const loc = location()?.start;
  return new Instr_Sout(expr, loc?.line, loc?.column);
}

// GRAMATICA PARA EL WHILE
while_state
  = Whiletoken _ "(" _ cond:expresion _ ")" _ "{" _ instr:instrucciones _ "}" _ {
    const loc = location()?.start;
    return new Instr_While(cond, instr, loc?.line, loc?.column);
  }

// GRAMATICA PARA EL SWITCH CASE
switch_case
  = Switchtoken _ "(" _ cond:expresion _ ")" _ "{" _ cases:cases_switch _ "}" _ {
    const loc = location()?.start;
    return new Instr_Switch(cond, cases, loc?.line, loc?.column);
    }

cases_switch
  = _ cases:caso list:casoesp { return [cases].concat(list); }

casoesp
  = list:cases_switch { return list; }
  / epsilon { return []; }

caso
  = Casetoken _ valor:expresion _ ":" _ instr:instrucciones _ {
    const loc = location()?.start;
    return new Casos_switch(valor, instr, true, loc?.line, loc?.column);
    }

  / Defaulttoken _ ":" _ instr:instrucciones _ {
    const loc = location()?.start;
    return new Casos_switch(null, instr, false, loc?.line, loc?.column);
    }  

// GRAMATICA PARA EL IF ELSE IF
if_else_if
  = Iftoken _ "(" _ condicion:expresion _ ")" _ "{" _ instIF:instrucciones _ "}" _ Elsetoken _ NextIF:if_else_if _ {
    const loc = location()?.start;
    return new Instr_If(condicion, instIF, null, NextIF, loc?.line, loc?.column);
    }
  
  / Iftoken _ "(" _ condicion:expresion _ ")" _ "{" _ instIF:instrucciones _ "}" _ Elsetoken _ "{" _  instELSE:instrucciones _ "}" _ {
    const loc = location()?.start;
    return new Instr_If(condicion, instIF, instELSE, null, loc?.line, loc?.column);
    }
  
  / Iftoken _ "(" _ condicion:expresion _ ")" _ "{" _ instIF:instrucciones _ "}" _ {
    const loc = location()?.start;
    return new Instr_If(condicion, instIF, null, null, loc?.line, loc?.column);
    }

// GRAMATICA PARA DECLARACION Y ASIGNACION DE VARIABLES
asignacion
  = id:ID _ "=" _ expr:expresion _ ";" _ {
    const loc = location()?.start;
    return new Instr_ModificacionVar(id, expr, null, loc?.line, loc?.column);
    }

  / id:ID _ operador:("+=" / "-=") _ expr:expresion _ ";" _ {
    const loc = location()?.start;
    if(operador === "+=") return new Instr_ModificacionVar(id, expr, MOD_OP.AUMENTO, loc?.line, loc?.column);
    else if(operador === "-=") return new Instr_ModificacionVar(id, expr, MOD_OP.DECREMENTO, loc?.line, loc?.column);
    }

declaracion 
  = "var" _ id:ID _ "=" _ expr:expresion _ ";" _ {
    const loc = location()?.start;
    return new Instr_DeclaracionVar(id, expr, new Tipo(DatoNativo.VOID), loc?.line, loc?.column);
    }
  
  / type:tipo _ id:ID _ "=" _ expr:expresion _ ";" _ {
    const loc = location()?.start;
    return new Instr_DeclaracionVar(id, expr, type, loc?.line, loc?.column);
    }

  / type:tipo _ id:ID _ ";" _ {
    const loc = location()?.start;
    return new Instr_DeclaracionVar(id, null, type, loc?.line, loc?.column);
    }

// GRAMATICA PARA EL BREAK
break_state
  = Breaktoken _ ";" _ {
    const loc = location()?.start;
    return new Instr_Break(loc?.line, loc?.column);
  }

// GRAMATICA PARA RECONOCER TODAS LAS EXPRESIONES
expresion =
  expresion_ternaria

expresion_ternaria
  = condicion:expresion_or _ "?" _ verdadero:expresion_or _ ":" _ falso:expresion_ternaria _ {
    const loc = location()?.start;
    return new Expr_Ternaria(condicion, verdadero, falso, loc?.line, loc?.column);
  }
  / expresion_or

expresion_or
  = izq:expresion_and _ "||" _ der:expresion_and {
    const loc = location()?.start;
    return new Expr_Logicas(null, izq, der, LOGICAL_OP.OR, loc?.line, loc?.column);
  }
  / expresion_and

expresion_and
  = izq:expresion_igualdad _ "&&" _ der:expresion_igualdad {
    const loc = location()?.start;
    return new Expr_Logicas(null, izq, der, LOGICAL_OP.AND, loc?.line, loc?.column);
  }
  / expresion_igualdad

expresion_igualdad
  = izq:expresion_relacional _ operador:("==" / "!=") _ der:expresion_relacional {
    const loc = location()?.start;
    if(operador === "==") return new Expr_Relacionales(izq, der, RELATIONAL_OP.IGUAL, loc?.line, loc?.column);
    else if (operador === "!=") return new Expr_Relacionales(izq, der, RELATIONAL_OP.NO_IGUAL, loc?.line, loc?.column);
  }
  / expresion_relacional

expresion_relacional
  = izq:expresion_aditiva _ operador:("<=" / "<" / ">=" / ">") _ der:expresion_aditiva {
    const loc = location()?.start;
    if(operador === "<") return new Expr_Relacionales(izq, der, RELATIONAL_OP.MENOR_QUE, loc?.line, loc?.column);
    else if(operador === "<=") return new Expr_Relacionales(izq, der, RELATIONAL_OP.MENOR_IGUAL, loc?.line, loc?.column);
    else if(operador === ">") return new Expr_Relacionales(izq, der, RELATIONAL_OP.MAYOR_QUE, loc?.line, loc?.column);
    else if(operador === ">=") return new Expr_Relacionales(izq, der, RELATIONAL_OP.MAYOR_IGUAL, loc?.line, loc?.column);
  }
  / expresion_aditiva

expresion_aditiva
  = izq:expresion_multi _ operador:("+"/"-") _ der:expresion_multi {
    const loc = location()?.start;
    if(operador === "+") return new Expr_Aritmeticas(null, izq, der, ARITHMETIC_OP.SUMA, loc?.line, loc?.column);
    else if(operador === "-") return new Expr_Aritmeticas(null, izq, der, ARITHMETIC_OP.MENOS, loc?.line, loc?.column);
  }
  / expresion_multi

expresion_multi
  = izq:expresion_unaria _ operador:("*"/"/" / "%") _ der:expresion_unaria {
    const loc = location()?.start;
    if(operador === "*") return new Expr_Aritmeticas(null, izq, der, ARITHMETIC_OP.MULTIPLICACION, loc?.line, loc?.column);
    else if(operador === "/") return new Expr_Aritmeticas(null, izq, der, ARITHMETIC_OP.DIVISION, loc?.line, loc?.column);
    else if(operador === "%") return new Expr_Aritmeticas(null, izq, der, ARITHMETIC_OP.MODULO, loc?.line, loc?.column);
  }
  / expresion_unaria

expresion_unaria
  = _ operador:("-"/"!") _ expr:expresion_unaria {
    const loc = location()?.start;
    if(operador === "-") return new Expr_Aritmeticas(expr, null, null, ARITHMETIC_OP.NEGACION, loc?.line, loc?.column);
    else if(operador === "!") return new Expr_Logicas(expr, null, null, LOGICAL_OP.NOT, loc?.line, loc?.column);
  }
  / expresion_primaria

expresion_primaria
  = "(" _ expr:expresion _ ")" { return expr; }
  / "[" _ expr:expresion _ "]" { return expr; }
  / terminal

expresion_lista
  = head:expresion rest:( _ "," _ expresion)* {
    return [head, ...rest.map(r => r[3])];
  } 
  / epsilon { return []; }

terminal
  = valor:DECIMAL {
    const loc = location()?.start;
    return new Nativo(valor, new Tipo(DatoNativo.DECIMAL), loc?.line, loc?.column);
  } 
  / valor:INTEGER {
    const loc = location()?.start;
    return new Nativo(valor, new Tipo(DatoNativo.ENTERO), loc?.line, loc?.column);
  }
  / valor:BOOLEAN {
    const loc = location()?.start;
    return new Nativo(valor, new Tipo(DatoNativo.BOOLEANO), loc?.line, loc?.column);
  }
  / valor:CADENA {
    const loc = location()?.start;
    return new Nativo(valor, new Tipo(DatoNativo.CADENA), loc?.line, loc?.column);
  }
  / valor:CARACTER {
    const loc = location()?.start;
    return new Nativo(valor, new Tipo(DatoNativo.CARACTER), loc?.line, loc?.column);
  }
  / valor:ID {
    const loc = location()?.start;
    return new Expr_AccesoVar(valor, loc?.line, loc?.column);
  }

tipo 
  = type:(_("int"/"float"/"string"/"boolean"/"char")_){
    if(type[1] === "int") return (new Tipo(DatoNativo.ENTERO));
    else if(type[1] === "float") return (new Tipo(DatoNativo.DECIMAL));
    else if(type[1] === "string") return (new Tipo(DatoNativo.CADENA));
    else if(type[1] === "boolean") return (new Tipo(DatoNativo.BOOLEANO));
    else if(type[1] === "char") return (new Tipo(DatoNativo.CARACTER));
  }

//-------------------- Analisis Lexico ----------------------

FindeLinea = [\n\r\u2028\u2029]

epsilon = ''

Comentario "comentario" =
  ComentMultilinea
  / ComentLinea

ComentMultilinea = "/*" (!"*/" .)* "*/"

ComentLinea = "//" (!FindeLinea .)*

_ "Espacio"
  =  (Comentario / [ \t\n\r]+)* { return null; }

INTEGER "integer"
  = _ [0-9]+ { return parseInt(text(), 10);}

DECIMAL "decimal"
  = _ [0-9]+ "." [0-9]+ { return parseFloat(text()).toFixed(1);}

BOOLEAN "boolean"
  = _ Truetoken { return true; }
  / _ Falsetoken { return false; }

CADENA "cadena"
  = _ "\"" (ContenidoCadena / SecuenciaEscape)* "\""
  { var cad = text(); return cad.slice(1,-1); }

CARACTER "caracter"
  = [\'][^\n\'][\'] { var c = text(); return c[1]; }

SecuenciaEscape
  = "\\" "\""  { return "\""; }
  / "\\" "\\"  { return "\\"; }
  / "\\" "n"   { return "\n"; }
  / "\\" "t"   { return "\t"; }
  / "\\" "r"   { return "\r"; }
  / "\\" "f"   { return "\f"; }
  / "\\" "'"   { return "'"; }

ContenidoCadena = [^\\"\n\r]+ { return text(); }

ID = !reservadas [a-zA-Z]([a-zA-Z]/[0-9]/"_")* { return text(); }

IDparte = [a-zA-Z0-9_]

reservadas = 
  SOUTtoken
  Truetoken
  Falsetoken
  Nulltoken
  Inttoken
  Floattoken
  Stringtoken
  Booleantoken
  Chartoken
  Vartoken
  Iftoken
  Elsetoken
  Switchtoken
  Casetoken
  Defaulttoken
  Breaktoken
  Whiletoken

// Tokens/Palabras Reservadas

SOUTtoken = "System.out.println"  !ID
Truetoken = "true"  !ID
Falsetoken = "false"  !ID
Nulltoken = "null"  !ID
Inttoken = "int"  !ID
Floattoken = "float"  !ID
Stringtoken = "string" !ID
Booleantoken = "boolean" !ID
Chartoken = "char" !ID
Vartoken = "var" !ID
Iftoken = "if" !ID
Elsetoken = "else" !ID
Switchtoken = "switch" !ID
Casetoken = "case" !ID
Defaulttoken = "default" !ID
Breaktoken = "break" !ID
Whiletoken = "while" !ID