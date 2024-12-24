<script lang="ts">
	import { enhance } from '$app/forms';
	import RoleCard from '$lib/components/RoleCard.svelte';

    let { data } = $props();
</script>

<svelte:head>
    <title>BobaLUG - Account</title>
</svelte:head>

<div class="px-10 py-5">
    <div class="flex items-center justify-between pb-4">
        <h4 class="font-titles text-2xl pt-4 pb-2">Manage Your Account</h4>

        <div class="flex items-center gap-4">
            <a href={`/profile/${data.user.username}`} class="px-4 py-1 bg-accent border border-accent rounded-md hover:bg-opacity-90 flex items-center gap-3 transition-all">
                <span class="font-titles text-xl">View Profile</span>
            </a>
            <form method="post" action="?/logout" use:enhance>
                <button class="px-4 py-1 bg-error border border-error rounded-md hover:bg-opacity-90 flex items-center gap-3 transition-all">
                    <i class="fa-light fa-left-from-bracket"></i>
                    <span class="font-titles text-xl">Log Out</span>
                </button>
            </form>    
        </div>

        
    </div>

    <div class="w-full">
        <div class="pb-4">
            <div class="bg-blurple px-2 py-1 rounded-t-md tracking-wide">
                <h2 class="font-titles">Synced via Discord</h2>
            </div>
            <div class="bg-discord rounded-b-md px-3 py-1">
                <div class="flex items-center gap-4 py-4 px-2">
                    <img class="size-14 rounded-full" src="{data.avatarUrl}" alt="Profile Pic">

                    <label class="flex flex-col gap-0.5 w-96">
                        <span class="text-foreground-muted text-sm">Username</span>
                        <input class="bg-white/5 text-sm border-none rounded-md w-full" type="text" value="@{data.user.username}" disabled>
                    </label>

                    <div class="flex flex-col gap-0.5 w-full">
                        <span class="text-foreground-muted text-sm">Roles</span>
                        <div class="flex items-center gap-2">
                            <RoleCard hex="#ebc034" name="Member" />
                            <RoleCard hex="#fc3503" name="Sceriff" />
                        </div>
                    </div>
                </div>
                
                
                <p class="text-sm py-1 text-foreground-muted">This information is synced through your Discord account, and cannot be changed here.</p>
            </div>
        </div>

        

        <form class="flex flex-col gap-4" method="post" enctype="multipart/form-data">
            <label class="flex flex-col gap-0.5">
                <span class="text-sm">Display Name</span>
                <input class="bg-background rounded-md text-sm" type="text">
            </label>
            <label class="flex flex-col gap-0.5">
                <span class="text-sm">Role <span class="text-foreground-muted">- Your role(s) are automatically synced via Discord. If you believe you have an incorrect role, contact Andrew.</span></span>
                <input class="bg-background rounded-md text-sm hover:cursor-not-allowed" type="text" disabled>
            </label>
            <label class="flex flex-col gap-0.5">
                <span class="text-sm">Instagram <span class="text-foreground-muted">(optional)</span></span>
                <input class="bg-background rounded-md text-sm" type="text">
            </label>
        </form>
    </div>
</div>
