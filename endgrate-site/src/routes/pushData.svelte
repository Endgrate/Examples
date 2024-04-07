<script lang="ts">
	import { schemaToLines, schemaToJson } from "$lib/processSchema";
	import type { Line } from "$lib/processSchema";
	import { createEventDispatcher } from "svelte";

	let schema: any;
	let finalJson = schemaToJson(schema);

	let returnStatus = "";
	export function setStatus(status: string) {
		returnStatus = status;
	}

	let dispatch = createEventDispatcher();
	function submitData() {
		dispatch("push", JSON.stringify(finalJson));
		returnStatus = "loading";
	}

	let lines: Array<Line>;
	export function updateSchema(type_schema: any) {
		schema = type_schema;
		lines = schemaToLines(schema);
		finalJson = schemaToJson(schema);
	}

	let dateTime: any = {};

	let datetest = "";

	function formatTime(time: any) {
		let curDate = new Date(time);
		let res = `${String(curDate.getUTCFullYear()).padStart(4, "0")}-${String(curDate.getUTCMonth() + 1).padStart(2, "0")}-${String(curDate.getUTCDate()).padStart(2, "0")} ${String(curDate.getUTCHours()).padStart(2, "0")}:${String(curDate.getUTCMinutes()).padStart(2, "0")}:00`;
		return res;
	}
</script>

