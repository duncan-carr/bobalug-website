import { getUserFromUsername } from '$lib/database/authUtil.js'

export async function load({ params, locals }) {
    if (!params.username) {
        return {
            profile: null,
            viewer: locals.user
        }
    }

    const user = await getUserFromUsername(params.username);

    return {
        profile: user,
        viewer: locals.user
    }
} 