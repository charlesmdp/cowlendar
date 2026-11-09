import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {parseDocument} from 'htmlparser2';
import {findAll} from 'domutils';
import {allToolSlugs} from '../lib/toolkit/pages.mjs';
import {legacyToolGuides} from '../lib/legacy-tool-guides.mjs';

test('every free tool uses the matching version of its UI assets and both shared navigation links', () => {
  for (const slug of ['', ...allToolSlugs]) {
    const path = '/free-tools' + (slug ? '/' + slug : '');
    const doc = parseDocument(readFileSync('dist' + path + '.html', 'utf8'));
    const assets = findAll(n => n.name === 'link' || n.name === 'script', doc.children)
      .map(n => n.attribs.href ?? n.attribs.src ?? '')
      .filter(url => /(?:booking-tools|legacy-toolkit|tool-library)[.-]/.test(url));
    const expected = ['booking-tools'];
    if (!slug) expected.push('tool-library');
    if (legacyToolGuides[slug]) expected.push('legacy-toolkit');
    assert.equal(assets.length, expected.length, path);
    for (const name of expected) {
      const url = assets.find(url => url.startsWith('/assets/toolkit/ui/' + name + '-'));
      assert.ok(url, path + ' ' + name);
      const hash = createHash('sha256').update(readFileSync('dist' + url)).digest('hex').slice(0, 12);
      assert.equal(url.split('/').pop(), name + '-' + hash + (name === 'tool-library' ? '.js' : '.css'));
    }
    for (const label of ['Main navigation', 'Mobile navigation']) {
      const [nav] = findAll(n => n.name === 'nav' && n.attribs['aria-label'] === label, doc.children);
      const links = findAll(n => n.name === 'a' && n.attribs.href === '/free-tools', nav.children);
      assert.equal(links.length, 1, path + ' ' + label);
      assert.equal(links[0].attribs['aria-current'], slug ? 'location' : 'page');
    }
  }
});
