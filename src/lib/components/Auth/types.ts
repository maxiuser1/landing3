export type PersonaVm = {
	documento: string;
	telefono: string;
};

export type SubmittedPersona = {
	documento: string;
	telefono: string;
};

export type PersonaSubmitDetails = {
	personaVm: SubmittedPersona;
};

export type PersonaSubmitEvent = CustomEvent<PersonaSubmitDetails>;

export type RegistroVm = {
	nombre: string;
	apellido: string;
	documento: string;
	correo: string;
	telefono: string;
	contrasena: string;
	repcontrasena: string;
};

export type SubmittedRegistro = {
	nombre: string;
	apellido: string;
	documento: string;
	correo: string;
	telefono: string;
	contrasena: string;
	repcontrasena: string;
};

export type RegistroSubmitDetails = {
	registroVm: SubmittedRegistro;
};

export type RegistroSubmitEvent = CustomEvent<RegistroSubmitDetails>;

export type LoginVm = {
	username: string;
	password: string;
};

export type SubmittedLogin = {
	username: string;
	password: string;
};

export type LoginSubmitDetails = {
	loginVm: SubmittedLogin;
};

export type LoginSubmitEvent = CustomEvent<LoginSubmitDetails>;
