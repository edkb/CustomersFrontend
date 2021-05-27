<script lang="ts">
	import '../app.css';
</script>

<header>
	<nav>
		Header
	</nav>
</header>

<main>
	<slot />
</main>

<footer>
	Footer
</footer>


<style lang="scss">

	header {
		background: #b9c6d2;
		min-height: 5em;
		font-size: 1.5rem;
		color: #161616;
		text-align: center;

		nav {
			margin-top: 2rem;
		}
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 70%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
		margin-top: auto;
		background: #b9c6d2;
		min-height: 3em;
		font-size: 1.5rem;
		color: #161616;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
