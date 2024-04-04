<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let name: string = "Loading";
	export let warning: boolean = false;
	export let state: string = "";

	let loading = true;

	let inputVal = name;
	let dispatch = createEventDispatcher();

	function changeName() {
		dispatch("changeName", { name: inputVal });
	}
	export function setName(newName: string, newState: string) {
		inputVal = newName;
		loading = false;
		state = newState ?? "create";
	}
</script>

<div
	class=" w-[70%] {state == 'create'
		? 'm-0 bg-secondary rounded text-center translate-y-[30px]'
		: ''}"
>
	{#if state == "create"}
		<h2 class="m-3 mb-0 text-lg font-semibold">Session Name:</h2>
	{/if}
	{#if !loading}
		<input
			name="sessionName"
			autocomplete="off"
			type="text"
			placeholder="<<Session Name>>"
			class=" bg-neutral-100 border border-neutral-300 input w-[90%] text-center text-[35px] font-semibold m-3 mt-1 {warning
				? 'mb-0'
				: ''}"
			required={true}
			maxlength="30"
			bind:value={inputVal}
			on:input={changeName}
		/>
	{:else}
		<div class="flex justify-center items-end">
			<h1 class="text-center text-[35px] font-semibold m-3 mt-1 mr-1">
				{name}
			</h1>
			<span class="loading loading-dots loading-md mb-4 h-6"></span>
		</div>
	{/if}
</div>

{#if warning}
	<p class="text-red-600 text-lg">Enter Name</p>
{/if}
