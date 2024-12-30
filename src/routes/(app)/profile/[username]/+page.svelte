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
        <div class="flex bg-white/5 p-4 rounded-md gap-5">
            <img class="rounded-full size-20" src={getAvatarUrl(data.profile)} alt="Profile Pic" />
            <div class="flex flex-col gap-4">
                {#if !data.profile.showName || data.profile.firstName === ''}
                    <h4 class="font-titles text-4xl">{data.profile.username}</h4>
                {:else}
                    <div class="flex flex-col gap-0">
                        <h4 class="font-titles text-4xl">{data.profile.firstName} {data.profile.lastName}</h4>
                        <p class="text-foreground-muted">@{data.profile.username}</p>
                    </div> 
                {/if}
                <div class="flex items-center gap-2">
                    <RoleCard hex="#ebc034" name="Member" />
                    <RoleCard hex="#fc3503" name="Sceriff" />
                </div>
            </div>
            <div class="bg-white/10 py-2 px-4 rounded-md w-full">
                {#if data.profile.about || data.profile.about?.trim() !== ''}
                    <p>{data.profile.about}</p>
                {:else}
                    <p class="text-foreground-muted italic">A mysterious builder.</p>
                {/if}
            </div>
        </div>
    </div>
{/if}