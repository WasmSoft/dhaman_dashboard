import { describe, it, expect } from 'vitest';

// AR: Helper يستخرج من AiPlanResult للاختبار المستقل.
// EN: Helper extracted from AiPlanResult for standalone testing.
function scoreColorClass(score: number) {
  if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
  if (score >= 50) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25';
  return 'text-red-400 bg-red-500/10 border-red-500/25';
}

describe('scoreColorClass', () => {
  it('should return green class for score >= 80', () => {
    expect(scoreColorClass(90)).toBe('text-emerald-400 bg-emerald-500/10 border-emerald-500/25');
    expect(scoreColorClass(80)).toBe('text-emerald-400 bg-emerald-500/10 border-emerald-500/25');
  });

  it('should return yellow class for score >= 50 and < 80', () => {
    expect(scoreColorClass(60)).toBe('text-yellow-400 bg-yellow-500/10 border-yellow-500/25');
    expect(scoreColorClass(50)).toBe('text-yellow-400 bg-yellow-500/10 border-yellow-500/25');
    expect(scoreColorClass(79)).toBe('text-yellow-400 bg-yellow-500/10 border-yellow-500/25');
  });

  it('should return red class for score < 50', () => {
    expect(scoreColorClass(30)).toBe('text-red-400 bg-red-500/10 border-red-500/25');
    expect(scoreColorClass(0)).toBe('text-red-400 bg-red-500/10 border-red-500/25');
  });
});
