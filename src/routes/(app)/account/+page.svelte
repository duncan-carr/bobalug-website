<script lang="ts">
    let { data } = $props();
</script>

<div class="flex items-center gap-2">
    <h2 class="font-titles text-2xl">Hello, {data.user.username}!</h2>
    <i class="fa-light fa-hand-wave"></i>
</div>