<svelte:head>
	<title>Home</title>
	<meta name="description" content="home page">
</svelte:head>

<script lang="ts">

	import CustomersDatatable from "$lib/CustomersDatatable/index.svelte"
	import {onMount} from "svelte"

	import Dialog from '$lib/Dialog/index.svelte';
	let promise;

	let customers = [{}]
	let columns = ["id", "name", "age", "city"]

	$: currentPage = 0
	$: pageSize = 10

	$: url = `https://secret-anchorage-17084.herokuapp.com/customers?page=${currentPage}&size=${pageSize}`

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

	<Dialog/>

	<h1>Welcome to Customer Management Tool</h1>

		<div class="page-config">
		<div class="page-item">
			<p>Select page:</p>
			<input
				type="number"
				bind:value={currentPage}
				min="0"
				max="30"
				aria-label="page number"
			/>
		</div>
		<div class="page-item">
			<p>Select page size:</p>
			<input
				type="number"
				bind:value={pageSize}
				min="0"
				max="30"
				aria-label="page size"
			>
		</div>
	</div>

	{ #await promise}
		<div>Loading customers data, please wait...</div>
	{:then data}
		<CustomersDatatable data="{data}" columns="{columns}"/>
	{:catch error}
		<div>Oops, something went wrong fetching customers data. Please try again.</div>
	{/await}

	<button on:click={fetchCustomers}>Refresh!</button>

</section>

<style lang="scss">

	h1 {
		text-align: center;
		margin-bottom: 2em;
	}
	section {
		align-self: center;
		width: 50vw;
		display: flex;
		flex-direction: column;
	}

	.page-config {
		justify-self: left;
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

	button {
		margin: 2em auto;
		width: 5em;
		justify-self: center;
	}

</style>