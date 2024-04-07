<script lang="ts">
	import { connect } from "$lib/stores";
	import { updateSessions } from "$lib/update";
	import { onMount } from "svelte";

	let sessions: Array<any>;
	let cur_session: number;

	onMount(() => {
		connect.set(updateSession);
		updateSessions();
	});

	function updateSession(newSessions: Array<any>, new_session: number) {
		sessions = newSessions;
		cur_session = new_session;
	}
</script>

<main class="flex h-full w-full justify-center items-center">
	<div
		class="flex flex-col items-center justify-evenly w-[80%] h-[50%] px-2 m-0 bg-secondary rounded border border-neutral-600 text-center"
	>
		{#if sessions != undefined && sessions.length > 0}
			<p class=" font-semibold text-xl">
				Current session type: {sessions[cur_session].endgrate_type}
			</p>
			<a
				href="https://endgrate.com/session?session_id={sessions[cur_session]
					.session_id}"
				class="btn btn-sm mb-1 w-[50%] h-11"
			>
				<button class="text-lg"> Connect to a Provider </button>
			</a>
		{:else}
			<h1>Loading...</h1>
		{/if}
	</div>
</main>
