import type { DeepMap, DeepPartial } from 'src/global';
import type { FieldValues, InternalFieldName } from './fields';

export type Message = string;

export type FieldError = {
	type: string;
	message?: Message;
};

export type FieldsAsError<TFieldValues extends FieldValues = FieldValues> = DeepMap<
	DeepPartial<TFieldValues>,
	FieldError
>;

export type InternalFieldErrors = Partial<Record<InternalFieldName, FieldError>>;
