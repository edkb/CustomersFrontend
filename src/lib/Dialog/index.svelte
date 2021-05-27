<script>
  	import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog';
  	import { currentCustomer, customerUpdated } from '../../store.js';

	let isOpen

	const watch = customerUpdated.subscribe(value => {
   		isOpen = value
  	});

	const close = () => {
		customerUpdated.set(false)
	}


</script>


<div class="modal">

	<DialogOverlay isOpen={isOpen} onDismiss={close} >
	  <DialogContent aria-label="Definition" style="height: 30vh;">
		<button on:click={close}>Close</button>

			<h2>
				Customer {$currentCustomer.name} has been updated successfully!
			</h2>

	  </DialogContent>
	</DialogOverlay>

</div>

<style>

	button:focus {
		outline: 5px auto #4D90FE;
  		outline: 5px auto -webkit-focus-ring-color;
	}

	h2 {
		text-align: center;
		font-size: 1.5rem;
		margin-top: 2em;
	}

</style>