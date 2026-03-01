import { NextResponse } from "next/server";

const GRAPH_API = "https://graph.facebook.com/v21.0";
const FIELDS =
  "id,caption,media_type,media_url,permalink,timestamp,thumbnail_url";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  timestamp: string;
  thumbnail_url?: string;
};

export type BlogPostFromInstagram = {
  id: string;
  caption: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
  mediaType: string;
};

function getToken(): string | null {
  return process.env.INSTAGRAM_ACCESS_TOKEN ?? null;
}

function getIgUserId(): string | null {
  return process.env.INSTAGRAM_IG_USER_ID ?? null;
}

function getPageId(): string | null {
  return process.env.INSTAGRAM_PAGE_ID ?? null;
}

/** Resolve Instagram Business Account ID from Facebook Page if needed */
async function resolveIgUserId(
  pageId: string,
  token: string
): Promise<string | null> {
  const url = `${GRAPH_API}/${pageId}?fields=instagram_business_account&access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const igAccount = data.instagram_business_account;
  return igAccount?.id ?? null;
}

export async function GET() {
  const token = getToken();
  if (!token) {
    return NextResponse.json(
      { error: "INSTAGRAM_ACCESS_TOKEN not set", posts: [] },
      { status: 200 }
    );
  }

  let igUserId = getIgUserId();
  if (!igUserId) {
    const pageId = getPageId();
    if (!pageId) {
      return NextResponse.json(
        { error: "Set INSTAGRAM_IG_USER_ID or INSTAGRAM_PAGE_ID", posts: [] },
        { status: 200 }
      );
    }
    igUserId = await resolveIgUserId(pageId, token);
    if (!igUserId) {
      return NextResponse.json(
        { error: "Could not get Instagram account from page", posts: [] },
        { status: 200 }
      );
    }
  }

  try {
    const url = `${GRAPH_API}/${igUserId}/media?fields=${FIELDS}&limit=24&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: "Instagram API error", details: err, posts: [] },
        { status: 200 }
      );
    }
    const data = await res.json();
    const list: InstagramMedia[] = data.data ?? [];

    const posts: BlogPostFromInstagram[] = list.map((m) => ({
      id: m.id,
      caption: m.caption ?? "",
      imageUrl: m.media_type === "VIDEO" ? (m.thumbnail_url ?? m.media_url) : m.media_url,
      permalink: m.permalink,
      timestamp: m.timestamp,
      mediaType: m.media_type,
    }));

    return NextResponse.json({ posts });
  } catch (e) {
    return NextResponse.json(
      { error: String(e), posts: [] },
      { status: 200 }
    );
  }
}
