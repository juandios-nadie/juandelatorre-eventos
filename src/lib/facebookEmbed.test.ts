import assert from "node:assert/strict";
import test from "node:test";
import { isRenderableFacebookEmbedSize } from "./facebookEmbed";

test("isRenderableFacebookEmbedSize accepts full timeline embeds", () => {
  assert.equal(isRenderableFacebookEmbedSize({ width: 474, height: 560 }), true);
});

test("isRenderableFacebookEmbedSize rejects collapsed and header-only embeds", () => {
  assert.equal(isRenderableFacebookEmbedSize({ width: 0, height: 0 }), false);
  assert.equal(isRenderableFacebookEmbedSize({ width: 500, height: 71 }), false);
  assert.equal(isRenderableFacebookEmbedSize({ width: null, height: null }), false);
});
