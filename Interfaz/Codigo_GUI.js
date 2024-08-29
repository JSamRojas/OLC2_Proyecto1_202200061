
import { parse } from "../Analizador/parser.js";
import TablaSimbolos from "../Simbolo/TablaSimbolos.js";
import Errores from "../Simbolo/Errores.js";
import Arbol from "../Simbolo/Arbol.js";

let tabCount = 0;
let tabsData = {};
export let ListaSimbolos = [];

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
        tabla.setNombre("Global");
        ast.setConsola("");
        ast.setTablaGlobal(tabla);

        console.log(resultado);

        resultado.forEach((element) => {
            if (element === null){
                console.log("Elemento nulo");
            }
            element.Interpretar(ast, tabla);
        });
        
        const Consola = ast.getConsola(); 
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


