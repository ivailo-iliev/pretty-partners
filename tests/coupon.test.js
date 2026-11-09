import { test } from 'node:test';
import assert from 'node:assert/strict';
import { couponSlug, artworkUrl } from '../coupon-data.js';

test('only exact short coupon paths are accepted', () => {
  assert.equal(couponSlug('/p/aB3_xY9-zQ1M'), 'aB3_xY9-zQ1M');
  assert.equal(couponSlug('/p/aB3_xY9-zQ1M/'), 'aB3_xY9-zQ1M');
  for (const path of ['/p/short', '/p/aB3_xY9-zQ1M/extra', '/admin/', '/p/%3Cscript%3E'])
    assert.equal(couponSlug(path), null);
});
test('artwork can only load from the shared tenant artwork bucket', () => {
  assert.match(artworkUrl('0060edd3-4320-458f-88f7-7e7e56d3aeda/logo/original.png'), /supabase.co\/storage\/v1\/object\/public\/partner-artwork\//);
  for (const path of ['https://evil.test/image.png', '../secret', null, '0060edd3-4320-458f-88f7-7e7e56d3aeda/logo/../../private'])
    assert.equal(artworkUrl(path), null);
});
