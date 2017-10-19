//comprobamos que introducimos un dni/nif

if (process.argv.length < 3) {
  console.log('Falta documento a analizar');
  process.exit(1);
}

console.log('Documento leído: ' + process.argv[2]);
const cadena = process.argv[2];

//Creamos un clousure para crear objetos documento




var documento =  function ( nif_dni ) {
  var _documento = nif_dni;
  var calcularLetra = function () {
    const letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var numero = parseInt(_documento);
    return letra.charAt(numero % 23);
  };
  var comprobarFormato = function () {
    return /^[\d]{8}[a-zA-Z]?$/.test(_documento);
  };
  var tipoDocumento  = function () {
     if ( comprobarFormato () ){
					   if (_documento.length === 8 ) {
						return 'dni';
					   } else {
						return 'nif';
					   }
		 } else {
					   return 'documento NO válido';
					 }
		 };

     var letraDNI = function () {
        if ( tipoDocumento () === 'dni' ) {
           return calcularLetra();
   		  } else if (tipoDocumento () === 'nif' ) {
     	     return 'Es un nif';
         } else {
           return 'documento NO válido';
        }
   	 };

     var comprobarLetraNIF = function () {
              if (tipoDocumento() === 'nif'){
                return calcularLetra() === _documento.toUpperCase().charAt(_documento.length -1);
              }
              else if (tipoDocumento () === 'dni') {
                return 'Es un dni';
              } else {
                return 'documento NO válido';
              }
      };
   return {

	     documentoSerializado :  function () {
         var documento = {};
         documento.formato_correcto   = comprobarFormato();
         documento.tipoDocumento      = tipoDocumento();
         documento.letra_dni          = letraDNI();
         documento.letra_nif_correcta = comprobarLetraNIF();
         console.log(typeof documento);
         console.log(typeof JSON.stringify(documento));
         return JSON.stringify(documento);
       }
	}
}

//creamos un objeto documento
var documento1 = documento( cadena );
/*console.log(cadena + ' ¿Formato correcto? ' + documento1.comprobarFormato () );
console.log(cadena + ' Tipo de documento: ' + documento1.tipoDocumento () );
console.log(cadena + ' Letra dni: ' + documento1.letraDNI () );
console.log(cadena + ' Letra nif correcta: ' + documento1.comprobarLetraNIF () );*/
console.log(documento1.documentoSerializado());
