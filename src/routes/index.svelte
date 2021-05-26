<svelte:head>
	<title>Home</title>
	<meta name="home page" content="home page">



</svelte:head>

<script lang="ts">

	import CustomersDatatable from "$lib/CustomersDatatable/index.svelte"
	import {onMount} from "svelte"

	let promise;

	let customers = [{}]
	let columns = ["id", "name", "age", "city"]

	let currentPage = 0
	let pageSize = 30
	let url = `https://secret-anchorage-17084.herokuapp.com/customers?page=${currentPage}&size=${pageSize}`

	const fetchCustomers = () => {
		promise = fetch(url, {
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		}).then((response) => response.json());
  	};

	onMount(()=>{
		fetchCustomers()
	})

</script>

<section>

	<h1>Welcome to Customer Management Tool</h1>

	{ #await promise}
		<div>Loading customers data, please wait...</div>
	{:then data}
		<CustomersDatatable data="{data}" columns="{columns}"/>
	{:catch error}
		<div>Oops, something went wrong fetching customers data. Please try again.</div>
	{/await}

<!--	<div class="page-config">-->
<!--		<div class="page-item">-->
<!--			<p>Select page:</p>-->
<!--			<input-->
<!--				type="number"-->
<!--				bind:value={currentPage}-->
<!--				min="0"-->
<!--				max="30"-->
<!--			/>-->
<!--		</div>-->
<!--		<div class="page-item">-->
<!--			<p>Select page size:</p>-->
<!--			<input-->
<!--				type="number"-->
<!--				bind:value={pageSize}-->
<!--				min="0"-->
<!--				max="30"-->
<!--			>-->
<!--		</div>-->
<!--	</div>-->


<>
</section>

<style lang="scss">

	h1 {
		text-align: center;
	}
	section {
		align-self: center;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-content: center;
	}

	.page-config {
		display: flex;
		flex-direction: column;
		max-width: 15em;
	}

	.page-item {
		display: flex;
		align-items: center;
		flex-basis: 100%;
	}

	.page-item > * {
		flex-basis: 100%;
	}

	input {
		display: inline;
		box-sizing: border-box;
		max-width: 5em;
	}

	p {
		display: inline;
	}

</style>