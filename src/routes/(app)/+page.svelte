<script lang="ts">
	import CarouselFrame from "$lib/components/CarouselFrame.svelte";

    let { data } = $props();

    let currentPost = $state(0);

    function incrementPost() {
        currentPost = currentPost + 1;
        if (currentPost >= data.behold.posts.length) {
            currentPost = 0;
        }
    }

    function decrementPost() {
        currentPost = currentPost - 1;
        if (currentPost < 0) {
            currentPost = data.behold.posts.length - 1;
        }
    }

    const interval = setInterval(() => {
        incrementPost()
    }, 10000);
</script>

<svelte:head>
    <title>BobaLUG</title>
</svelte:head>

<div class="px-20 py-10">
    <h2 class="font-titles text-4xl pb-4">See Our Talented Builders in Action...</h2>
    <div class="border rounded-md p-4 border-foreground-muted">
        <CarouselFrame post={data.behold.posts[currentPost]}></CarouselFrame>
        <div class="flex items-center justify-between px-2 pt-4 text-foreground-muted">
            <button class="flex items-center gap-2 group" onclick={decrementPost}><i class="fa-light fa-arrow-left"></i> <span class="group-hover:underline ">Previous Post</span></button>
            <div class="flex items-center gap-3">
                {#each data.behold.posts as _, idx}
                    {#if idx === currentPost}
                        <div class="bg-accent size-2 rounded-full"></div>
                    {:else}
                        <div class="bg-foreground-muted size-1 rounded-full"></div>
                    {/if}
                {/each}
            </div>
            <button class="flex items-center gap-2 group" onclick={incrementPost}><span class="group-hover:underline ">Next Post</span> <i class="fa-light fa-arrow-right"></i></button>
        </div>
    </div>
    <h2 class="font-titles text-4xl pt-4 text-end">...Building Connections with Every Brick</h2>
</div>

