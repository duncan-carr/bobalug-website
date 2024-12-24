import type { User } from "./database/authUtil";

export function getAvatarUrl(user: User) {
    return user.avatar ? 'https://cdn.discordapp.com/avatars/' + user.discordId + '/' + user.avatar : 'https://cdn.discordapp.com/embed/avatars/1.png';
}