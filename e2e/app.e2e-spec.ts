import { S4rbTestPage } from './app.po';

describe('s4rb-test App', function() {
  let page: S4rbTestPage;

  beforeEach(() => {
    page = new S4rbTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
