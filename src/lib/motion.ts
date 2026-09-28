export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export function getMotionDuration(
  reduceMotion: boolean,
  duration = 0.72
): number {
  return reduceMotion ? 0 : duration;
}
