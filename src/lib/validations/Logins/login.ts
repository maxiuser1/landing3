import { string, object } from 'yup';

export default object({
	username: string().email('Correo no válido').required('Es necesario completar este campo').trim(),
	password: string().required('Es necesario completar este campo').trim()
});
