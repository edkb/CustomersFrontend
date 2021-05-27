import { writable } from 'svelte/store'

export const currentCustomer = writable({})
export const customerUpdated = writable(false)