<main class=" m-1 mx-3 mt-7 p-1 rounded bg-primary font-bold space-y-0">
	{#if lines}
		{#each lines as line}
			<div
				class="py-2 pl-1 border-black border-opacity-[0.18] border-b-2 last:border-b-0"
			>
				{#if line.type != "multi-list" && line.type != "single-list"}
					<p>{line.prettyName}</p>
				{:else}
					<div class=" flex flex-row">
						<p class="mr-2">{line.prettyName}</p>
						<button
							class="btn btn-xs bg-white bg-opacity-30 border-none rounded-r-none shadow-none"
							on:click={() => {
								finalJson[line.name].push(
									line.type == "multi-list" ? schemaToJson(line.nested) : null,
								);
								finalJson = finalJson;
							}}
						>
							<xml version="1.0" encoding="utf-8">
								<!-- Generator: Adobe Illustrator 22.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
								<svg
									fill="#1C2033"
									width="10"
									height="10"
									version="1.1"
									id="lni_lni-plus"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									x="0px"
									y="0px"
									viewBox="0 0 64 64"
									style="enable-background:new 0 0 64 64;"
									xml:space="preserve"
								>
									<path
										d="M60,29.8H34.3V4c0-1.2-1-2.3-2.3-2.3c-1.2,0-2.3,1-2.3,2.3v25.8H4c-1.2,0-2.3,1-2.3,2.3c0,1.2,1,2.3,2.3,2.3h25.8V60
								c0,1.2,1,2.3,2.3,2.3c1.2,0,2.3-1,2.3-2.3V34.3H60c1.2,0,2.3-1,2.3-2.3C62.3,30.8,61.2,29.8,60,29.8z"
									/>
								</svg>
							</xml></button
						><button
							class="btn btn-xs bg-white bg-opacity-30 border-none rounded-l-none shadow-none"
							on:click={() => {
								finalJson[line.name].pop();
								finalJson = finalJson;
							}}
						>
							<xml version="1.0" encoding="utf-8">
								<!-- Generator: Adobe Illustrator 22.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
								<svg
									fill="#1C2033"
									width="10"
									height="10"
									version="1.1"
									id="lni_lni-minus"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									x="0px"
									y="0px"
									viewBox="0 0 64 64"
									style="enable-background:new 0 0 64 64;"
									xml:space="preserve"
								>
									<g>
										<path
											d="M59,34.3H5c-1.2,0-2.3-1-2.3-2.3c0-1.2,1-2.3,2.3-2.3h54c1.2,0,2.3,1,2.3,2.3C61.3,33.2,60.2,34.3,59,34.3z"
										/>
									</g>
								</svg>
							</xml></button
						>
					</div>
				{/if}

				{#if line.format == "date-time"}
					<input
						type="datetime-local"
						class=" rounded bg-white bg-opacity-30"
						bind:value={dateTime[line.name]}
						on:change={() => {
							finalJson[line.name] = formatTime(dateTime[line.name]);
						}}
					/>
				{:else if line.format == "date"}
					<input
						type="date"
						class=" rounded bg-white bg-opacity-30"
						bind:value={finalJson[line.name]}
					/>
				{:else if line.format == "time"}
					<input
						type="time"
						class=" rounded bg-white bg-opacity-30"
						bind:value={finalJson[line.name]}
					/>
				{:else if line.format == "email"}
					<input
						type="email"
						placeholder=""
						class="input input-bordered input-xs bg-white bg-opacity-30"
						bind:value={finalJson[line.name]}
					/>
				{:else if line.format == "uri"}
					<input
						type="url"
						placeholder=""
						class="input input-bordered input-xs bg-white bg-opacity-30"
						bind:value={finalJson[line.name]}
					/>
				{:else if line.type == "string"}
					<input
						type="text"
						placeholder=""
						class="input input-bordered input-xs bg-white bg-opacity-30"
						bind:value={finalJson[line.name]}
					/>
				{:else if line.type == "boolean"}
					<input
						type="checkbox"
						class=" rounded bg-white bg-opacity-30"
						bind:value={finalJson[line.name]}
					/>
				{:else if line.type == "number"}
					<input
						type="number"
						class=" rounded bg-white bg-opacity-30"
						bind:value={finalJson[line.name]}
					/>
				{:else if line.type == "enum"}
					<select
						class=" rounded bg-white bg-opacity-30"
						bind:value={finalJson[line.name]}
					>
						{#each line.enums ?? [] as opt}
							<option>{opt}</option>
						{/each}
					</select>
				{/if}
				{#if line.type == "multi-list"}
					<div class="ml-5 space-y-2 mt-2">
						{#each [...Array(finalJson[line.name].length).keys()] as i}
							<div class="flex flex-col p-1 rounded bg-secondary">
								{#each schemaToLines(line.nested) as subline}
									<div>
										<p>{subline.prettyName}</p>
										{#if subline.format == "date-time"}
											<input
												type="datetime-local"
												class=" rounded bg-white bg-opacity-30"
												bind:value={dateTime[line.name + subline.name + i]}
												on:change={() => {
													finalJson[line.name][i][subline.name] = formatTime(
														dateTime[line.name + subline.name + i],
													);
												}}
											/>
										{:else if subline.format == "date"}
											<input
												type="date"
												class=" rounded bg-white bg-opacity-30"
												bind:value={finalJson[line.name][i][subline.name]}
											/>
										{:else if subline.format == "time"}
											<input
												type="time"
												class=" rounded bg-white bg-opacity-30"
												bind:value={finalJson[line.name][i][subline.name]}
											/>
										{:else if subline.format == "email"}
											<input
												type="email"
												placeholder=""
												class="input input-bordered input-xs bg-white bg-opacity-30"
												bind:value={finalJson[line.name][i][subline.name]}
											/>
										{:else if subline.format == "uri"}
											<input
												type="url"
												placeholder=""
												class="input input-bordered input-xs bg-white bg-opacity-30"
												bind:value={finalJson[line.name][i][subline.name]}
											/>
										{:else if subline.type == "string"}
											<input
												type="text"
												placeholder=""
												class="input input-bordered input-xs bg-white bg-opacity-30"
												bind:value={finalJson[line.name][i][subline.name]}
											/>
										{:else if subline.type == "boolean"}
											<input
												type="checkbox"
												class=" rounded bg-white bg-opacity-30"
												bind:value={finalJson[line.name][i][subline.name]}
											/>
										{:else if subline.type == "number"}
											<input
												type="number"
												class=" rounded bg-white bg-opacity-30"
												bind:value={finalJson[line.name][i][subline.name]}
											/>
										{:else if subline.type == "enum"}
											<select
												class=" rounded bg-white bg-opacity-30"
												bind:value={finalJson[line.name][i][subline.name]}
											>
												{#each subline.enums ?? [] as opt}
													<option>{opt}</option>
												{/each}
											</select>
										{/if}
									</div>
								{/each}
							</div>
						{/each}
					</div>
				{:else if line.type == "single-list"}
					<div class="ml-5 mt-2 flex flex-col w-[40%]">
						{#each [...Array(finalJson[line.name].length).keys()] as i}
							{#if line.nested.format == "date-time"}
								<input
									type="date"
									class=" rounded bg-white bg-opacity-30"
									bind:value={dateTime[line.name + i]}
									on:change={() => {
										finalJson[line.name][i] = formatTime(
											dateTime[line.name + i],
										);
									}}
								/>
							{:else if line.nested.format == "date"}
								<input
									type="date"
									class=" rounded bg-white bg-opacity-30"
									bind:value={finalJson[line.name][i]}
								/>
							{:else if line.nested.format == "time"}
								<input
									type="time"
									class=" rounded bg-white bg-opacity-30"
									bind:value={finalJson[line.name][i]}
								/>
							{:else if line.nested.format == "email"}
								<input
									type="email"
									placeholder=""
									class="input input-bordered input-xs bg-white bg-opacity-30"
									bind:value={finalJson[line.name][i]}
								/>
							{:else if line.nested.format == "uri"}
								<input
									type="url"
									placeholder=""
									class="input input-bordered input-xs bg-white bg-opacity-30"
									bind:value={finalJson[line.name][i]}
								/>
							{:else if line.nested.type == "string"}
								<input
									type="text"
									placeholder=""
									class="input input-bordered input-xs bg-white bg-opacity-30"
									bind:value={finalJson[line.name][i]}
								/>
							{:else if line.nested.type == "boolean"}
								<input
									type="checkbox"
									class=" rounded bg-white bg-opacity-30"
									bind:value={finalJson[line.name][i]}
								/>
							{:else if line.nested.type == "number"}
								<input
									type="number"
									class=" rounded bg-white bg-opacity-30"
									bind:value={finalJson[line.name][i]}
								/>
							{:else if line.nested.type == "enum"}
								<select
									class=" rounded bg-white bg-opacity-30"
									bind:value={finalJson[line.name][i]}
								>
									{#each line.enums ?? [] as opt}
										<option>{opt}</option>
									{/each}
								</select>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</main>
<div class="flex flex-col items-center justify-center mt-3 mb-1">
	{#if returnStatus != "loading"}
		<button class="btn btn-sm w-1/2" on:click={submitData}>Submit</button>
		<!-- <button
			class="btn btn-sm w-1/2"
			on:click={() => {
				console.log(JSON.stringify(finalJson));
			}}>Submit</button
		> -->
	{:else}
		<button class="btn btn-sm w-1/2">
			<span class="loading loading-spinner loading-md"></span>
		</button>
	{/if}

	{#if returnStatus != "" && returnStatus != "loading"}
		<p class=" mt-1 {returnStatus == 'error' ? ' text-red-600' : ''}">
			{returnStatus == "error"
				? "An error occured transfering data"
				: "Succesfully transfered data!"}
		</p>
	{/if}
</div>
