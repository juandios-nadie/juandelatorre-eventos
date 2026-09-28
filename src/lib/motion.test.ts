import assert from "node:assert/strict";
import test from "node:test";
import { getMotionDuration, MOTION_EASE } from "./motion";

test("reduced motion resolves every animation duration to zero", () => {
  assert.equal(getMotionDuration(true, 0.8), 0);
});

test("standard motion keeps the requested duration and shared ease", () => {
  assert.equal(getMotionDuration(false, 0.8), 0.8);
  assert.deepEqual(MOTION_EASE, [0.22, 1, 0.36, 1]);
});
