import { MyReportsOnlyPipe } from './my-reports-only.pipe';

describe('MyReportsOnlyPipe', () => {
  it('create an instance', () => {
    const pipe = new MyReportsOnlyPipe();
    expect(pipe).toBeTruthy();
  });
});
