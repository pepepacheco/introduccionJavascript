//comprobamos que introducimos un dni/nif

if (process.argv.length < 3) {
  console.log('Falta documento a analizar');
  process.exit(1);
};

console.log('Documento leído: ' + process.argv[2]);
const cadena = process.argv[2];

//usamos un constructor
function Documento(documento) {
  this.documento = documento;
};

Documento.prototype.calcularLetra = function () {
  const letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var numero = parseInt(this.documento);
  return letra.charAt(numero % 23);
};

Documento.prototype.comprobarFormato = function () {
  return /^[\d]{8}[a-zA-Z]?$/.test(this.documento);
};

Documento.prototype.tipoDocumento = function () {
  if ( this.comprobarFormato () ){
			   if (this.documento.length === 8 ) {
						return 'dni';
				 } else {
						return 'nif';
				 }
	} else {
			return 'documento NO válido';
	}
};

Documento.prototype.letraDNI = function() {
  if ( this.tipoDocumento () === 'dni' ) {
       return this.calcularLetra();
	} else if (this.tipoDocumento () === 'nif' ) {
       return 'Es un nif';
  } else {
       return 'documento NO válido';
  }
}

Documento.prototype.comprobarLetraNIF = function () {
  if (this.tipoDocumento() === 'nif'){
    return this.calcularLetra() === this.documento.toUpperCase().charAt(this.documento.length -1);
  } else if (this.tipoDocumento () === 'dni') {
    return 'Es un dni';
  } else {
    return 'documento NO válido';
  }
};



var documento1 = new Documento( cadena );
console.log(cadena + ' ¿Formato correcto? ' + documento1.comprobarFormato () );
console.log(cadena + ' Tipo de documento: ' + documento1.tipoDocumento () );
console.log(cadena + ' Letra dni: ' + documento1.letraDNI () );
console.log(cadena + ' Letra nif correcta: ' + documento1.comprobarLetraNIF () );
