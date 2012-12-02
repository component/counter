/**
 * Module dependencies.
 */

var domify = require('domify')
  , digit = require('./digit');

/**
 * Expose `Counter`.
 */

module.exports = Counter;

/**
 * Initialize a new `Counter`.
 *
 * @api public
 */

function Counter() {
  this.el = domify('<div class="counter"></div>')[0];
  this._digits = [];
  this.n = 0;
  this.digits(2);
}

/**
 * Set the total number of digits to `n`.
 *
 * @param {Number} n
 * @return {Counter}
 * @api public
 */

Counter.prototype.digits = function(n){
  this.total = n;
  this.ensureDigits(n);
  return this;
};

/**
 * Add a digit element.
 *
 * @api private
 */

Counter.prototype.addDigit = function(){
  var el = domify(digit)[0];
  this._digits.push(el);
  this.el.appendChild(el);
};

/**
 * Ensure at least `n` digits are available.
 *
 * @param {Number} n
 * @api private
 */

Counter.prototype.ensureDigits = function(n){
  while (this._digits.length < n) {
    this.addDigit();
  }
};

/**
 * Update digit `i` with `val`.
 *
 * @param {Number} i
 * @param {String} val
 * @api private
 */

Counter.prototype.updateDigit = function(i, val){
  var el = this._digits[i];
  var n = parseInt(val, 10) + 1;
  if (n > 9) n = 0;

  var curr = el.querySelector('.counter-top span').textContent;
  el.querySelector('.counter-next span').textContent = n;
  el.querySelector('.counter-top span').textContent = val;
  el.querySelector('.counter-bottom span').textContent = val;

  if (val == curr) return;
  el.classList.add('flip');
  setTimeout(function(){
    el.classList.remove('flip');
  }, 200);
};

/**
 * Update count to `n`.
 *
 * @param {Number} n
 * @return {Counter}
 * @api public
 */

Counter.prototype.update = function(n){
  this.n = n;
  var str = n.toString();
  var len = str.length;
  var digits = Math.max(len, this.total);

  this.ensureDigits(len);
  for (var i = 0; i < len; ++i) {
    this.updateDigit(digits - i - 1, str[len - i - 1]);
  }

  return this;
};
