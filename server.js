const path = require('path');
const express = require('express');
const { spawn } = require('child_process');

require('dotenv').config();

const app = express();
const port = Number(process.env.PORT || 3005);
const rootDir = __dirname;
const schemaPath = path.join(rootDir, 'prisma', 'schema.prisma');
const prismaCliPath = path.join(rootDir, 'node_modules', 'prisma', 'build', 'index.js');

app.use(express.json());
app.use(express.static(path.join(rootDir, 'public')));

function runPrisma(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [prismaCliPath, ...args], {
      cwd: rootDir,
      env: process.env,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (err) => reject(err));

    child.on('close', (code) => {
      if (code !== 0) {
        const error = new Error(`Prisma command failed with exit code ${code}.`);
        error.code = code;
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
        return;
      }

      resolve({ stdout, stderr });
    });
  });
}

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, hasDatabaseUrl: Boolean(process.env.DATABASE_URL) });
});

app.get('/api/status', async (req, res) => {
  try {
    const result = await runPrisma(['migrate', 'status', '--schema', schemaPath]);
    const raw = (result.stdout || result.stderr || '').trim();
    res.json({ ok: true, result: { raw } });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message,
      stdout: err.stdout,
      stderr: err.stderr,
    });
  }
});

app.post('/api/deploy', async (req, res) => {
  try {
    const result = await runPrisma(['migrate', 'deploy', '--schema', schemaPath]);
    res.json({ ok: true, stdout: result.stdout, stderr: result.stderr });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message,
      stdout: err.stdout,
      stderr: err.stderr,
    });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Krebsfer migration runner listening on port ${port}`);
});
