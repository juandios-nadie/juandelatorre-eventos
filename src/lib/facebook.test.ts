import assert from "node:assert/strict";
import test from "node:test";
import { FACEBOOK_URL } from "./constants";
import {
  FACEBOOK_SDK_SRC,
  getFacebookPageUrl,
  normalizeFacebookPageUrl,
} from "./facebook";

test("normalizeFacebookPageUrl accepts Facebook page URLs and removes tracking data", () => {
  assert.equal(
    normalizeFacebookPageUrl(
      " http://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/?fbclid=abc#posts "
    ),
    "https://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/"
  );
});

test("normalizeFacebookPageUrl rejects non-Facebook URLs", () => {
  assert.equal(normalizeFacebookPageUrl("https://www.instagram.com/example"), null);
  assert.equal(normalizeFacebookPageUrl("javascript:alert(1)"), null);
  assert.equal(normalizeFacebookPageUrl(""), null);
});

test("getFacebookPageUrl falls back to the site default", () => {
  assert.equal(getFacebookPageUrl(null), FACEBOOK_URL);
  assert.equal(getFacebookPageUrl("not a url"), FACEBOOK_URL);
});

test("FACEBOOK_SDK_SRC loads the Spanish Latin America SDK with XFBML parsing enabled", () => {
  assert.equal(
    FACEBOOK_SDK_SRC,
    "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v25.0"
  );
});
