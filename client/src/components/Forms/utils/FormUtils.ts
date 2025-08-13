const CACHE_PREFIX = 'app_lookup_';

export const getRoles = async () => {
  return sessionStorage.getItem(`${CACHE_PREFIX}roles`)

}
