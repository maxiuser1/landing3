import { ValidationMode, type ReValidationMode } from '../types';

export default (
	isBlurEvent: boolean,
	isTouched: boolean,
	isSubmitted: boolean,
	reValidateMode: ReValidationMode,
	mode: ValidationMode
) => {
	if (mode === ValidationMode.all) {
		return false;
	}

	if (!isSubmitted && mode === ValidationMode.onTouched) {
		return !(isTouched || isBlurEvent);
	}

	if (isSubmitted ? reValidateMode === ValidationMode.onBlur : mode === ValidationMode.onBlur) {
		return !isBlurEvent;
	}

	if (isSubmitted ? reValidateMode === ValidationMode.onChange : mode === ValidationMode.onChange) {
		return isBlurEvent;
	}

	return true;
};
