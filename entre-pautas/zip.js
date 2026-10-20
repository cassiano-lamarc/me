// ZIP sem compressão, CRC-32 e nomes UTF-8. PNG já é comprimido; nenhuma dependência.
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) { crc ^= byte; for(let i=0;i<8;i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); }
  return (crc ^ 0xffffffff) >>> 0;
}
const header = size => { const bytes = new Uint8Array(size); return {bytes,view:new DataView(bytes.buffer)}; };
export async function zipFiles(files) {
  const local = [], central = []; let offset = 0, centralSize = 0;
  for (const file of files) {
    const name = new TextEncoder().encode(file.name), bytes = new Uint8Array(await file.blob.arrayBuffer()), crc = crc32(bytes);
    const h = header(30); h.view.setUint32(0,0x04034b50,true); h.view.setUint16(4,20,true); h.view.setUint16(6,0x800,true); h.view.setUint16(12,0x21,true); h.view.setUint32(14,crc,true); h.view.setUint32(18,bytes.length,true); h.view.setUint32(22,bytes.length,true); h.view.setUint16(26,name.length,true);
    local.push(h.bytes,name,bytes);
    const c = header(46); c.view.setUint32(0,0x02014b50,true); c.view.setUint16(4,20,true); c.view.setUint16(6,20,true); c.view.setUint16(8,0x800,true); c.view.setUint16(14,0x21,true); c.view.setUint32(16,crc,true); c.view.setUint32(20,bytes.length,true); c.view.setUint32(24,bytes.length,true); c.view.setUint16(28,name.length,true); c.view.setUint32(42,offset,true);
    central.push(c.bytes,name); offset += 30 + name.length + bytes.length; centralSize += 46 + name.length;
  }
  const end = header(22); end.view.setUint32(0,0x06054b50,true); end.view.setUint16(8,files.length,true); end.view.setUint16(10,files.length,true); end.view.setUint32(12,centralSize,true); end.view.setUint32(16,offset,true);
  return new Blob([...local,...central,end.bytes],{type:'application/zip'});
}
