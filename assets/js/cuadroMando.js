//*******  datos generales */
/* manager1={
    tarea1_data : [14,	4,	5,	22,	10,	11,	11,	7 ],
    tarea2_data : [26,	28,	17,	46,	21,	29,	35,	37],
    tarea3_data : [12,	9,	26,	14,	12,	18,	19,	0]

}
manager2={
    tarea1_data : [20,	17,	21,	16,	19,	46,	47,	2],
    tarea2_data : [40,	38,	64,	76,	70,	83,	89,	47],
    tarea3_data : [26,	30,	37,	31,	47,	42,	47,	49]
}
manager3={
    tarea1_data : [0, 1, 9, 6, 12, 13, 13, 15],
    tarea2_data : [25, 33, 62, 38, 48, 56, 25, 30],
    tarea3_data : [23, 17, 9, 30, 38, 36, 22, 15]
}
manager4={
    tarea1_data : [16,	18,	28,	35,	25,	18,	17,	12],
    tarea2_data : [61,	59,	35,	89,	18,	95,	97,	40],
    tarea3_data : [20,	32,	38,	29,	25,	25,	29,	51]     
}
resumenSemanasDat = [manager1, manager2, manager3, manager4]; */


//*******  datos gráfico donut */
var tareasData = [6, 38, 30];
var tareasLabels = [tareas[0]+'-'+tareasData[0], tareas[1]+'-'+tareasData[1], tareas[2]+'-'+tareasData[2]];

//**** variables para generar gráficos*/
var doughnutChartCanvas;
var doughnutPieData;
var doughnutPieOptions;
var doughnutChart;
var colors = [ChartColor[0], ChartColor[1], ChartColor[2]];

//***** datos para la gráfica de barras */;
var tarea1_data = resumenSemanasDat[0].tarea1_data;
var tarea2_data = resumenSemanasDat[0].tarea2_data;
var tarea3_data = resumenSemanasDat[0].tarea3_data;
var stackedbarChartCanvas = $("#stackedbarChart").get(0).getContext("2d");
var stackedbarChar;
var maxValSemanas = 60;
var saltoValY = 10;


//******** Al seleccionar un nuevo manager, genera las gráficas correspondientes
function genChartsTareas(managersel) {
    numElemento = $.inArray(managersel, arrManagers);
    tarea1_data = resumenSemanasDat[numElemento].tarea1_data;
    tarea2_data = resumenSemanasDat[numElemento].tarea2_data;
    tarea3_data = resumenSemanasDat[numElemento].tarea3_data;
    genSelects(arrManagers, 'selManager', '#spanManagers', managerInicial, "genChartsTareas(this.value)", 'Manager');
    genSelects(arrSemanas, 'selSemanas', '#spanSemanas', semanaInicial, "genChartDonaTareas(this.value)", 'Sem');
    genChartDonaTareas(arrSemanas[0]);
    drawTareasBarras();
  }

//**** Al seleccionar una semana, genera la gráfica donu*/
function genChartDonaTareas(semanaSel){
    numElemento = $.inArray(semanaSel, arrSemanas);
    tareasData = [tarea1_data[numElemento], tarea2_data[numElemento], tarea3_data[numElemento]];
    tareasLabels = [tareas[0]+'-'+tareasData[0], tareas[1]+'-'+tareasData[1], tareas[2]+'-'+tareasData[2]];
    drawTareasDouhg();
  }

//**** funciones para generar los selects parámetros*/
function genSelects(valores, idSel, idElemento, eleSelected, funcion, etiqueta){
    var selectGen = '<select id="'+idSel+'" onchange="'+funcion+'">';
    for(i=0; i<valores.length; i++){j=i+1;
      selectGen += '<option value="'+valores[i]+'">'+etiqueta+j+': '+valores[i]+'</option> ';
    }
    selectGen += '</select>';
    $(idElemento).html(selectGen);
    $('#'+idSel+' option[value="'+eleSelected+'"').attr("selected", true);
  }
 
//**** funciones para la grafica de barras */
function drawTareasBarras() {
    stackedbarChart = new Chart(stackedbarChartCanvas, {
        type: 'bar',
        data: {
            labels: tareasLabelsBarras,
            datasets: [{
                label: tareasLabels[0],
                backgroundColor: colors[0],
                borderColor: colors[0],
                borderWidth: 1,
                data: tarea1_data
            },
            {
                label: tareasLabels[1],
                backgroundColor: colors[1],
                borderColor: colors[1],
                borderWidth: 1,
                data: tarea2_data
            },
            {
                label: tareasLabels[2],
                backgroundColor: colors[2],
                borderColor: colors[2],
                borderWidth: 1,
                data: tarea3_data
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: false,
            categoryPercentage: 0.5,
            stacked: true,
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Semanas',
                        fontSize: 12,
                        lineHeight: 2
                    },
                    ticks: {
                        fontColor: '#bfccda',
                        stepSize: saltoValY,
                        min: 0,
                        max: maxValSemanas,
                        autoSkip: true,
                        autoSkipPadding: 15,
                        maxRotation: 0,
                        maxTicksLimit: 10
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        color: 'transparent',
                        zeroLineColor: '#eeeeee'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Tiempo Utilizado',
                        fontSize: 12,
                        lineHeight: 2
                    },
                    ticks: {
                        fontColor: '#bfccda',
                        stepSize: saltoValY,
                        min: 0,
                        max: maxValSemanas,
                        autoSkip: true,
                        autoSkipPadding: 15,
                        maxRotation: 0,
                        maxTicksLimit: 10
                    },
                    gridLines: {
                        drawBorder: false
                    }
                }]
            },
            legend: {
                display: false
            },
            legendCallback: function (chart) {
                var text = [];
                text.push('<div class="card-title mb-0">');
                for (var i = 0; i < tareasLabelsBarras.length; i++) {
                    text.push('<span class="text-primary">'+tareasLabelsBarras[i] +'</span>: ');
                    text.push(arrSemanas[i]+', ');
                }
                text.push('</div>');
                return text.join("");
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    });
   // document.getElementById('stacked-bar-traffic-legend').innerHTML = stackedbarChart.generateLegend();
}

//*******  funciones para el pie */
function drawTareasDouhg() {
    doughnutChartCanvas = $("#doughnutTareas").get(0).getContext("2d");
    doughnutPieData; dataChart(tareasData, tareasLabels, colors);
    doughnutPieOptions; optionsChart();

    doughnutChart = new Chart(doughnutChartCanvas, {
        type: 'doughnut',
        data: doughnutPieData,
        options: doughnutPieOptions
    });

    document.getElementById('legend-tareas').innerHTML = doughnutChart.generateLegend();
}

function dataChart(parData, parLabels) {
    doughnutPieData = {
        datasets: [{
            data: parData,
            backgroundColor: colors,
            borderColor: colors,
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: parLabels
    };
}
function optionsChart() {
    doughnutPieOptions = {
        cutoutPercentage: 75,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: true,
        showScale: true,
        legend: false,
        legendCallback: function (chart) {
            var text = [];
            text.push('<div class="chartjs-legend"><ul>');
            for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                text.push('<li><span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '">');
                text.push('</span>');
                if (chart.data.labels[i]) {
                    text.push(chart.data.labels[i]);
                }
                text.push('</li>');
            }
            text.push('</div></ul>');
            return text.join("");
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
    };
}

