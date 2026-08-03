
function mostrarVentana(idDeLaVentana) {
  var ventana = document.getElementById(idDeLaVentana);
  if (ventana) {
    ventana.style.display = 'flex';
  }
}

function ocultarVentana(idDeLaVentana) {
  var ventana = document.getElementById(idDeLaVentana);
  if (ventana) {
    ventana.style.display = 'none';
  }
}
var botonMenu = document.getElementById('botonMenu');
var menuCelular = document.getElementById('menuCelular');

if (botonMenu && menuCelular) {
  botonMenu.addEventListener('click', function() {
    menuCelular.classList.toggle('abierto');
  });

  var enlacesCelular = menuCelular.querySelectorAll('a');
  enlacesCelular.forEach(function(enlace) {
    enlace.addEventListener('click', function() {
      menuCelular.classList.remove('abierto');
    });
  });
}
function iniciarContador(idElemento, valorFinal, sufijo) {
  var elemento = document.getElementById(idElemento);
  if (!elemento) return;

  var cuentaActual = 0;
  var salto = Math.ceil(valorFinal / 50); 

  var temporizador = setInterval(function() {
    cuentaActual += salto;
    
    if (cuentaActual >= valorFinal) {
      cuentaActual = valorFinal;
      clearInterval(temporizador); 
    }

    elemento.innerText = cuentaActual.toLocaleString('es-CO') + sufijo;
  }, 25);
}

window.onload = function() {
  iniciarContador('num-usuarios', 10000, '+');
  iniciarContador('num-simulacros', 5000, '+');
  iniciarContador('num-aprobacion', 94, '%');
};

function simularLogin() {
  var email = document.getElementById('txt-login-email').value;
  if (!email) email = "aprendiz.adso@sena.edu.co";
  
  localStorage.setItem('sessionUser', email);
  localStorage.setItem('userName', "Estudiante Sena");

  aplicarInterfazUsuarioLogeado(email);
  ocultarVentana('ventana-login');
  alert("Sesión iniciada como: " + email + "\nTu progreso académico ahora se salvará en la cuenta de forma automática.");
}

function simularRegistro() {
  var nombre = document.getElementById('txt-reg-nombre').value;
  if(!nombre) nombre = "Usuario ADSO";
  
  localStorage.setItem('sessionUser', "correo@ejemplo.com");
  localStorage.setItem('userName', nombre);

  aplicarInterfazUsuarioLogeado(nombre);
  ocultarVentana('ventana-registro');
  alert(" ¡Cuenta de usuario creada con éxito!\nBienvenido a No Te Estrelles.");
}

function aplicarInterfazUsuarioLogeado(nombreAMostrar) {
  var bAuth = document.getElementById('auth-botones');
  var bUser = document.getElementById('user-logeado');
  var nNav = document.getElementById('user-nav-name');
  var ePerfilNav = document.getElementById('enlace-perfil-nav');
  var ePerfilCel = document.getElementById('enlace-perfil-cel');

  if(bAuth) bAuth.style.display = 'none';
  if(bUser) bUser.style.display = 'flex';
  if(nNav) nNav.innerText = nombreAMostrar;
  if(ePerfilNav) ePerfilNav.style.display = 'inline-block';
  if(ePerfilCel) ePerfilCel.style.display = 'block';
}

