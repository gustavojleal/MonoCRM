import api from './PublicApi';

const CACHE_PREFIX = 'app_lookup_';

export const LookupService = {
  async getLookupData<T>(lookupType: string): Promise<T[]> {
     const cacheKey = `${CACHE_PREFIX}${lookupType.replace(/\//g, '_')}`;
    try {
      const response = await api.get<T[]>(`/lookup/${lookupType}`);
      this.setSession(cacheKey, response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch roles: ' + (error as any).response?.data?.message || 'Unknown error');
    }
  },
  
  setSession(cacheKey: string, response: any): void {
    sessionStorage.setItem(`${cacheKey}`, JSON.stringify(response.data));
  }
  
  
}

