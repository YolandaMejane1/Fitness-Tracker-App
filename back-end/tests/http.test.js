import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'x'.repeat(40);
process.env.MONGO_URI = 'mongodb://127.0.0.1:1/none';
const { default: app } = await import('../app.js');

let server;
let base;
test.before(async () => {
  await new Promise((r) => { server = app.listen(0, r); });
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

const call = (path, opts = {}) =>
  fetch(base + path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

test('health check', async () => {
  const res = await call('/');
  assert.equal(res.status, 200);
});

test('Mongo unavailable gives a clean 500, not a crash', async () => {
  const res = await call('/api/auth/login', { method: 'POST', body: { email: 'a@b.com', password: 'secret123' } });
  assert.equal(res.status, 500);
});

test('auth middleware rejects missing, garbage, expired and wrongly-signed tokens', async () => {
  // These routes need Mongo connected first, so an unreachable DB returns 500;
  // the auth middleware itself is tested directly below.
  const { default: auth } = await import('../middleware/authMiddleware.js');
  const run = (headers) => new Promise((resolve) => {
    const res = { status(c) { this.code = c; return this; }, json() { resolve(this.code); } };
    auth({ header: (n) => headers[n] }, res, () => resolve('next'));
  });
  assert.equal(await run({}), 401);
  assert.equal(await run({ Authorization: 'Bearer garbage' }), 401);
  const expired = jwt.sign({ userId: '1' }, process.env.JWT_SECRET, { expiresIn: -10 });
  assert.equal(await run({ Authorization: `Bearer ${expired}` }), 401);
  const wrongKey = jwt.sign({ userId: '1' }, 'another-secret-another-secret-123456');
  assert.equal(await run({ Authorization: `Bearer ${wrongKey}` }), 401);
  const ok = jwt.sign({ userId: '1' }, process.env.JWT_SECRET);
  assert.equal(await run({ Authorization: `Bearer ${ok}` }), 'next');
});
