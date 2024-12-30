<script lang="ts">
	import { enhance } from '$app/forms';
	import RoleCard from '$lib/components/RoleCard.svelte';

    let { data } = $props();

    const lastSynced = data.user.lastUpdated;

    // date formatter that formats the date to 
</script>

<svelte:head>
    <title>BobaLUG - Account Settings</title>
</svelte:head>

<div class="px-10 py-5 pb-10">
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
                <div class="flex items-center gap-4 py-6 px-2">
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

                <div class="flex items-center justify-between text-sm pb-1">
                    <span class="text-foreground-muted">To resync, sign out and sign back in.</span>
                    <p class="text-foreground-muted">Last synced on {lastSynced.toLocaleDateString()} at {lastSynced.toLocaleTimeString()}.</p>
                </div>
            </div>
        </div>

        <h4 class="font-titles text-2xl py-2">Profile Settings</h4>

        <form class="w-full flex flex-col gap-8" method="post" enctype="multipart/form-data" action="?/save">
            <div class="w-full flex gap-8">
                <div class="flex flex-col gap-4 w-fit">
                    <div class="flex gap-4 w-full">
                        <label class="flex flex-col gap-0.5">
                            <span class="text-sm">First Name</span>
                            <input name="first_name" class="bg-background rounded-md text-sm w-52" type="text" bind:value={data.user.firstName}>
                        </label>
                        <label class="flex flex-col gap-0.5">
                            <span class="text-sm">Last Name</span>
                            <input name="last_name" class="bg-background rounded-md text-sm w-52" type="text" bind:value={data.user.lastName}>
                        </label>
                    </div>
                    <label class="flex items-center gap-2">
                        <input name="show_name" class="bg-background rounded-md text-sm" type="checkbox" bind:checked={data.user.showName}>
                        <span class="text-sm">Show name on public profile</span>
                    </label>
                    
                    <label class="flex flex-col gap-0.5">
                        <span class="text-sm">Birthday</span>
                        <input name="birthday" type="date" class="bg-background rounded-md text-sm w-52" bind:value={data.user.birthday}>
                    </label>
                    <label class="flex items-center gap-2">
                        <input name="show_birthday" class="bg-background rounded-md text-sm" type="checkbox" bind:checked={data.user.showBirthday}>
                        <span class="text-sm">Show birthday on public profile</span>
                    </label>
        
                    <label class="flex flex-col gap-0.5">
                        <span class="text-sm">Country</span>
                        <input name="country" class="bg-background rounded-md text-sm w-52" type="text" bind:value={data.user.country}>
                    </label>
                </div>
                <div class="flex flex-col gap-4 w-full">
                    <label class="flex flex-col gap-0.5">
                        <span class="text-sm">About Me</span>
                        <textarea name="about" class="bg-background rounded-md text-sm w-full h-24" bind:value={data.user.about}></textarea>
                    </label>
                </div>
            </div>
            <button class="w-fit font-titles text-xl px-4 py-1 bg-accent border border-accent rounded-md hover:bg-opacity-90 flex items-center gap-3 transition-all" type="submit">Save changes</button>
        </form>
    </div>
</div>
