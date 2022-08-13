<section class="bind container">
	<div class="searchbox">
		<div class="box">
			<input type="search" class="input" placeholder="Ejm: Enanitos Verdes" />
			<div class="boton">
				<svg
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
						fill="white"
					/>
				</svg>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.bind {
		position: relative;

		.searchbox {
			text-align: center;
			margin-top: -28px;
			display: flex;
			justify-content: center;

			.box {
				width: 100%;
				height: 48px;

				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: white;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
				border-radius: 4px;

				@include breakpoint($md) {
					height: 56px;
				}
			}

			.input {
				padding-left: 16px;
				font-family: 'Gotham';
				line-height: 20px;
				width: 100%;
				border-color: transparent;
				outline-offset: -2px;
				font-size: 16px;
				&:focus {
					outline: none;
				}
			}

			.boton {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-right: 12px;
				gap: 8px;
				height: 40px;
				width: 56px;
				background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
				border-radius: 4px;
			}
		}
	}
</style>
