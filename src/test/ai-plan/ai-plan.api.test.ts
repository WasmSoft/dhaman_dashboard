import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { GeneratedPlan } from '@/types';

const mockPost = vi.fn();

vi.mock('@/lib/axios-instance', () => ({
  axiosInstance: {
    post: (...args: unknown[]) => mockPost(...args),
  },
}));

describe('generatePlan API action', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('should call API_PATHS.AI_PLAN.GENERATE with correct payload and return response.data', async () => {
    const mockResponse: GeneratedPlan = {
      id: 'draft-1',
      milestones: [
        {
          title: 'مرحلة التصميم',
          amount: 3000,
          dueInDays: 14,
          acceptanceCriteria: ['تسليم التصميم النهائي'],
          revisionLimit: 3,
        },
      ],
      policies: {
        delay: 'سياسة التأخير...',
        cancellation: 'سياسة الإلغاء...',
        extraRequest: 'سياسة الطلبات الإضافية...',
        review: 'سياسة المراجعة...',
      },
      ambiguityWarnings: [],
      clarityScore: 85,
    };

    mockPost.mockResolvedValueOnce({ data: mockResponse });

    // Re-import after mock is set up
    const { generatePlan } = await import('@/lib/ai-plan/actions/ai-plan.api');

    const payload = {
      projectDescription: 'مشروع تصميم واجهة مستخدم لتطبيق ويب متكامل',
      language: 'ar' as const,
    };

    const result = await generatePlan(payload);

    expect(mockPost).toHaveBeenCalledWith('/ai/generate-payment-plan', payload);
    expect(result).toEqual(mockResponse);
  });

  it('should propagate errors from axiosInstance', async () => {
    const apiError = new Error('Network error');
    mockPost.mockRejectedValueOnce(apiError);

    const { generatePlan } = await import('@/lib/ai-plan/actions/ai-plan.api');

    const payload = {
      projectDescription: 'مشروع تصميم واجهة مستخدم لتطبيق ويب متكامل',
    };

    await expect(generatePlan(payload)).rejects.toThrow('Network error');
  });
});
