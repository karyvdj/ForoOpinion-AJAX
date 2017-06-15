var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $listaTemas = $("#lista-temas");
var $info = $("#info");


var cargarPagina = function(){
  $('.modal').modal();
  cargarTemas();
  $("#agregar-btn").click(agregarTema);
  $("#busqueda").submit(filtrarTemas);
  $(document).on("click",$info,obtenerDatos);
}

var plantillaTema = "<tr data-id='__id__'>"+
          "<td>__autor__</td>"+
          "<td>__mensaje__</td>"+
          "<td>__respuestas__</td>"+
          "<td>"+
            "<a class='waves-effect waves-light' id='info' href='#modalInfo'><i class='material-icons'>visibility</i></a>"+
          "</td>"+
        "</tr>";

var cargarTemas = function () {
  $.getJSON(api.url, function (tema) {
    tema.forEach(crearTema);
  });
};


var crearTema = function (tema) {
  var $plantillaFinal = "";
  var $autor = tema.author_name;
  var $mensaje = tema.content;
  var $id = tema.id;
  // console.log($id)
  var $respuestas = tema.responses_count;

  $plantillaFinal += plantillaTema.replace("__autor__", $autor)
  .replace("__mensaje__", $mensaje)
  .replace("__respuestas__", $respuestas)

  $listaTemas.append($plantillaFinal);
};

var agregarTema = function (e) {
  e.preventDefault();
  var $obtenerAutor = $("#texto-autor").val();
  var $obtenerMensaje = $("#texto-mensaje").val();
  var $respuesta = 0;

  $.post(api.url, {
      author_name: $obtenerAutor,
      content: $obtenerMensaje,
      responses_count: $respuesta
     }, function (tema) {
    crearTema(tema);
  });
};

var filtrarTemas = function (e) {
	e.preventDefault();
	var $busqueda = $("#buscar").val().toLowerCase();
  var $mensaje = tema.content;
	var $temaFiltrados = $mensaje.filter(function (temas) { //temas no esta definido
		return temas.content.toLowerCase().indexOf($busqueda) >= 0;
	});
crearTema($temaFiltrados);
};

function obtenerDatos(){
  var temaId = $(this).closest("tr").data("id");
  console.log(temaId);
  var urlTema = api.url + temaId;
  console.log(urlTema);

  // $.getJSON(urlTema,function(response){
  //   var $autor= response.author_name;
  //   var $mensaje = response.content;
  //   var $id = response.id;
  //   console.log($id)
  //   var $respuestas = response.responses_count;
  //
  //   MostrarInfo({
  //     autor: $autor,
  //     mensaje: $mensaje,
  //     id: $id,
  //     respuesta: $respuestas
  //   });
  // });
}
//
// function MostrarInfo(objeto){
//   var $autor = $("#autor");
//   var $mensaje = $("#tema");
//   var $respuesta = $("#respuesta");
//
//   $autor.text(objeto.autor);
//   $mensaje.text(objeto.mensaje);
//   $respuesta.text(objeto.respuesta);
//
// }

// ---------movile---------
$(document).ready(cargarPagina);
