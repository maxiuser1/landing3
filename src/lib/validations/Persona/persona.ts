import { string, object } from 'yup';

export default object({
	documento: string().required('Es necesario completar este campo').trim(),
	telefono: string().required('Es necesario completar este campo').trim()
});
