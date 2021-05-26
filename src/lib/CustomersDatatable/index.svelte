<script context="module">
	export const ssr = false;
</script>

<script>

    import createDatatable from "svelte-headless-datatable";

	import { currentCustomer } from '../../store.js';

    function updateCurrentCustomer(selectedCustomer){
    	currentCustomer.update(current => selectedCustomer)
	}

	const columns = [
        ["id", "ID"],
        ["name", "Name"],
        ["age", "Age"],
        ["city", "City"]
    ];
	export let data = []

    let sortIcons = columns.reduce(
        (icons, column) => ({ ...icons, [column[0]]: "" }),
        {}
    );

    const getColumnValue = (column, value) => {
        switch (column) {
            case "age":
                return Number(value);
            default:
                return value;
        }
    };

    const datatable = createDatatable(data, { getColumnValue });
    const { items, page, pages, sort, setSort } = datatable;

    $: Object.keys(sortIcons).forEach(key => {
        const index = $sort.findIndex(([column]) => column === key);

        if (index === -1)
            return (sortIcons[key] = "");
        if ($sort[index][1] === "ASC")
            return (sortIcons[key] = "↑");
        sortIcons[key] = "↓";
    });

</script>

<article>

    <table >
		<thead>
            <tr>
                {#each columns as [column, name]}
                    <td on:click={setSort(column)}>
                        {name}
                        {sortIcons[column]}
                    </td>
                {/each}
            </tr>
		</thead>
		<tbody>
			{#each $items as { id, name, age, city }}
				<tr>
					<td>{id}</td>
				  	<td>{name}</td>
				  	<td>{age}</td>
				  	<td>{city}</td>
					<td>
						<a href="editCustomer" on:click={()=>{updateCurrentCustomer({id, name, age, city})}}>
							Edit
						</a>
					</td>
				</tr>
      		{/each}
		</tbody>
    </table>
</article>


<style lang="scss">

    article {
        display: flex;
        justify-items: center;
    }

    p {
        display: inline-block;
    }

    tr {
        margin: 2em;
    }


</style>