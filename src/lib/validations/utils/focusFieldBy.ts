import get from '$lib/utils/get';
import isNullOrUndefined from '$lib/utils/isNullOrUndefined';
import isObject from '$lib/utils/isObject';
import { isField, type FieldsAsRef, type FieldValues } from '$lib/validations/types';

const focusFieldBy = <TFieldValues extends FieldValues>(
	fields: FieldsAsRef<TFieldValues>,
	callback: (name: string) => boolean
) => {
	for (const key of Object.keys(fields)) {
		const maybeAfield = get(fields, key);

		if (isNullOrUndefined(maybeAfield) || !isObject(maybeAfield)) {
			continue;
		}

		if (isField(maybeAfield) && callback(maybeAfield._f.name)) {
			const { _f } = maybeAfield;

			if (_f.refs) {
				const [firstRef] = _f.refs;
				firstRef && firstRef.focus();
				break;
			} else {
				_f.ref.focus();
				break;
			}
		} else {
			focusFieldBy(maybeAfield as FieldsAsRef, callback);
		}
	}
};

export default focusFieldBy;