function cerrarSession() {
  localStorage.clear();
  location.reload();
}
function recuperarClaveFicticia() {
  var email = prompt("Escribe tu correo electrónico para enviarte las instrucciones de restablecimiento de contraseña:");
  if (email) {
    alert(" Correo de recuperación de clave despachado correctamente a: " + email + "\nVerifica tu buzón principal y la carpeta de spam.");
    ocultarVentana('ventana-login');
  }
}
function guardarDatosPersonales() {
  var nombre = document.getElementById('txt-perfil-nombre').value;
  var email = document.getElementById('txt-perfil-email').value;
  
  localStorage.setItem('userName', nombre);
  alert(" Datos personales guardados con éxito en la plataforma.\nNombre en diplomas: " + nombre + "\nCorreo: " + email);
  
  var nNav = document.getElementById('user-nav-name');
  if(nNav) nNav.innerText = nombre;
  ocultarVentana('ventana-perfil');
}
function buscarTemaGlobal() {
  var query = document.getElementById('buscador-global').value.toLowerCase();
  if(!query) {
    alert("Por favor escribe una palabra clave para buscar.");
    return;
  }
  
  if(query.includes("señal") || query.includes("senal") || query.includes("pare")) {
    alert("🔍 Resultado encontrado:\n- Temario: 'Módulo 2: Señalización Vial Avanzada'\n- Examen: 'Prueba de Señales'.\nRedireccionando...");
    window.location.href = "examenes.html";
  } else if(query.includes("velocidad") || query.includes("limite")) {
    alert("🔍 Resultado encontrado:\n- Temario: 'Módulo 1: Leyes y Normas'\n- Examen: 'Límites y Velocidades'.\nRedireccionando...");
    window.location.href = "examenes.html";
  } else {
    alert("🔍 Buscando en el banco de datos escolar '" + query + "'...\nSe encontraron 2 lecturas sugeridas en la sección de Temarios.");
    window.location.href = "temarios.html";
  }
}
function activarRecordatorios() {
  alert("🔔 ¡Recordatorios diarios configurados!\nRecibirás alertas automáticas en tu dispositivo móvil para mantener constancia en tu preparación académica.");
}

var cronoInterval = null;
var nombreExamenActual = "";
var estadisticasIntentos = 1;
var estadisticasAprobados = 1;
var estadisticasReprobados = 0;
function filtrarCategoria(categoria) {
  var cardGen = document.getElementById('tarjeta-general');
  var cardSen = document.getElementById('tarjeta-senales');
  var cardVel = document.getElementById('tarjeta-velocidades');

  if(!cardGen) return;

  if(categoria === 'General') {
    cardGen.style.display = 'flex'; cardSen.style.display = 'flex'; cardVel.style.display = 'flex';
  } else if(categoria === 'Señales') {
    cardGen.style.display = 'none'; cardSen.style.display = 'flex'; cardVel.style.display = 'none';
  } else if(categoria === 'Velocidades') {
    cardGen.style.display = 'none'; cardSen.style.display = 'none'; cardVel.style.display = 'flex';
  }
}

function abrirExamenSimulado(nombreExamen, minutosLimite) {
  nombreExamenActual = nombreExamen;
  document.getElementById('lbl-nombre-intento').innerText = nombreExamen;
  
  if(nombreExamen.includes("Velocidades")) {
    document.getElementById('bloque-imagen-pregunta').style.display = 'none';
    document.getElementById('txt-enunciado-pregunta').innerText = "¿Cuál es el límite máximo de velocidad permitido en zonas residenciales y escolares?";
    document.getElementById('txt-contador-progreso').innerText = "Pregunta 1 de 1";
    document.getElementById('txt-contador-faltantes').innerText = "(Faltan 0 por responder)";
    document.getElementById('barra-progreso-interna').style.width = "100%";
  } else {
    document.getElementById('bloque-imagen-pregunta').style.display = 'block';
    document.getElementById('txt-enunciado-pregunta').innerText = "¿Cuál es la conducta obligatoria al encontrarse frente a esta señalización vial?";
    document.getElementById('txt-contador-progreso').innerText = "Pregunta 1 de 2";
    document.getElementById('txt-contador-faltantes').innerText = "(Falta 1 por responder)";
    document.getElementById('barra-progreso-interna').style.width = "50%";
  }
  var segundosTotales = minutosLimite * 60;
  clearInterval(cronoInterval);
  
  cronoInterval = setInterval(function() {
    var min = Math.floor(segundosTotales / 60);
    var seg = segundosTotales % 60;
    if(seg < 10) seg = "0" + seg;
    document.getElementById('txt-cronometro').innerText = "⏱" + min + ":" + seg;
    
    if(segundosTotales <= 0) {
      clearInterval(cronoInterval);
      alert("⏱️ ¡Tiempo agotado! Tu examen se calificará automáticamente con las respuestas guardadas.");
      calcularCalificacionAlInstante();
    }
    segundosTotales--;
  }, 1000);

  document.getElementById('modal-fase-pregunta').style.display = 'block';
  document.getElementById('modal-fase-resultado').style.display = 'none';
  mostrarVentana('ventana-simulador-activo');
}

