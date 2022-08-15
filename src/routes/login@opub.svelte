<script lang="ts">
	import { LoginForm, type LoginSubmitDetails, type LoginVm } from '$lib/components/Auth';
	import {
		signInWithPopup,
		GoogleAuthProvider,
		signInWithEmailAndPassword,
		type User,
		FacebookAuthProvider
	} from 'firebase/auth';
	import { Facebook, Google } from '$lib/icons';
	import { auth } from '../firebase';
	import { user, isLoggedIn } from '$lib/stores/userstore';
	import { compraData } from '$lib/stores/compra';
	import { goto } from '$app/navigation';

	const loginVm: LoginVm = {
		username: '',
		password: ''
	};

	let mensaje = '';

	const onValid = async (login: LoginSubmitDetails) => {
		try {
			const res = await signInWithEmailAndPassword(
				auth,
				login.loginVm.username,
				login.loginVm.password
			);

			$user = { ...res.user };
			$isLoggedIn = true;
			if ($compraData.evento && $compraData.evento.slug) {
				goto(`${$compraData.evento.slug}/entradas`);
			} else {
				goto('./');
			}
		} catch (error: any) {
			console.log('err', error.code);
			mensaje = error.message;
			if (error.code == 'auth/wrong-password') {
				mensaje = 'Credenciales no válidas';
			}

			if (error.code == 'auth/user-not-found') {
				mensaje = 'La cuenta ingresada no existe';
			}

			if (error.code == 'auth/user-disabled') {
				mensaje = 'La cuenta no está habilitada';
			}
		}
	};
</script>

<div class="form">
	<a href="/login" class="titulo">Bienvenido</a>

	{#if mensaje}
		<div class="error">{mensaje}</div>
	{/if}
	<LoginForm
		{loginVm}
		on:submit={({ detail }) => {
			onValid(detail);
		}}
	/>

	<div class="texto">
		<p>Tambien puedes ingresar con:</p>
	</div>
	<div class="socials">
		<button class="btn-social" type="button">
			<Google />
		</button>
		<button class="btn-social" type="button">
			<Facebook />
		</button>
	</div>

	<div class="texto">
		<p>
			Si no tienes una cuenta <a href="registro" class="link">Regístrate</a>
		</p>
	</div>
</div>

<style lang="scss">
	.error {
		margin-top: 10px;
		color: red;
	}
	.socials {
		margin-top: 24px;
		margin-bottom: 24px;
		display: flex;
		gap: 10px;
		.btn-social {
			background: #ffffff;
			/* White/White_80 */
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			padding: 10px 0px;
			width: 100%;
		}
	}

	.texto {
		width: 100%;
		text-align: center;
		p {
			font-weight: 400;
			font-size: 14px;
			line-height: 24px;
		}

		.link {
			color: #d30ed1;
		}
	}

	.titulo {
		color: #d30ed1;
		font-weight: 700;
		font-size: 30px;
		line-height: 36px;
		border-bottom: 2px solid #d30ed1;
	}

	.form {
		margin-top: 212px;
	}
</style>
