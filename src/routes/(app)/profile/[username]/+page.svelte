<script lang="ts">
	import RoleCard from '$lib/components/RoleCard.svelte';
	import { getAvatarUrl } from '$lib/util';

    let { data } = $props();

    const pageTitle = data.profile ? `${data.profile.username}'s Profile` : 'Profile Not Found';
</script>

<svelte:head>
    <title>{pageTitle}</title> 
</svelte:head>

{#if !data.profile}
    <div class="p-10">
        <h1 class="font-titles text-6xl">Uh oh! That user does not exist.</h1>
        <a href="/" class="text-foreground-muted hover:underline">Return home</a>
    </div>
{:else}
    <div class="p-10">
        <div class="flex items-center gap-5">
            <img class="rounded-full size-20" src={getAvatarUrl(data.profile)} alt="Profile Pic" />
            <div class="flex flex-col">
                <h4 class="font-titles text-4xl">{data.profile.username}</h4>
                <div class="flex items-center gap-2">
                    <RoleCard hex="#ebc034" name="Member" />
                    <RoleCard hex="#fc3503" name="Sceriff" />
                </div>
            </div>
            
        </div>
    </div>
{/if}