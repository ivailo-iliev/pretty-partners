import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', {recursive:true});
for (const file of ['index.html','coupon.html','coupon.css','coupon.js','coupon-data.js'])
  await copyFile(file, `dist/${file}`);
