declare const $NestedValue: unique symbol;

export type NestedValue<TValue extends object = object> = {
	[$NestedValue]: never;
} & TValue;

declare type NonNullableKeys<Type> = {
	[Key in keyof Type]-?: NonNullableKeys<NonNullable<Type[Key]>>;
};

declare type NonUndefined<T> = T extends undefined ? never : T;

/**
 * Checks whether the type is any
 * See {@link https://stackoverflow.com/a/49928360/3406963}
 * @typeParam T - type which may be any
 * ```
 * IsAny<any> = true
 * IsAny<string> = false
 * ```
 */
declare type IsAny<T> = 0 extends 1 & T ? true : false;

declare type DeepMap<T, TValue> = IsAny<T> extends true
	? any // eslint-disable-line @typescript-eslint/no-explicit-any
	: T extends Date | FileList | File
	? TValue
	: T extends object
	? { [K in keyof T]: DeepMap<NonUndefined<T[K]>, TValue> }
	: TValue;

declare type IsFlatObject<T extends object> = Extract<
	Exclude<T[keyof T], NestedValue | Date | FileList>,
	unknown[] | object
> extends never
	? true
	: false;

/**
 * Make all properties and nested properties in T optional
 */
declare type DeepPartial<T> = T extends Date | FileList | File
	? T
	: { [K in keyof T]?: DeepPartial<T[K]> };

/**
 * Make all properties and nested properties in T required
 */
declare type DeepRequired<T> = T extends Date | FileList | File
	? T
	: { [K in keyof T]-?: DeepRequired<T[K]> };

declare type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
 * Type which can be used to index an array or tuple type.
 */
declare type ArrayKey = number;

/**
 * Type which given a tuple type returns its own keys, i.e. only its indices.
 * @typeParam T - tuple type
 * @example
 * ```
 * TupleKeys<[number, string]> = '0' | '1'
 * ```
 */
declare type TupleKeys<T extends ReadonlyArray<unknown>> = Exclude<keyof T, keyof unknown[]>;

/**
 * Type to query whether an array type T is a tuple type.
 * @typeParam T - type which may be an array or tuple
 * @example
 * ```
 * IsTuple<[number]> = true
 * IsTuple<number[]> = false
 * ```
 */
declare type IsTuple<T extends ReadonlyArray<unknown>> = number extends T['length'] ? false : true;

/**
 * Helper type for recursively constructing paths through a type.
 * See {@link Path}
 */
declare type PathImpl<K extends string | number, V> = V extends Primitive
	? `${K}`
	: `${K}` | `${K}.${Path<V>}`;

/**
 * Type which eagerly collects all paths through a type
 * @typeParam T - type which should be introspected
 * @example
 * ```
 * Path<{foo: {bar: string}}> = 'foo' | 'foo.bar'
 * ```
 */
declare type Path<T> = T extends ReadonlyArray<infer V>
	? IsTuple<T> extends true
		? {
				[K in TupleKeys<T>]-?: PathImpl<K & string, T[K]>;
		  }[TupleKeys<T>]
		: PathImpl<ArrayKey, V>
	: {
			[K in keyof T]-?: PathImpl<K & string, T[K]>;
	  }[keyof T];

/**
 * Helper type for recursively constructing paths through a type.
 * See {@link ArrayPath}
 */
declare type ArrayPathImpl<K extends string | number, V> = V extends Primitive
	? never
	: V extends ReadonlyArray<infer U>
	? U extends Primitive
		? never
		: `${K}` | `${K}.${ArrayPath<V>}`
	: `${K}.${ArrayPath<V>}`;

/**
 * Type which eagerly collects all paths through a type which point to an array
 * type.
 * @typeParam T - type which should be introspected
 * @example
 * ```
 * Path<{foo: {bar: string[], baz: number[]}}> = 'foo.bar' | 'foo.baz'
 * ```
 */
declare type ArrayPath<T> = T extends ReadonlyArray<infer V>
	? IsTuple<T> extends true
		? {
				[K in TupleKeys<T>]-?: ArrayPathImpl<K & string, T[K]>;
		  }[TupleKeys<T>]
		: ArrayPathImpl<ArrayKey, V>
	: {
			[K in keyof T]-?: ArrayPathImpl<K & string, T[K]>;
	  }[keyof T];

/**
 * Type to evaluate the type which the given path points to.
 * @typeParam T - deeply nested type which is indexed by the path
 * @typeParam P - path into the deeply nested type
 * @example
 * ```
 * PathValue<{foo: {bar: string}}, 'foo.bar'> = string
 * PathValue<[number, string], '1'> = string
 * ```
 */
declare type PathValue<T, P extends Path<T> | ArrayPath<T>> = T extends unknown
	? P extends `${infer K}.${infer R}`
		? K extends keyof T
			? R extends Path<T[K]>
				? PathValue<T[K], R>
				: never
			: K extends `${ArrayKey}`
			? T extends ReadonlyArray<infer V>
				? PathValue<V, R & Path<V>>
				: never
			: never
		: P extends keyof T
		? T[P]
		: P extends `${ArrayKey}`
		? T extends ReadonlyArray<infer V>
			? V
			: never
		: never
	: never;

declare type LiteralUnion<T extends U, U extends Primitive> = T | (U & { _?: never });
