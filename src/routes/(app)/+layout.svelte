<script lang="ts">
	let { children, data } = $props();

	const avatarUrl = data.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + data.user.discordId + '/' + data.user.avatar : 'https://cdn.discordapp.com/embed/avatars/1.png';
</script>

<nav class="p-4 flex items-center justify-between">
	<a href="/" class="flex items-center gap-3">
		<img class="size-10 p-1 bg-accent rounded-md" src="https://utfs.io/f/8H5BXZPIZvSNceHOtNXwB2ft7V3QYduRXqLm4yHvlaoWU9s1" alt="Logo" />
		<h3 class="font-titles text-4xl">BobaLUG</h3>
	</a>
	<div class="flex items-center gap-4">
		{#if !data.user}
			<a href="/login" class="px-4 py-1 border border-foreground rounded-md hover:bg-foreground-muted hover:bg-opacity-15 flex items-center transition-all gap-3">
				<i class="fa-light fa-user-bounty-hunter scale-90"></i>
				<span class="font-titles text-xl">Log In</span>
			</a>
		{:else}
			<a href="/account" class="rounded-full overflow-clip">
				<img class="size-9 hover:opacity-85 transition-all" src={avatarUrl} alt="Avatar" />
			</a>
		{/if}
		<a href="/join-us" class="px-4 py-1 bg-accent border border-accent rounded-md hover:bg-opacity-90 flex items-center gap-3 transition-all">
			<i class="fa-solid fa-swords-laser scale-90"></i>
			<span class="font-titles text-xl">Join Us</span>
		</a>
	</div>
</nav>

{@render children()}
