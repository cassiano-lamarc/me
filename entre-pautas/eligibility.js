export const actorIds=['lula','flavio-bolsonaro'];
const isoDate=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value);
export function usableSource(source){
  if(!source||!/^https:\/\//.test(source.url||'')||typeof source.summary!=='string'||!source.summary.trim())return false;
  if(isoDate(source.date))return true;
  return source.date===null && source.dateStatus==='notProvided' && isoDate(source.accessedAt)
    && source.planYear===2026 && /^https:\/\/www\.tse\.jus\.br\//.test(source.url)
    && Array.isArray(source.pages) && source.pages.length>0
    && source.pages.every(page=>Number.isInteger(page)&&page>0&&page<=source.pageCount);
}
export const hasBinaryEvidence=position=>Boolean(position&&['favor','against'].includes(position.stance)&&isoDate(position.verifiedAt)&&Array.isArray(position.sources)&&position.sources.some(usableSource));
export const hasBothBinaryPositions=proposal=>actorIds.every(id=>hasBinaryEvidence(proposal.positions?.[id]));
