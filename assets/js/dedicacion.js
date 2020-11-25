var arrSemanas = [];
var semanaInicial;
var tareasLabelsBarras = [];
var arrManagers = [];
var managerInicial;
var tareas = [];
var resumenSemanasDat = [];

function selSemanas() {
    $.ajax({
        url: "controllers/dedicacion.php",
        data: "operacion=selSemanas",
        type: "post",
    }).done(function (respuestaphp) {
        if (respuestaphp == "") {
            alert("error");
        } else {
            arrSemanas = respuestaphp.split(",");
            arrSemanas.pop();
            semanaInicial = arrSemanas[0];
            for (i = 0; i < arrSemanas.length; i++) {
                j = i + 1;
                tareasLabelsBarras[i] = "Sem" + j;
            }
        }
    });
}

function selAdministradores() {
    $.ajax({
        url: "controllers/dedicacion.php",
        data: "operacion=selAdministradores",
        type: "post",
    }).done(function (respuestaphp) {
        if (respuestaphp == "") {
            alert("error");
        } else {
            arrManagers = respuestaphp.split(",");
            arrManagers.pop();
            managerInicial = arrManagers[0];
            genChartsTareas(managerInicial)
        }
    });
}

function selTareas() {
    $.ajax({
        url: "controllers/dedicacion.php",
        data: "operacion=selTareas",
        type: "post",
    }).done(function (respuestaphp) {
        if (respuestaphp == "") {
            alert("error");
        } else {
            tareas = respuestaphp.split(",");
            tareas.pop();
        }
    });
}

function selDedicacion() {
    $.ajax({
        url: "controllers/dedicacion.php",
        data: "operacion=selDedicacion",
        type: "post",
    }).done(function (respuestaphp) {
        if (respuestaphp == "") {
            alert("error");
        } else {
            const data = JSON.parse(respuestaphp)
            //************ obtiene la dedicación para cada semana y tarea, agrupando por administrador */
            const data1 = Object.entries(data.reduce((acc, { fecha, admin, tarea, dedicacion }) => {
                acc[admin] = (acc[admin] || []);
                acc[admin].push({ fecha, tarea, dedicacion });
                return acc;
            }, {})).map(([key, value]) => ({ admin: key, children: value }));
            
            //********arma el obejto con la información para cada manager */
            for (iAdmin = 0; iAdmin < data1.length; iAdmin++) {
                const admin_id = data1[0].admin;
                const dataR = data1[0].children;//contiene el vector
                eval("var manager" + admin_id + "={}");//********declara el objeto para cada amdministrador
                //************ obtiene la dedicación para cada una de las semana, agrupando por tarea */
                const resultado = Object.entries(dataR.reduce((acc, { fecha, tarea, dedicacion }) => {
                    acc[tarea] = (acc[tarea] || []);
                    acc[tarea].push({ fecha, dedicacion });
                    return acc;
                }, {})).map(([key, value]) => ({ tarea: key, children: value }));
                //********arma los resumenes por tarea y los asigna a cada manager */
                for (iTareas = 0; iTareas < resultado.length; iTareas++) {
                    const tarea_id = resultado[iTareas].tarea;
                    const dataTareas = resultado[iTareas].children;//contiene el vector con la información para la tarea
                    var arrTareas = [];//contiene la dedicación para una tarea determinada
                    for (i = 0; i < arrSemanas.length; i++) arrTareas[i] = 0;//incializa el array de tareas
                    //asigna los valores para cada una de las semanas
                    for (i = 0; i < dataTareas.length; i++) {
                        indice = arrSemanas.indexOf(dataTareas[i].fecha);
                        arrTareas[indice] = parseInt(dataTareas[i].dedicacion);
                    }
                    //**** declarar variable y asignar valor */
                    eval("var tarea" + tarea_id + "_data=[]");//********declara el vector para cada tarea
                    eval("tarea" + tarea_id + "_data = arrTareas");//********asigna valores para cada tarea
                    //**** declarar vector en el objeto y asignar valor */
                    eval("manager" + admin_id + ".tarea" + tarea_id + "_data = []");//********declara el vector para cada tarea
                    eval("manager" + admin_id + ".tarea" + tarea_id + "_data = tarea" + tarea_id + "_data");
                }
                //************    */
                resumenSemanasDat[iAdmin] = eval("manager" + admin_id);//asigna el resumen de tarea al manager correspondiente
            }

        }//fin del else respuestaphp == ""
    });
}
