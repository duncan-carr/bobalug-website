<script lang="ts">
	let { children, data } = $props();
</script>

<nav class="p-4 flex items-center justify-between sticky top-0 z-50 bg-background bg-opacity-80 backdrop-blur-xl">
	<a href="/" class="flex items-center gap-3">
		<img class="size-10 p-1 bg-accent rounded-md" src="https://utfs.io/f/8H5BXZPIZvSNceHOtNXwB2ft7V3QYduRXqLm4yHvlaoWU9s1" alt="Logo" />
		<h3 class="font-titles text-4xl">BobaLUG</h3>
	</a>
	<div class="flex items-center gap-8">
		<a href="/about" class="font-titles text-xl hover:text-accent transition-all">About</a>
		<a href="/members" class="font-titles text-xl hover:text-accent transition-all">Members</a>
		<a href="/sponsors" class="font-titles text-xl hover:text-accent transition-all">Sponsors</a>
		<a href="/collaborations" class="font-titles text-xl hover:text-accent transition-all">Collaborations</a>
		<a href="/store" class="font-titles text-xl hover:text-accent transition-all">Store</a>
		<a href="/apply" class="font-titles text-xl hover:text-accent transition-all">Apply</a>
	</div>
	<div class="flex items-center gap-4">
		{#if !data.user}
			<a href="/login" class="px-4 py-1 border border-foreground rounded-md hover:bg-foreground-muted hover:bg-opacity-15 flex items-center transition-all gap-3">
				<i class="fa-light fa-user-bounty-hunter scale-90"></i>
				<span class="font-titles text-xl">Log In</span>
			</a>
		{:else}
			<a href="/account" class="rounded-full overflow-clip">
				<img class="size-9 hover:opacity-85 transition-all" src={data.avatarUrl} alt="Avatar" />
			</a>
		{/if}
		<a href="/join-us" class="px-4 py-1 bg-accent border border-accent rounded-md hover:bg-opacity-90 flex items-center gap-3 transition-all">
			<span class="font-titles text-xl">Join Us</span>
		</a>
	</div>
</nav>

{@render children()}