function cerrarExamenFrenado() {
  var c = confirm("¿Deseas salir del examen? Se perderá el intento actual.");
  if(c) {
    clearInterval(cronoInterval);
    ocultarVentana('ventana-simulador-activo');
  }
}
function calcularCalificacionAlInstante() {
  clearInterval(cronoInterval);
  
  var esCorrecta = document.getElementById('opcion-correcta-check').checked;
  var notaFinal = 0;
  var msgEstado = "";
  var colorTexto = "";
  var bgColorCaja = "";

  estadisticasIntentos++;

  if(esCorrecta) {
    notaFinal = 100;
    msgEstado = "¡Aprobado con Excelente Desempeño!";
    colorTexto = "#2e7d32";
    bgColorCaja = "#e8f5e9";
    estadisticasAprobados++;
    
    document.getElementById('bloque-certificado-descarga').style.display = 'block';
    document.getElementById('txt-recomendar-texto').innerText = "¡Excelente nivel de preparación! Te aconsejamos programar el examen oficial ante el organismo de tránsito vial lo antes posible.";
  } else {
    notaFinal = 50;
    msgEstado = "Reprobado - Requiere Refuerzo Académico";
    colorTexto = "#c62828";
    bgColorCaja = "#ffebee";
    estadisticasReprobados++;

    document.getElementById('bloque-certificado-descarga').style.display = 'none';
    document.getElementById('txt-recomendar-texto').innerText = " Alerta de Refuerzo: Has fallado en las normativas regulatorias. Te sugerimos repasar con urgencia el 'Módulo 2: Señalización Vial Avanzada' antes de volver a intentar.";
  }
  document.getElementById('txt-nota-obtenida').innerText = notaFinal + " / 100";
  document.getElementById('txt-nota-obtenida').style.color = colorTexto;
  document.getElementById('txt-estado-mensaje').innerText = msgEstado;
  document.getElementById('txt-estado-mensaje').style.color = colorTexto;
  document.getElementById('caja-color-nota').style.background = bgColorCaja;

  document.getElementById('est-hechos').innerText = estadisticasIntentos;
  document.getElementById('est-aprobados').innerText = estadisticasAprobados;
  document.getElementById('est-reprobados').innerText = estadisticasReprobados;
  var porcentajeEfectividad = Math.round((estadisticasAprobados / estadisticasIntentos) * 100);
  var gBarra = document.getElementById('grafico-barra-progreso');
  gBarra.style.width = porcentajeEfectividad + "%";
  gBarra.innerText = porcentajeEfectividad + "% Efectividad Promedio";
  if(porcentajeEfectividad < 70) gBarra.style.background = "#f44336";
  else if(porcentajeEfectividad < 90) gBarra.style.background = "#ff9800";
  else gBarra.style.background = "#4caf50";
  var tabla = document.getElementById('tabla-historial-cuerpo');
  var nuevaFila = tabla.insertRow(0);
  nuevaFila.style.borderBottom = "1px solid #e8ecf1";
  
  var cFecha = nuevaFila.insertCell(0);
  var cExamen = nuevaFila.insertCell(1);
  var cNota = nuevaFila.insertCell(2);
  var cEstado = nuevaFila.insertCell(3);
  var cAccion = nuevaFila.insertCell(4);

  cFecha.style.padding = "10px"; cFecha.innerText = "29/06/2026";
  cExamen.innerText = nombreExamenActual;
  cNota.innerHTML = "<strong>" + notaFinal + " / 100</strong>";
  cEstado.innerText = (notaFinal >= 70) ? "Aprobado" : "Reprobado";
  cEstado.style.color = (notaFinal >= 70) ? "#4caf50" : "#f44336";
  cEstado.style.fontCenter = "bold";
  cAccion.innerHTML = '<button class="boton-amarillo" style="padding: 4px 10px; font-size: 0.75rem;" onclick="abrirExamenSimulado(\''+nombreExamenActual+'\', 15)"> Repetir</button>';

  document.getElementById('modal-fase-pregunta').style.display = 'none';
  document.getElementById('modal-fase-resultado').style.display = 'block';
}
