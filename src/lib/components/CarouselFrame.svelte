<script lang="ts">
	import type { Post } from "$lib/behold";

    let { post }: { post: Post } = $props();

    let imageSrc = $derived(post.children ? post.children[0].mediaUrl : post.mediaUrl);

    let title = $derived(post.prunedCaption.split('\n')[0]);

    let lines = $derived(post.prunedCaption.split('\n').slice(1));
    let prunedLines = $derived(lines.slice(0, lines.length - 4));
</script>

<div class="w-full flex gap-4 border-b border-foreground-muted pb-4">
    <div class="w-1/2 flex flex-col gap-2">
        <img src={imageSrc} alt="Instagram Feed" class="rounded-md h-96 object-cover" />
        <div class="flex justify-between items-center px-2">
            <div class="flex items-center gap-2">
                <i class="fa-light fa-heart"></i>
                <span>{post.likeCount}</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-light fa-comment"></i>
                <span>{post.commentsCount}</span>
            </div>
        </div>
    </div>
    
    <div class="w-1/2">
        <p class="pb-2 font-titles text-2xl">{title}</p>
        {#each prunedLines as line}
            <p class="text-sm text-foreground-muted">{line}</p>
            <br>
        {/each}
    </div>
</div>