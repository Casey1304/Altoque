import { INITIAL_REPORTS } from '../../../services/mockData.js';

export const missingReportImage = '/reportes/imagen-no-disponible.png';

// Stored demo reports can still point to the original Google image URLs.
const legacyProductUrls = {
  'INC-1042': 'AB6AXuAnsKcEN9aDrr5EeVW',
  'INC-1040': 'AB6AXuCYAbD-sPEG21QSFJ9',
  'INC-1038': 'AB6AXuAf9-Pxu7tARc0xI6',
  'INC-1035': 'AB6AXuAf9-Pxu7tARc0xI6'
};
const legacyEvidenceUrls = { 1: 'AB6AXuBSyyokpbYbWbwSvRB', 2: 'AB6AXuAyg_pZAdj1ptrTqB' };

function isLegacyImage(src, token) {
  return Boolean(token && src?.startsWith('https://lh3.googleusercontent.com/aida-public/' + token));
}

export function getReportImages(report) {
  const sample = INITIAL_REPORTS.find(item => item.id === report.id);
  const product = report.productImage || report.product?.image;
  return {
    product: !product || isLegacyImage(product, legacyProductUrls[report.id])
      ? sample?.productImage || missingReportImage
      : product,
    evidences: (report.evidences || []).map(evidence => {
      const src = evidence.image || evidence.url;
      const example = sample?.evidences.find(item => String(item.id) === String(evidence.id));
      const replace = example && (!src || isLegacyImage(src, legacyEvidenceUrls[evidence.id]));
      return { ...evidence, src: replace ? example.image : src || missingReportImage,
        simulated: Boolean(evidence.simulated || replace || (example && src === example.image)) };
    })
  };
}
