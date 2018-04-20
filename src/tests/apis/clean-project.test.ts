import * as process from 'process';

import test from 'ava';
import * as fs from 'fs-extra';

import * as clean from '../../apis/clean';

test.before(t => {
  fs.copySync('data/tests/clean.yaml', 'clean-test/double.yaml');
  fs.createFileSync('clean-test/local1/geth/hi.txt');
  fs.createFileSync('clean-test/local2/geth/hi.txt');
  fs.createFileSync('clean-test/local2/other/hi.txt');
  fs.createFileSync('clean-test/local3/geth/hi.txt');
  fs.createFileSync('clean-test/remote/geth/hi.txt');
  process.chdir('clean-test');
});

test('should be able to clean project', t => {
  t.true(fs.existsSync('local1/geth/hi.txt'));
  t.true(fs.existsSync('local3/geth/hi.txt'));
  clean.cli();
  t.false(fs.existsSync('local1/geth/hi.txt'));
  t.false(fs.existsSync('local3/geth/hi.txt'));
  t.true(fs.existsSync('remote/geth/hi.txt'));
});

test.serial('should be able to clean environment', t => {
  t.true(fs.existsSync('local2/geth/hi.txt'));
  clean.cli('local2');
  t.false(fs.existsSync('local2/geth/hi.txt'));
  t.true(fs.existsSync('local2/other/hi.txt'));
  t.true(fs.existsSync('local3/geth/hi.txt'));
  t.true(fs.existsSync('remote/geth/hi.txt'));
});

test('cleaning invalid environment should fail', t => {
  t.throws(() => {
    clean.cli('local');
  });
});

test.after.always(t => {
  process.chdir('..');
  fs.removeSync('clean-test');
});