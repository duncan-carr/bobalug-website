export interface BeholdResponse {
    username:          string;
    biography:         string;
    profilePictureUrl: string;
    website:           string;
    followersCount:    number;
    followsCount:      number;
    posts:             Post[];
}

export interface Post {
    id:               string;
    timestamp:        string;
    permalink:        string;
    mediaType:        string;
    mediaUrl:         string;
    sizes:            Sizes;
    caption:          string;
    prunedCaption:    string;
    hashtags:         string[];
    mentions:         string[];
    colorPalette:     ColorPalette;
    children?:        Child[];
    commentsCount:    number;
    likeCount:        number;
    backgroundColor?: string;
}

export interface Child {
    id:           string;
    mediaType:    MediaType;
    mediaUrl:     string;
    sizes:        Sizes;
    colorPalette: ColorPalette;
}

export interface ColorPalette {
    dominant:     string;
    muted:        string;
    mutedLight:   string;
    mutedDark:    string;
    vibrant:      string;
    vibrantLight: string;
    vibrantDark:  string;
}

export enum MediaType {
    Image = "IMAGE",
    Carousel = "CAROUSEL_ALBUM",
    Video = "VIDEO"
}

export interface Sizes {
    small:  Full;
    medium: Full;
    large:  Full;
    full:   Full;
}

export interface Full {
    mediaUrl: string;
    height:   number;
    width:    number;
}
