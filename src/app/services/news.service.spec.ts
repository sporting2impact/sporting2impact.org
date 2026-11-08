import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';

describe('NewsService', () => {
  const posts = () => TestBed.inject(NewsService).getPosts();

  it('writes every publish date as "YYYY-MM-DD"', () => {
    const bad = posts().filter(p => !/^\d{4}-\d{2}-\d{2}$/.test(p.date) || isNaN(Date.parse(p.date)));
    expect(bad.map(p => p.id)).toEqual([]);
  });

  it('gives every post a unique id and a unique lowercase-hyphen slug', () => {
    const all = posts();
    const ids = all.map(p => p.id);
    const slugs = all.map(p => p.slug);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
    expect(slugs.filter((s, i) => slugs.indexOf(s) !== i)).toEqual([]);
    expect(slugs.filter(s => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s))).toEqual([]);
  });

  it('only links to site pages, https:// addresses or mailto:', () => {
    const bad = posts().filter(
      p => p.link && !/^(\/|https:\/\/|mailto:)/.test(p.link.url),
    );
    expect(bad.map(p => p.id)).toEqual([]);
  });

  it('lists the newest post first', () => {
    const dates = posts().map(p => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });
});
