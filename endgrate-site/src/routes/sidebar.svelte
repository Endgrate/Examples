<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let cur_session: number;
	export let sessions: any;

	let opened = false;

	export function close() {
		opened = false;
		console.log("manual sidebar close");
	}
	export function updateSession(newSessions: Array<any>, new_session: number) {
		sessions = newSessions;
		cur_session = new_session;
	}

	const dispatch = createEventDispatcher();

	function createSession() {
		dispatch("newSession");
	}
	function deleteSession(i: number) {
		dispatch("deleteSession", { idx: i });
	}
	function setSession(i: number) {
		dispatch("setSession", { idx: i });
	}
</script>

<div class="drawer">
	<input
		id="my-drawer"
		type="checkbox"
		class="drawer-toggle"
		bind:checked={opened}
	/>
	<div class="drawer-content">
		<label
			for="my-drawer"
			class=" w-12 h-10 btn btn-md bg-neutral-100 drawer-button m-3 fixed left-[0.5%] top-[0.5%]"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 scale-x-[1.9] scale-y-[2.5]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</label>
	</div>
	<div class="drawer-side">
		<label
			for="my-drawer"
			aria-label="close sidebar"
			class="drawer-overlay p-0 bg-primary w-[2200px]"
		></label>
		<ul
			class="m-0 flex flex-col p-2 pt-4 w-80 min-h-full bg-base-200 text-base-content content-center justify-start"
		>
			<button
				class="w-[100%] outline outline-1 transition-all duration-300 outline-transparent p-2 rounded hover:outline-primary hover:shadow-inner"
				on:click={createSession}>Create Session +</button
			>
			<hr
				class="w-[90%] h-[2px] mx-auto my-1 bg-gray-100 border-0 md:my-5 dark:bg-secondary"
			/>
			{#if sessions === undefined}
				<h1>Loading...</h1>
			{:else}
				{#each sessions as session, i}
					<span class="m-0 mb-2 flex flex-row w-full h-[30px] justify-center">
						<button
							name="id"
							value={i}
							class="btn btn-xs text-[15px] btn-outline w-[90%] h-[100%] border-r-0 rounded-r-none shadow-neutral-500
							{i == cur_session ? 'shadow-inner' : ''}"
							on:click={() => {
								setSession(i);
							}}
							>{session.name}
						</button>

						<button
							name="id"
							value={i}
							class="ml-0 border-l-0 h-[100%] w-[10%] btn btn-xs btn-outline rounded-l-none hover:btn-error {i ==
							cur_session
								? 'shadow-inner'
								: ''}"
							on:click={() => {
								deleteSession(i);
							}}
						>
							<svg
								width="512"
								height="512"
								viewBox="0 0 512 512"
								style="color:#1C2033"
								xmlns="http://www.w3.org/2000/svg"
								class="h-full w-full scale-[1.8]"
								><rect
									width="512"
									height="512"
									x="0"
									y="0"
									rx="0"
									fill="transparent"
									stroke="transparent"
									stroke-width="0"
									stroke-opacity="100%"
									paint-order="stroke"
								></rect><svg
									width="372px"
									height="372px"
									viewBox="0 0 512 512"
									fill="#1C2033"
									x="70"
									y="70"
									role="img"
									style="display:inline-block;vertical-align:middle"
									xmlns="http://www.w3.org/2000/svg"
									><g fill="#1C2033"
										><path
											d="M413.7 133.4c-2.4-9-4-14-4-14-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8-8.7-19.6-11.4-31-20.9-31h-103c-9.5 0-12.1 11.4-20.8 31.1-2.6 5.6-2.6 5.6-9.2 6.8l-53.2 6.7c-9.7 1.6-16.7 2.5-19.3 11.8 0 0-1.2 4.1-3.7 13-3.2 11.9-4.5 10.6 6.5 10.6h302.4c11 .1 9.8 1.3 6.5-10.6z"
											fill="currentColor"
										/><path
											d="M379.4 176H132.6c-16.6 0-17.4 2.2-16.4 14.7l18.7 242.6c1.6 12.3 2.8 14.8 17.5 14.8h207.2c14.7 0 15.9-2.5 17.5-14.8l18.7-242.6c1-12.6.2-14.7-16.4-14.7z"
											fill="currentColor"
										/></g
									></svg
								></svg
							>
						</button>
					</span>
				{/each}
			{/if}
		</ul>
	</div>
</div>
