<script>
	import Logo from '$lib/components/Layout/Header/Logo.svelte';
</script>

<svelte:head>
	<style>
		body {
			margin-top: 0 !important;
			/* background: linear-gradient(180deg, #ff0030 0%, #ff00ad 53.12%, #9023fe 100%); */
		}
	</style>
</svelte:head>

<div class="principal">
	<div class="banner">
		<div class="overlay" />
	</div>
	<div class="login">
		<div class="header">
			<nav>
				<Logo />
			</nav>
		</div>
		<slot />
	</div>
</div>

<style lang="scss">
	.principal {
		background-color: #ffffff !important;

		margin: 0 auto;
		display: flex;
		flex: 1 1 100%;
		align-items: stretch;
		justify-content: space-between;
		box-shadow: 0 0 20px 6px #ffb4c2;
	}

	.header {
		width: 100%;
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		background: linear-gradient(270deg, var(--red) 0%, var(--pink) 100%);

		@include breakpoint($sm) {
			display: none;
		}

		nav {
			margin: 0 auto;
			height: var(--header-height);
			text-align: center;
			padding-top: 20px;
		}
	}

	.banner {
		display: none;
		min-width: 50%;
		height: 100vh;
		background: linear-gradient(180deg, #ff0030 0%, #ff00ad 53.12%, #9023fe 100%);
		@include breakpoint($sm) {
			display: initial;
		}
	}

	.overlay {
		width: 100%;
		height: 100vh;

		background: url('https://res.cloudinary.com/maxitech/image/upload/v1658348860/ticketera/assets/people-in-festival_1_w8qpie.png');
		background-size: cover;
	}

	.login {
		min-height: 100vh;
		margin: 0 auto;

		min-width: 380px;
		max-width: 380px;
		padding: 0 20px;

		@include breakpoint($sm) {
			padding: initial;
		}
	}
</style>
