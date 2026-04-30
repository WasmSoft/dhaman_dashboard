import { describe, it, expect } from 'vitest';
import { planGenerationSchema } from '@/lib/ai-plan/schemas';

describe('planGenerationSchema', () => {
  it('should fail when description is shorter than 20 characters', () => {
    const result = planGenerationSchema.safeParse({
      projectDescription: 'وصف قصير',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('الوصف يجب أن يكون 20 حرفاً على الأقل');
    }
  });

  it('should pass when description is exactly 20 characters', () => {
    const result = planGenerationSchema.safeParse({
      projectDescription: 'هذا وصف مكون من عشرين حرفاً بالضبط',
    });
    expect(result.success).toBe(true);
  });

  it('should fail when description exceeds 5000 characters', () => {
    const result = planGenerationSchema.safeParse({
      projectDescription: 'أ'.repeat(5001),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('الوصف يجب ألا يتجاوز 5000 حرف');
    }
  });

  it('should pass with valid description and optional budget', () => {
    const result = planGenerationSchema.safeParse({
      projectDescription: 'هذا وصف مشروع تفصيلي يحتوي على أكثر من عشرين حرفاً',
      totalBudget: 5000,
    });
    expect(result.success).toBe(true);
  });

  it('should fail when description is missing', () => {
    const result = planGenerationSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
