import isObject from '$lib/utils/isObject';
import type { DeepMap, DeepPartial, IsFlatObject, Path, PathValue } from 'src/global';

/**
 * See {@link Path}
 */
export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

/**
 * See {@link PathValue}
 */
export type FieldPathValue<
	TFieldValues extends FieldValues,
	TFieldPath extends FieldPath<TFieldValues>
> = PathValue<TFieldValues, TFieldPath>;

export type InternalFieldName = string;

export interface FieldValues {
	[key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type FieldValue<TFieldValues extends FieldValues> = TFieldValues[InternalFieldName];

export interface Field {
	_f: {
		ref: Ref;
		name: InternalFieldName;
		refs?: HTMLInputElement[];
	};
}

export type NativeFieldValue = string | number | boolean | null | undefined;

export type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type Ref = FieldElement;

export type FieldName<TFieldValues extends FieldValues> = IsFlatObject<TFieldValues> extends true
	? Extract<keyof TFieldValues, string>
	: string;

export type FieldsAsRef<TFieldValues extends FieldValues = FieldValues> = DeepMap<
	DeepPartial<TFieldValues>,
	Field
>;

export const isField = (obj: unknown): obj is Field => (isObject(obj) && '_f' in obj) || false;
