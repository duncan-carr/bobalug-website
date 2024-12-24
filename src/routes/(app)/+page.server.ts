import type { BeholdResponse } from '$lib/behold.js';

export async function load({ fetch }) {
    const res = await fetch("https://feeds.behold.so/DAQuc4zCCTFnpMFc2c9k");

    const behold: BeholdResponse = await res.json();

    return { behold };
} 