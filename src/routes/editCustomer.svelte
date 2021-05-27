<svelte:head>
	<title>Edit Customer</title>
	<meta name="description" content="edit customers">
</svelte:head>

<script>
    import { currentCustomer, customerUpdated } from '../store.js';

    let editValues;

	const unsubscribe = currentCustomer.subscribe(value => {
		editValues = value;
	});


    async function updateCustomer(){
        let url = `https://secret-anchorage-17084.herokuapp.com/customers/${editValues.id}`
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(editValues)
        });

        // Awaiting response.json()
        const resData = await response.json();

        if (resData === 'Updated successfully!'){
            customerUpdated.set(true)
            // window.location.href = '../';
        }
        else {
            customerUpdated.set(false)
        }
    }

    $: disabled = ( editValues.age.toString().length < 1 ) || (editValues.age.toString().length > 3 )
    $: console.log(disabled)
</script>

<article>

    <label>
        Id: {editValues.id}
    </label>
    <label>
        Name <input type="text" bind:value={editValues.name} />
    </label>
    <label>
        Age <input type="number" bind:value={editValues.age} />
    </label>
    <label>
        City <input type="text" bind:value={editValues.city} />
    </label>

    <div class="buttons">
        <a href="/" on:click={updateCustomer} class:disabled >Save</a>
        <a href="/" >Cancel</a>
    </div>

</article>

<style lang="scss">

    article {
        padding: 2em;
        margin: auto;
    }

    label {
      width: 5em;
      padding: 2em;
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap: 2em;
        margin: 2em;
    }

    a {
      display: inline-block;
      padding: 1em 2em;
      background: rgba(77, 144, 254, 0.72);
      color: #353535;
      border-radius: 10px;
    }

    .disabled {
        pointer-events: none;
        background: #ccc;
    }

</style>