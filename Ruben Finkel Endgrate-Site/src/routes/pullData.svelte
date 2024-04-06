<script lang="ts">
	import { createEventDispatcher } from "svelte";

	let returnData: any;
	let loading = false;
	let failed = false;

	let dispatch = createEventDispatcher();
	function triggerPull() {
		dispatch("pull");
		loading = true;
	}

	export function updateData(data: object | null) {
		returnData = data;
		loading = false;
		failed = false;
	}
	export function error() {
		returnData = undefined;
		failed = true;
		loading = false;
	}

	function prettyName(str: string) {
		let res = str[0].toUpperCase() + str.slice(1);
		res = res.replaceAll("_", " ");
		return res;
	}
</script>

<main class="flex flex-col items-center">
	{#if !loading}
		<button on:click={triggerPull} class="btn btn-sm w-1/2 h-3 m-1 text-center"
			>Pull</button
		>
	{:else}
		<button class="btn btn-sm w-1/2 h-3 m-1 text-center">
			<span class="loading loading-spinner loading-md"></span>
		</button>
	{/if}

	<span class="w-full ml-5 text-lg font-semibold">Data:</span>
	<div class="w-[98%] min-h-[300px] mb-2 rounded bg-primary">
		{#if failed}
			<h1 class=" text-xl text-red-600 font-bold">Could not load data</h1>
		{/if}

		{#if returnData && returnData.transfer_data}
			<div class=" space-y-3 m-2">
				{#each returnData.transfer_data as item}
					<div class="flex flex-col bg-secondary rounded p-2 py-1">
						{#each Object.keys(item.data) as value}
							{#if item.data[value] != null && item.data[value].length != 0}
								{#if typeof item.data[value] == "object"}
									<p class=" font-semibold">{prettyName(value)}</p>

									<ul>
										{#each [...Array(item.data[value].length).keys()] as i}
											<div
												class="flex flex-col bg-primary bg-opacity-40 p-2 py-1 ml-2 border-solid border-primary border-b-2 last:border-b-0 last:rounded-b first:rounded-t only:rounded"
											>
												{#if item.data[value][i] != null}
													{#if typeof item.data[value][i] == "object"}
														{#each Object.keys(item.data[value][i]) as subvalue}
															<span class="flex flex-row">
																<p class=" font-semibold mr-2">
																	{prettyName(subvalue)}:
																</p>
																<p>
																	{item.data[value][i][subvalue]}
																</p>
															</span>
														{/each}
													{:else}
														<p>{item.data[value][i]}</p>
													{/if}
												{/if}
											</div>
										{/each}
									</ul>
								{:else}
									<span class="flex flex-row">
										<p class=" font-semibold mr-2">{prettyName(value)}:</p>
										<p>{item.data[value]}</p>
									</span>
								{/if}
							{/if}
						{/each}
					</div>
				{/each}
			</div>
			{#if returnData.transfer_data.length == 0}
				<p>No Data</p>
			{/if}
		{/if}
	</div>
</main>
