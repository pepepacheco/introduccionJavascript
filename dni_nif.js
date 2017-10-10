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
	var numero = parseInt(_documento, 10);
	console.log(letra[numero]); //hay que cambiar letra a array
	return letra[numero];
  };
  return { 
	comprobarFormato : function () { return /^[\d]{8}[a-zA-Z]?$/.test(_documento); },
	tipoDocumento    : function () { if ( this.comprobarFormato () ){
					   if (_documento.length === 8 ) {
						return 'dni';
					   } else {
						return 'nif';
					   }
					 } else {
					   return 'documento NO válido';
					 }
			   },
	letraDNI : function () { if ( this.tipoDocumento () === 'dni' ) {
				   return calcularLetra();
				 } else if (this.tipoDocumento () === 'nif' ) {
				   return 'Es un nif';
                                 } else {
                                   return 'documento NO válido';
                                 }
			}
	 	

  }
}

//creamos un objeto documento
var documento1 = documento( cadena );
console.log(cadena + ' ¿Formato correcto? ' + documento1.comprobarFormato () );
console.log(cadena + ' Tipo de documento: ' + documento1.tipoDocumento () );
console.log(cadena + ' Letra dni: ' + documento1.letraDNI () );







