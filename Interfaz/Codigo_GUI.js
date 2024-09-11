
import { parse } from "../Analizador/parser.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import Errores from "../Simbolo/Errores.js";
import Arbol from "../Simbolo/Arbol.js";
import Instr_Break from "../Instrucciones/Instr_Break.js";
import Instr_Continue from "../Instrucciones/Instr_Continue.js";
import Instr_DeclaracionStruct from "../Instrucciones/Instr_DeclaracionStruct.js";

let tabCount = 0;
let tabsData = {};
let numeroError = 0;
export let ListaSimbolos = [];
export let ListaErrores = [];

export function addTab() {
    tabCount++;
    const tabId = `tab${tabCount}`;

    // Crear el botón de la pestaña
    const tabButton = document.createElement('button');
    tabButton.innerText = `Archivo ${tabCount}`;
    tabButton.className = 'tab-button';
    tabButton.onclick = () => switchTab(tabId);

    // Crear el contenido de la pestaña
    const tabContent = document.createElement('div');
    tabContent.className = 'tab';
    tabContent.id = tabId;
    tabContent.innerHTML = `<textarea placeholder="Contenido de Archivo ${tabCount}"></textarea>`;

    // Agregar el botón y el contenido al DOM
    document.getElementById('tabs-container').appendChild(tabButton);
    document.getElementById('tabs-container').appendChild(tabContent);

    tabsData[tabId] = {
        fileName: `Archivo ${tabCount}`,
        content: ""
    };

    // Activar la nueva pestaña
    switchTab(tabId);
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabButtons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`button[onclick="switchTab('${tabId}')"]`).classList.add('active');
}

export function loadFile(event){
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const fileName = file.name.replace('.oak', '');

            tabCount++;
            const tabId = `tab${tabCount}`;
            
            const tabButton = document.createElement('button');
            tabButton.innerText = fileName;
            tabButton.className = 'tab-button';
            tabButton.onclick = () => switchTab(tabId);

            const tabContent = document.createElement('div');
            tabContent.className = 'tab';
            tabContent.id = tabId;
            tabContent.innerHTML = `<textarea style="width: 100%; height: 400px;">${content}</textarea>`;

            document.getElementById('tabs-container').appendChild(tabButton);
            document.getElementById('tabs-container').appendChild(tabContent);

            tabsData[tabId] = {
                fileName: fileName,
                content: content
            };

            switchTab(tabId);
        };
        reader.readAsText(file);
    }
}

export function Ejecutar(){
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const content = activeTab.querySelector('textarea').value;
        const resultado = parse(content);

        const ast = new Arbol(resultado);
        const tabla = new TablaSimbolos();
        ListaErrores = [];
        ListaSimbolos = [];
        numeroError = 0;
        tabla.setNombre("GLOBAL");
        ast.setConsola("");
        ast.setTablaGlobal(tabla);

        console.log(resultado);

        for (let element of resultado) {

            if(element instanceof Instr_Break){
                let error = new Errores("Semantico", "Break fuera de ciclo", element.Linea, element.Columna);
                ListaErrores.push(error);
                continue;
            }

            if(element instanceof Instr_Continue){
                let error = new Errores("Semantico", "Continue fuera de ciclo", element.Linea, element.Columna);
                ListaErrores.push(error);
                continue;
            }

            if(element instanceof Errores){
                ListaErrores.push(element);
                continue;
            }

            if(element instanceof Instr_DeclaracionStruct){
                element.Interpretar(ast, tabla);
                ast.addStructs(element);
                continue;
            }

            let res = element.Interpretar(ast, tabla);

            if(res instanceof Errores){
                ListaErrores.push(res);
            }
            
        }

        console.log(ListaSimbolos);
        
        let Consola = ast.getConsola();
        ListaErrores.forEach((element) => {
            Consola += `Error ${++numeroError} - ` + element.toString() + "\n";
        });
        document.getElementById('output').innerText = Consola;
        
    } else {
        document.getElementById('output').innerText = 'No hay una pestaña activa.';
    }
}


export function GuardarArchivo(){
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const tabId = activeTab.id;
        const fileData = tabsData[tabId];
        if (fileData && fileData.fileName) {
            const content = activeTab.querySelector('textarea').value;

            // Crear un blob con el contenido actualizado
            const blob = new Blob([content], { type: 'text/plain' });
            
            // Crear un enlace de descarga
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileData.fileName + ".oak"; // Guardar con el nombre original del archivo
            
            // Desencadenar la descarga
            a.click();
            
            // Liberar el objeto URL
            URL.revokeObjectURL(a.href);
        } else {
            alert('No se ha cargado un archivo en esta pestaña.');
        }
    } else {
        alert('No hay una pestaña activa.');
    }
}


