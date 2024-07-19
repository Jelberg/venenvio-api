export function hasExpired(exp: number): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
}
  
  