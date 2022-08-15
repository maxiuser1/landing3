import type { DeepMap, DeepPartial } from 'src/global';
import type { FieldsAsError } from './errors';
import type { FieldsAsRef, FieldValue, FieldValues } from './fields';
import type { Resolver } from './resolvers';

export enum CriteriaMode {
	firstError = 'firstError',
	all = 'all'
}

export enum ValidationMode {
	onBlur = 'onBlur',
	onChange = 'onChange',
	onSubmit = 'onSubmit',
	onTouched = 'onTouched',
	all = 'all'
}

export type ReValidationMode = Exclude<
	ValidationMode,
	ValidationMode.onTouched | ValidationMode.all
>;

export type FieldsAsBoolean<TFieldValues extends FieldValues> = DeepMap<
	DeepPartial<TFieldValues>,
	boolean
>;

export interface FormState<TFieldValues extends FieldValues> {
	isDirty: boolean;
	dirtyFields: FieldsAsBoolean<TFieldValues>;
	isSubmitted: boolean;
	submitCount: number;
	touchedFields: FieldsAsBoolean<TFieldValues>;
	isSubmitting: boolean;
	isSubmitSuccessful: boolean;
	isValid: boolean;
	errors: FieldsAsError<TFieldValues>;
	values: TFieldValues;
	defaultValues: TFieldValues;
	fields: FieldsAsRef<TFieldValues>;
	options: CreateFormOptions<TFieldValues>;
}

export type DefaultValues<TFieldValues> = DeepPartial<TFieldValues>;

export interface CreateForm<TFieldValues extends FieldValues = FieldValues> {
	defaultValues?: DefaultValues<TFieldValues>;
	resolver: Resolver<TFieldValues>;
	shouldFocusError?: boolean;
}

export type CreateFormOptions<TFieldValues extends FieldValues = FieldValues> = Required<
	Omit<CreateForm<TFieldValues>, 'defaultValues'>
>;

export type SubmitHandler<TFieldValues extends FieldValues> = (
	data: TFieldValues,
	event?: SubmitEvent
) => unknown | Promise<unknown>;

export type SubmitErrorHandler<TFieldValues extends FieldValues> = (
	errors: FieldsAsError<TFieldValues>,
	event?: SubmitEvent
) => unknown | Promise<unknown>;

export type CreateFormHandleSubmit<TFieldValues extends FieldValues> = (
	onValid: SubmitHandler<TFieldValues>,
	onInvalid?: SubmitErrorHandler<TFieldValues>
) => (event?: SubmitEvent) => Promise<void>;

export type SetFieldValue<TFieldValues extends FieldValues> = FieldValue<TFieldValues>;

export interface SetValueConfig {
	shouldValidate?: boolean;
	shouldDirty?: boolean;
	shouldTouch?: boolean;
}
