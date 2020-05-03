if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'main'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'main'.");
}var main = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var getCallableRef = Kotlin.getCallableRef;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var toString = Kotlin.toString;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Random = Kotlin.kotlin.random.Random;
  var random = Kotlin.kotlin.ranges.random_xmiyix$;
  var model;
  var view;
  var controller;
  function Controller(model, view) {
    this.model = model;
    this.view = view;
    println('Starting controller...');
    this.view.onRollButtonClicked_o14v8n$(getCallableRef('rollButtonClicked', function ($receiver) {
      return $receiver.rollButtonClicked_0(), Unit;
    }.bind(null, this)));
    this.view.onNumberBoxClicked_nnebrl$(getCallableRef('numberBoxClicked', function ($receiver, row, col) {
      return $receiver.numberBoxClicked_0(row, col), Unit;
    }.bind(null, this)));
    this.view.onPassClicked_o14v8n$(getCallableRef('passClicked', function ($receiver) {
      return $receiver.passClicked_0(), Unit;
    }.bind(null, this)));
    this.view.onViewClicked_o14v8n$(getCallableRef('viewClicked', function ($receiver) {
      return $receiver.viewClicked_0(), Unit;
    }.bind(null, this)));
    this.view.onDoneClicked_o14v8n$(getCallableRef('doneClicked', function ($receiver) {
      return $receiver.doneClicked_0(), Unit;
    }.bind(null, this)));
  }
  Controller.prototype.rollButtonClicked_0 = function () {
    this.model.rollDice();
    this.view.update_18d5vt$(this.model);
  };
  Controller.prototype.numberBoxClicked_0 = function (row, col) {
    if (this.model.checkIfNBValid_vux9f0$(row, col)) {
      this.model.numberBoxes.get_za3lpa$(row).get_za3lpa$(col).crossedOut = true;
      this.model.tallyXs();
      this.view.update_18d5vt$(this.model);
    }};
  Controller.prototype.passClicked_0 = function () {
    this.model.pass();
    this.view.update_18d5vt$(this.model);
  };
  Controller.prototype.viewClicked_0 = function () {
    this.model.changeView();
    this.view.update_18d5vt$(this.model);
  };
  Controller.prototype.doneClicked_0 = function () {
    this.model.changePlayers();
    this.view.update_18d5vt$(this.model);
  };
  Controller.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Controller',
    interfaces: []
  };
  function Model(rows, maxCol) {
    this.rows = rows;
    this.maxCol = maxCol;
    this.PLAYER1_0 = 0;
    this.PLAYER2_0 = 1;
    this.ROLL_PHASE_0 = 1;
    this.WHITE_DICE_PHASE_0 = 2;
    this.COLORED_DICE_PHASE_0 = 3;
    this.END_PHASE_0 = 4;
    this.wdice = mutableListOf([1, 2]);
    this.dice = mutableListOf([3, 4, 5, 6]);
    this.alrPassed = false;
    this.phase = 1;
    this.Xs = ArrayList_init();
    this.currentView = this.PLAYER1_0;
    this.players = ArrayList_init();
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    println('Starting model...');
    var numberBoxes1 = ArrayList_init();
    tmp$ = this.rows;
    for (var i = 0; i < tmp$; i++) {
      numberBoxes1.add_11rb$(ArrayList_init());
      tmp$_0 = this.maxCol;
      for (var j = 0; j < tmp$_0; j++) {
        numberBoxes1.get_za3lpa$(i).add_11rb$(new NumberBox());
        if (j === (this.maxCol - 1 | 0)) {
          numberBoxes1.get_za3lpa$(i).get_za3lpa$(j).lockBox = true;
        }}
    }
    var numberBoxes2 = ArrayList_init();
    tmp$_1 = this.rows;
    for (var i_0 = 0; i_0 < tmp$_1; i_0++) {
      numberBoxes2.add_11rb$(ArrayList_init());
      tmp$_2 = this.maxCol;
      for (var j_0 = 0; j_0 < tmp$_2; j_0++) {
        numberBoxes2.get_za3lpa$(i_0).add_11rb$(new NumberBox());
        if (j_0 === (this.maxCol - 1 | 0)) {
          numberBoxes2.get_za3lpa$(i_0).get_za3lpa$(j_0).lockBox = true;
        }}
    }
    this.players.add_11rb$(new Player(this.rows, this.PLAYER1_0, numberBoxes1));
    this.players.add_11rb$(new Player(this.rows, this.PLAYER2_0, numberBoxes2));
    tmp$_3 = this.rows;
    for (var i_1 = 0; i_1 < tmp$_3; i_1++) {
      this.Xs.add_11rb$(0);
    }
    this.currentPlayer = this.players.get_za3lpa$(this.PLAYER1_0);
    this.numberBoxes = this.currentPlayer.numberBoxes;
    this.totals = this.currentPlayer.totals;
    this.total = this.currentPlayer.total;
    this.penalty = this.currentPlayer.penalty;
    this.otherHasGone = false;
  }
  Model.prototype.changeView = function () {
    if (this.currentView === this.PLAYER1_0) {
      this.players.get_za3lpa$(0).total = this.total;
      this.players.get_za3lpa$(0).totals = this.totals;
      this.players.get_za3lpa$(0).penalty = this.penalty;
      this.currentView = this.PLAYER2_0;
    } else if (this.currentView === this.PLAYER2_0) {
      this.players.get_za3lpa$(1).total = this.total;
      this.players.get_za3lpa$(1).totals = this.totals;
      this.players.get_za3lpa$(1).penalty = this.penalty;
      this.currentView = this.PLAYER1_0;
    }this.numberBoxes = this.players.get_za3lpa$(this.currentView).numberBoxes;
    this.totals = this.players.get_za3lpa$(this.currentView).totals;
    this.total = this.players.get_za3lpa$(this.currentView).total;
    this.penalty = this.players.get_za3lpa$(this.currentView).penalty;
  };
  Model.prototype.changePlayers = function () {
    if (this.phase === this.ROLL_PHASE_0 || !this.otherHasGone) {
      return;
    }if (this.phase === this.WHITE_DICE_PHASE_0 || (this.phase === this.COLORED_DICE_PHASE_0 && this.alrPassed)) {
      this.penalty = this.penalty - 5 | 0;
    }if (this.currentPlayer.num === this.PLAYER1_0) {
      this.currentPlayer = this.players.get_za3lpa$(this.PLAYER2_0);
    } else if (this.currentPlayer.num === this.PLAYER2_0) {
      this.currentPlayer = this.players.get_za3lpa$(this.PLAYER1_0);
    }this.Xs = this.clearArray_0(this.Xs);
    this.otherHasGone = false;
    this.alrPassed = false;
    this.phase = this.ROLL_PHASE_0;
    if (this.currentView !== this.currentPlayer.num) {
      this.changeView();
    }};
  Model.prototype.rollDice = function () {
    if (this.currentPlayer.num !== this.currentView || this.phase !== this.ROLL_PHASE_0) {
      return;
    }var range = new IntRange(1, 6);
    this.wdice = mutableListOf([random(range, Random.Default), random(range, Random.Default)]);
    this.dice = mutableListOf([random(range, Random.Default), random(range, Random.Default), random(range, Random.Default), random(range, Random.Default)]);
    this.phase = this.WHITE_DICE_PHASE_0;
  };
  Model.prototype.pass = function () {
    if (this.currentPlayer.num !== this.currentView || this.phase === this.END_PHASE_0) {
      return;
    }if (this.alrPassed) {
      this.penalty = this.penalty - 5 | 0;
      this.phase = this.END_PHASE_0;
    } else if (this.phase === this.WHITE_DICE_PHASE_0) {
      this.phase = this.COLORED_DICE_PHASE_0;
      this.alrPassed = true;
    } else if (this.phase === this.COLORED_DICE_PHASE_0) {
      this.phase = this.END_PHASE_0;
    }};
  Model.prototype.checkIfNBValidOther_qt1dr2$ = function (col, foundCol, foundVal) {
    if (this.otherHasGone || foundCol >= col || (this.wdice.get_za3lpa$(0) + this.wdice.get_za3lpa$(1) | 0) !== foundVal) {
      return false;
    }this.otherHasGone = true;
    return true;
  };
  Model.prototype.checkIfNBValid_vux9f0$ = function (row, col) {
    println('row ' + toString(row) + ' col ' + toString(col));
    var foundCol = this.findCol_za3lpa$(row);
    var foundVal = this.findValue_vux9f0$(row, col);
    if (this.currentPlayer.num !== this.currentView) {
      return this.checkIfNBValidOther_qt1dr2$(col, foundCol, foundVal);
    }if (this.players.get_za3lpa$(this.PLAYER1_0).numberBoxes.get_za3lpa$(row).get_za3lpa$(this.maxCol - 1 | 0).crossedOut || this.players.get_za3lpa$(this.PLAYER2_0).numberBoxes.get_za3lpa$(row).get_za3lpa$(this.maxCol - 1 | 0).crossedOut) {
      return false;
    }if (col === (this.maxCol - 1 | 0)) {
      if (this.Xs.get_za3lpa$(row) >= 5) {
        return true;
      }}if (this.phase === this.WHITE_DICE_PHASE_0) {
      if (foundCol >= col || (this.wdice.get_za3lpa$(0) + this.wdice.get_za3lpa$(1) | 0) !== foundVal) {
        return false;
      }this.phase = this.COLORED_DICE_PHASE_0;
      return true;
    } else if (this.phase === this.COLORED_DICE_PHASE_0) {
      if (foundCol >= col || ((this.wdice.get_za3lpa$(0) + this.dice.get_za3lpa$(row) | 0) !== foundVal && (this.wdice.get_za3lpa$(1) + this.dice.get_za3lpa$(row) | 0) !== foundVal)) {
        return false;
      }this.phase = this.END_PHASE_0;
      return true;
    }return false;
  };
  Model.prototype.findCol_za3lpa$ = function (row) {
    var tmp$;
    var foundCol = -1;
    tmp$ = this.numberBoxes.get_za3lpa$(row).size;
    for (var i = 0; i < tmp$; i++) {
      if (this.numberBoxes.get_za3lpa$(row).get_za3lpa$(i).crossedOut) {
        foundCol = i;
      }}
    return foundCol;
  };
  Model.prototype.tallyXs = function () {
    var tmp$, tmp$_0;
    this.total = 0;
    this.Xs = this.clearArray_0(this.Xs);
    this.totals = this.clearArray_0(this.totals);
    tmp$ = this.numberBoxes.size;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.numberBoxes.get_za3lpa$(i).size;
      for (var j = 0; j < tmp$_0; j++) {
        if (this.numberBoxes.get_za3lpa$(i).get_za3lpa$(j).crossedOut) {
          this.Xs.set_wxm5ur$(i, this.Xs.get_za3lpa$(i) + 1 | 0);
          var value = this.findValue_vux9f0$(i, j);
          this.totals.set_wxm5ur$(i, this.totals.get_za3lpa$(i) + value | 0);
          this.total = this.total + value | 0;
        }}
    }
  };
  Model.prototype.findValue_vux9f0$ = function (row, col) {
    var firstHalf = col + 2 | 0;
    var secHalf = this.maxCol - col | 0;
    if (row < (this.rows / 2 | 0)) {
      return firstHalf;
    } else {
      return secHalf;
    }
  };
  Model.prototype.clearArray_0 = function (array) {
    var tmp$;
    tmp$ = array.size;
    for (var i = 0; i < tmp$; i++) {
      array.get_za3lpa$(i);
    }
    return array;
  };
  Model.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Model',
    interfaces: []
  };
  function NumberBox() {
    this.crossedOut = false;
    this.lockBox = false;
  }
  NumberBox.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NumberBox',
    interfaces: []
  };
  function Player(numRows, num, numberBoxes) {
    this.num = num;
    this.numberBoxes = numberBoxes;
    this.total = 0;
    this.penalty = 0;
    this.totals = ArrayList_init();
    for (var i = 0; i < numRows; i++) {
      this.totals.add_11rb$(0);
    }
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function View(row, col) {
    this.row = row;
    this.col = col;
    println('Starting view...');
  }
  View.prototype.onRollButtonClicked_o14v8n$ = function (callback) {
    this.addEventListener_a4mwiz$('roll', callback);
  };
  function View$onNumberBoxClicked$lambda(closure$callback, closure$i, closure$j) {
    return function (it) {
      closure$callback(closure$i, closure$j);
      return Unit;
    };
  }
  View.prototype.onNumberBoxClicked_nnebrl$ = function (callback) {
    var tmp$, tmp$_0;
    tmp$ = this.row;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.col;
      for (var j = 0; j < tmp$_0; j++) {
        var element = document.getElementById('nB' + i.toString() + '-' + j.toString());
        if (element == null) {
          continue;
        }element.addEventListener('click', View$onNumberBoxClicked$lambda(callback, i, j));
      }
    }
  };
  View.prototype.onPassClicked_o14v8n$ = function (callback) {
    this.addEventListener_a4mwiz$('pass', callback);
  };
  View.prototype.onViewClicked_o14v8n$ = function (callback) {
    this.addEventListener_a4mwiz$('view', callback);
  };
  View.prototype.onDoneClicked_o14v8n$ = function (callback) {
    this.addEventListener_a4mwiz$('done', callback);
  };
  function View$addEventListener$lambda(closure$callback) {
    return function (it) {
      closure$callback();
      return Unit;
    };
  }
  View.prototype.addEventListener_a4mwiz$ = function (elementID, callback) {
    var element = document.getElementById(elementID);
    if (element == null) {
      return;
    }element.addEventListener('click', View$addEventListener$lambda(callback));
  };
  View.prototype.update_18d5vt$ = function (model) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    println('view.update');
    tmp$ = model.wdice.size;
    for (var i = 0; i < tmp$; i++) {
      this.setInnerHTML_puj7f4$('die-w' + i.toString(), model.wdice.get_za3lpa$(i).toString());
    }
    tmp$_0 = model.dice.size;
    for (var i_0 = 0; i_0 < tmp$_0; i_0++) {
      this.setInnerHTML_puj7f4$('die-' + i_0.toString(), model.dice.get_za3lpa$(i_0).toString());
    }
    tmp$_1 = model.totals.size;
    for (var i_1 = 0; i_1 < tmp$_1; i_1++) {
      this.setInnerHTML_puj7f4$(i_1.toString() + '-Tot', model.totals.get_za3lpa$(i_1).toString());
    }
    this.setInnerHTML_puj7f4$('0-wTot', model.penalty.toString());
    this.setInnerHTML_puj7f4$('1-wTot', model.total.toString());
    this.setInnerHTML_puj7f4$('curPlayer', (model.currentPlayer.num + 1 | 0).toString());
    this.setInnerHTML_puj7f4$('curView', (model.currentView + 1 | 0).toString());
    println(model.currentView);
    tmp$_2 = model.numberBoxes.size;
    for (var i_2 = 0; i_2 < tmp$_2; i_2++) {
      tmp$_3 = model.numberBoxes.get_za3lpa$(i_2).size;
      for (var j = 0; j < tmp$_3; j++) {
        if (model.numberBoxes.get_za3lpa$(i_2).get_za3lpa$(j).crossedOut === true) {
          this.setInnerHTML_puj7f4$('nB' + i_2.toString() + '-' + j.toString(), 'X');
        } else if (model.numberBoxes.get_za3lpa$(i_2).get_za3lpa$(j).lockBox === true) {
          this.setInnerHTML_puj7f4$('nB' + i_2.toString() + '-' + j.toString(), '&#128274');
        } else {
          this.setInnerHTML_puj7f4$('nB' + i_2.toString() + '-' + j.toString(), model.findValue_vux9f0$(i_2, j).toString());
        }
      }
    }
  };
  View.prototype.setInnerHTML_puj7f4$ = function (elementID, html) {
    var element = document.getElementById(elementID);
    if (element == null) {
      return;
    }element.innerHTML = html;
  };
  View.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'View',
    interfaces: []
  };
  Object.defineProperty(_, 'model', {
    get: function () {
      return model;
    }
  });
  Object.defineProperty(_, 'view', {
    get: function () {
      return view;
    }
  });
  Object.defineProperty(_, 'controller', {
    get: function () {
      return controller;
    }
  });
  _.Controller = Controller;
  _.Model = Model;
  _.NumberBox = NumberBox;
  _.Player = Player;
  _.View = View;
  model = new Model(4, 12);
  view = new View(4, 12);
  controller = new Controller(model, view);
  Kotlin.defineModule('main', _);
  return _;
}(typeof main === 'undefined' ? {} : main, kotlin);
