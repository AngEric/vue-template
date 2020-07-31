export default {
  setDomain(domain) {
    const subDomain = domain.split('.');
    const myDomain = subDomain.length > 1 ? `${subDomain[subDomain.length - 2]}.${subDomain[subDomain.length - 1]}` : subDomain[0];
    return myDomain;
  },
}