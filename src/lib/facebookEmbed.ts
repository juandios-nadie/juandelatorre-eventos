export const FACEBOOK_EMBED_MIN_WIDTH = 180;
export const FACEBOOK_EMBED_MIN_TIMELINE_HEIGHT = 200;

interface FacebookEmbedSize {
  width: number | null | undefined;
  height: number | null | undefined;
}

export function isRenderableFacebookEmbedSize({
  width,
  height,
}: FacebookEmbedSize): boolean {
  return (
    (width ?? 0) >= FACEBOOK_EMBED_MIN_WIDTH &&
    (height ?? 0) >= FACEBOOK_EMBED_MIN_TIMELINE_HEIGHT
  );
}
