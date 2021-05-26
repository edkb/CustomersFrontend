<script>
    import { currentCustomer } from '../store.js';

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

        if (resData === 'Updated successfully'){
            alert('Customer successfully updated!');
            window.location.href = '../';
        }

        console.log(resData)

    }

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

</article>

<div class="buttons">
    <button on:click={updateCustomer}>Save</button>
    <button on:click={()=>{window.location.href = '../'}}>Cancel</button>
</div>

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
        margin: 0 auto;
            a {
                display: inline-block;
                margin: 1em 3em;
            }
    }

</style>