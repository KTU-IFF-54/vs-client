import { GwClientPage } from './app.po';

describe('gw-client App', () => {
  let page: GwClientPage;

  beforeEach(() => {
    page = new GwClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
