import test from 'ava';
import * as sinon from 'sinon';

import * as backend from '../../backend';
import * as ethereum from '../../backend/ethereum';

test('should be able to create genesis', t => {
  sinon.stub(ethereum, 'createGenesis');
  backend.createGenesis('ethereum', 'dir');
  t.truthy((ethereum.createGenesis as sinon.SinonStub).calledWithMatch('dir'));
});

test('should be able to create accounts', t => {
  sinon.stub(ethereum, 'createAccounts');
  backend.createAccounts('ethereum', 'dir', 'pw', 5);
  t.truthy((ethereum.createAccounts as sinon.SinonStub).calledWithMatch(
    'dir', 'pw', 5,
  ));
});

test('should be able to init project', t => {
  sinon.stub(ethereum, 'init');
  backend.init('ethereum', 'dir', 'back');
  t.truthy((ethereum.init as sinon.SinonStub).calledWithMatch('dir', 'back'));
});

test('should be able to clean project', t => {
  sinon.stub(ethereum, 'clean');
  backend.clean('ethereum', 'dir', 'back');
  t.truthy((ethereum.clean as sinon.SinonStub).calledWithMatch('dir', 'back'));
});

test('should be able to start local node', t => {
  sinon.stub(ethereum, 'start');
  backend.start('ethereum', 'dir', 'myproj', 'myenv',
                {datadir: '', host: '', port: 0});
  t.truthy((ethereum.start as sinon.SinonStub).calledWithMatch(
    'dir', 'myproj', 'myenv', {datadir: '', host: '', port: 0},
  ));
});

test('should throw error for invalid chain', t => {
  t.throws(() => {
    backend.createGenesis('invalid', '');
  });
  t.throws(() => {
    backend.createAccounts('invalid', '');
  });
  t.throws(() => {
    backend.init('invalid', '', '');
  });
  t.throws(() => {
    backend.clean('invalid', '', '');
  });
  t.throws(() => {
    backend.start('invalid', '', '', '', {datadir: '', host: '', port: 0});
  });
});
