import { getAvatarUrl } from '$lib/util.js';

export async function load({ locals, fetch }) {
    const user = locals.user;
    if (!user) {
        return { user: null, avatarUrl: null };
    }

    return { user, avatarUrl: getAvatarUrl(user) };
}