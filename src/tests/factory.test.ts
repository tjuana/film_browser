import { describe, it, expect, vi, afterEach } from 'vitest';
import * as env from '@shared/config/env';
import { createMoviesService } from '@entities/movie/api/factory';

describe('factory', () => {
  const getHasKey = () => vi.spyOn(env, 'hasTmdbKey');

  afterEach(() => vi.restoreAllMocks());

  it('returns mock when forceMock', () => {
    const svc = createMoviesService({ forceMock: true });
    expect(svc.kind).toBe('mock');
  });

  it('returns mock when no key', () => {
    getHasKey().mockReturnValue(false);
    const svc = createMoviesService();
    expect(svc.kind).toBe('mock');
  });

  it('returns live when key exists', () => {
    getHasKey().mockReturnValue(true);
    const svc = createMoviesService();
    expect(svc.kind).toBe('live');
  });
});
