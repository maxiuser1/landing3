import { string, object, ref } from 'yup';

export default object({
	nombre: string().required('Es necesario completar este campo').trim(),
	apellido: string().required('Es necesario completar este campo').trim(),
	documento: string().required('Es necesario completar este campo').trim(),
	correo: string().email('Correo no válido').required('Es necesario completar este campo').trim(),
	telefono: string().required('Es necesario completar este campo').trim(),
	contrasena: string().required('Es necesario completar este campo').trim(),
	repcontrasena: string().oneOf([ref('contrasena'), null], 'Las claves no coinciden.')
});
