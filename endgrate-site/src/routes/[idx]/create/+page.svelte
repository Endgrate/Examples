<script lang="ts">
	import { goto } from "$app/navigation";

	let EndgrateTypes = [
		"accounting-address",
		"accounting-company",
		"accounting-contact",
		"accounting-contact_people",
		"accounting-invoice",
		"accounting-payment",
		"accounting-product",
		"accounting-purchase_order",
		"analytics-lead",
		"analytics-note",
		"analytics-page_analytics",
		"analytics-page_views",
		"analytics-user",
		"analytics-user_count",
		"ats-candidate",
		"ats-contact",
		"calendar-event",
		"communication-meeting",
		"communication-message_history",
		"communication-user",
		"crm-activity",
		"crm-company",
		"crm-contact",
		"crm-deal",
		"crm-lead",
		"crm-customer",
		"crm-note",
		"crm-policy",
		"crm-product",
		"crm-task",
		"crm-ticket",
		"crm-user",
		"database-user",
		"ecommerce-customer",
		"ecommerce-order",
		"ecommerce-product",
		"ecommerce-product_category",
		"ecommerce-product_collection",
		"ecommerce-product_variant",
		"forms-lead",
		"forms-question",
		"helpdesk-company",
		"helpdesk-contact",
		"helpdesk-note",
		"helpdesk-user",
		"marketing-contact",
		"marketing-customer",
		"marketing-lead",
		"marketing-user",
		"prospecting-company",
		"prospecting-contact",
		"workspace-task",
		"workspace-user",
	];

	let selected: string = EndgrateTypes[0];

	let warnName = false;

	async function initiate() {
		let sessions = JSON.parse(localStorage.getItem("sessions")!);
		let cur_session = parseInt(localStorage.getItem("cur_session")!);

		if (sessions[cur_session].name == "") {
			warnName = true;
			return;
		}

		let formData = new FormData();
		formData.set("endgrate_type", selected);
		formData.set("check_id", sessions[cur_session].unique_id);

		const response = await fetch("/api/initiateSession", {
			method: "POST",
			body: formData,
		}).then(async (resp) => await resp.json());

		if (response.status == "success") {
			console.log("success: " + response.session_id);

			sessions[cur_session].endgrate_type = selected;
			sessions[cur_session].session_id = response.session_id;
			sessions[cur_session].state = "connect";

			localStorage.setItem("sessions", JSON.stringify(sessions));
			localStorage.setItem("cur_session", cur_session.toString());

			goto(`/${cur_session}/connect`);
		} else {
			console.error("SOMETHING WENT WRONG GETTING ID");
		}
	}
</script>

<div
	class="m-0 translate-y-[50px] min-w-[500px] bg-secondary rounded p-3 py-2 text-center"
>
	<span class="text-lg">Select an Endgrate Type:</span>
	<span class="flex flex-row justify-center items-center mt-2">
		<select
			data-placeholder="Begin typing a name to filter..."
			class="bg-tertiary p-1 rounded-sm h-9 w-[350px]"
			name="schema"
			bind:value={selected}
		>
			{#each EndgrateTypes as schema}
				<option>{schema}</option>
			{/each}
		</select>
		<button
			on:click={initiate}
			class=" p-[2px] ml-2 h-9 w-20 rounded-sm shadow hover:shadow-md focus:shadow-inner"
			>Select</button
		>
	</span>
	{#if warnName}
		<p class="text-red-600 mt-2">Name required</p>
	{/if}
</div>
