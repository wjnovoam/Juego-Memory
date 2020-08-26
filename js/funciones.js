var arreglo = new Array();
var arregloJugar = [];
var contador = 0;
var contador_fallos=0;
var contador_aciertos=0;
var contador_tiempo=59;
var aleatorio;
var ciclo_tiempo;

window.onload = function () {
	for (i = 1; i <= 10; i++) {
		for (j = 0; j >= 0; j++) {
			aleatorio = Math.floor(Math.random() * 20 + 1);
			if (arreglo[aleatorio] == undefined) {
				document.getElementById('c' + aleatorio).style.backgroundImage ='url(img/img' + i + '.jpg)';
				arreglo[aleatorio] = i;
				contador++;
			}

			if (contador == 2) {
				break;
			}
		}

		contador = 0;
	}
	fondo();
	funcion_tiempo();
};

function fondo() {
	var ciclo = setInterval(function () {
		for (i = 1; i <= 20; i++) {
			document.getElementById('carta' + i).style.backgroundImage ='url(img/fondo.jpg)';
		}
		clearInterval(ciclo);
	}, 3000);
}

function jugar(num) {
	arregloJugar.push(num);
	document.getElementById('carta' + num).style.removeProperty('background-image');
	document.getElementById('c' + num).style.pointerEvents = 'none';

	if (arregloJugar[0] !== undefined && arregloJugar[1] !== undefined) {

		let valor1 = arregloJugar[0];
		let valor2 = arregloJugar[1];

		if (arreglo[valor1] == arreglo[valor2]) {
			contador_aciertos++;
			funcion_aciertos();
		}else{
			contador_fallos++;

			document.getElementById('c' + arregloJugar[0]).style.pointerEvents = 'auto';
			document.getElementById('c' + arregloJugar[1]).style.pointerEvents = 'auto';

			var ciclo = setInterval(function () {
				document.getElementById('carta' + valor1).style.backgroundImage ='url(img/fondo.jpg)';
				document.getElementById('carta' + valor2).style.backgroundImage ='url(img/fondo.jpg)';
				clearInterval(ciclo);
			}, 300);
			
			funcion_fallos();
		}
		arregloJugar.pop();
		arregloJugar.shift();
	}
}


function funcion_tiempo(){
	ciclo_tiempo = setInterval(function(){		
		document.getElementById("reloj").innerHTML= "<a id='text'>Tiempo restante: "+contador_tiempo+"</a>";
		
		if(contador_tiempo==0){
			clearInterval(ciclo_tiempo);
			mostrar_modal("1");
		}

		contador_tiempo--;

	},1000);
}


function funcion_fallos(){
	document.getElementById("fallos").innerHTML="<a id='text'>Fallos: "+contador_fallos+"/8</a>";
	if(contador_fallos==8){
		mostrar_modal("2");
		clearInterval(ciclo_tiempo);
	}
}

var ancho_barra = new Array("0","20","40","60","80","100","120","140","160","180","200");

function funcion_aciertos(){
	document.getElementById("progreso").style.width=ancho_barra[contador_aciertos]+"px";
	if(contador_aciertos==10){
		mostrar_modal("3");
		clearInterval(ciclo_tiempo);
	}
}

function mostrar_modal(opcion){
	if(opcion==1){	
		document.getElementById("encabesado").innerHTML="<h1>TIEMPO AGOTADO</h1><h4>Hazlo mas rapido la próxima</h4>";
		document.getElementById("cuerpo").innerHTML="<img class='img' src='img/estrella2.png'><img class='img' src='img/estrella2.png'><img class='img' src='img/estrella2.png'>";
	}else if(opcion==2){
		document.getElementById("encabesado").innerHTML="<h1>PERDISTE</h1><h4>Mejor suerte la próxima</h4>";
		document.getElementById("cuerpo").innerHTML="<img class='img' src='img/estrella2.png'><img class='img' src='img/estrella2.png'><img class='img' src='img/estrella2.png'>";
		clearInterval(ciclo_tiempo);
	}else if(opcion==3){
		document.getElementById("encabesado").innerHTML="<h1>FELICITACIONES</h1><h4>Has ganado</h4>";
		if(contador_tiempo<10){
			document.getElementById("cuerpo").innerHTML="<img class='img' src='img/estrella3.png'><img class='img' src='img/estrella2.png'><img class='img' src='img/estrella2.png'>";

		}else if(contador_tiempo>=10 && contador_tiempo<20){
			document.getElementById("cuerpo").innerHTML="<img class='img' src='img/estrella1.png'><img class='img' src='img/estrella2.png'><img class='img' src='img/estrella2.png'>";
		
		}else if(contador_tiempo>=20 && contador_tiempo<25){
			document.getElementById("cuerpo").innerHTML="<img class='img' src='img/estrella1.png'><img class='img' src='img/estrella3.png'><img class='img' src='img/estrella2.png'>";

		}else if(contador_tiempo>=25 && contador_tiempo<30){
			document.getElementById("cuerpo").innerHTML="<img class='img' src='img/estrella1.png'><img class='img' src='img/estrella1.png'><img class='img' src='img/estrella2.png'>";

		}else if(contador_tiempo>=30 && contador_tiempo<35){
			document.getElementById("cuerpo").innerHTML="<img class='img' src='img/estrella1.png'><img class='img' src='img/estrella1.png'><img class='img' src='img/estrella3.png'>";

		}else if(contador_tiempo>=35){
			document.getElementById("cuerpo").innerHTML="<img class='img' src='img/estrella1.png'><img class='img' src='img/estrella1.png'><img class='img' src='img/estrella1.png'>";

		}

	}
	document.getElementById("btnModal").click();

	for (i = 1; i <= 20; i++) {
		document.getElementById('c' + i).style.pointerEvents="none";
	}
		
}

