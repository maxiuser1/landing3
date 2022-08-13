<script lang="ts">
	export let evento: App.Evento;
</script>

<a href="/{evento.slug}">
	<div class="card">
		<div class="imagen">
			<img src={evento.banner} width="100%" alt="x" />
		</div>
		<div class="content">
			<div class="info">
				<h2>
					{evento.artista} <span class="tour">{evento.nombre}</span>
				</h2>
				<h3>
					<svg
						width="10"
						height="14"
						viewBox="0 0 10 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.00004 0.333374C2.42004 0.333374 0.333374 2.42004 0.333374 5.00004C0.333374 6.16004 0.666707 7.24671 1.27337 8.22671C1.90671 9.25337 2.74004 10.1334 3.38004 11.16C3.69337 11.66 3.92004 12.1267 4.16004 12.6667C4.33337 13.0334 4.47337 13.6667 5.00004 13.6667C5.52671 13.6667 5.66671 13.0334 5.83337 12.6667C6.08004 12.1267 6.30004 11.66 6.61337 11.16C7.25337 10.14 8.08671 9.26004 8.72004 8.22671C9.33337 7.24671 9.66671 6.16004 9.66671 5.00004C9.66671 2.42004 7.58004 0.333374 5.00004 0.333374ZM5.00004 6.83337C4.08004 6.83337 3.33337 6.08671 3.33337 5.16671C3.33337 4.24671 4.08004 3.50004 5.00004 3.50004C5.92004 3.50004 6.66671 4.24671 6.66671 5.16671C6.66671 6.08671 5.92004 6.83337 5.00004 6.83337Z"
							fill="#777777"
						/>
					</svg>
					<span> {evento.lugar} </span>
				</h3>
			</div>
			<div class="fechas">
				<h4>Ago</h4>
				<h5>29-30</h5>
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	.card {
		width: 342px;
		background: #ffffff;
		border-width: 0px 1px 1px 1px;
		border-style: solid;
		border-color: #bdbdbd;
		border-radius: 0px 0px 8px 8px;

		@include breakpoint($md) {
			width: 352px;
		}
	}

	.content {
		padding: 19px;
		display: flex;
		justify-content: space-between;

		.info {
			h2 {
				font-weight: 900;
				font-size: 18px;
				line-height: 22px;
				color: #1b1b1b;

				span {
					font-weight: 500;
					font-size: 12px;
					line-height: 14px;
					color: #5e5e5e;
				}
			}

			h3 {
				span {
					color: red;
					font-weight: 400;
					font-size: 12px;
					color: #5e5e5e;
				}
			}
		}

		.fechas {
			border-left: 1px solid #b9b9b9;
			padding-left: 16px;
			text-align: center;

			h4 {
				font-weight: 500;
				font-size: 12px;
				line-height: 18px;
				color: #3b3b3b;
			}

			h5 {
				font-weight: 700;
				font-size: 16px;
				line-height: 19px;
				color: #3b3b3b;
			}
		}
	}

	.imagen {
		img {
			vertical-align: middle;
			border-style: none;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}
</style>
