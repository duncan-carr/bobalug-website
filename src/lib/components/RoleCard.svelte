<script lang="ts">
    let { hex, name } = $props();
</script>

<div class="flex items-center gap-2 bg-white/5 rounded-md p-2 px-3 w-fit text-sm">
    <div class="size-2 rounded-full" style={`background-color: ${hex};`}></div>
    <p>{name}</p>
</div>