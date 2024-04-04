import { writable } from "svelte/store";

export let sidebar = writable();
export let title = writable();
export let connect = writable();
export let connected = writable();
export let vcheck = writable();