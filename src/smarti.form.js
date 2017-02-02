var smarti = this['smarti'] || { scope: this };

$(function () {
	if (!smarti.initialized) {
		smarti.initialized = true;
		$('[data-smarti]').smarti();
	}
});

$.fn.smarti = function () {
	$.each(this.selector == '[data-smarti]' ? this : this.find('[data-smarti]'), function () {
		var jq = $(this);
		var opts = jq.data();
		smarti.scope[opts.name] = new smarti[opts['smarti']](jq, opts);
	});
}

smarti.form = function (jq, opts) {
	var that = this;
	$.extend(that, opts);
	this.container = jq;
	this.load = function (data) {
		that.data = $.extend({}, data || that.defaultData);
		that.container.find('*').each(function () {
			that._bind('set', $(this).data(), this, that.data);
		});
		that.summary();
	}
	this.save = function (data) {
		var f = [], e = [];
		var obj = data || that.data;
		if (!obj) {
			that.data = $.extend({}, that.defaultData);
			obj = that.data;
		}
		that.container.find('*').each(function () {
			var d = $(this).data();
			that._bind('get', d, this, obj);
			if (d.reqField) {
				var r = d.reqField.split(',');
				for (var i = 0; i < r.length; i++) f.push(that._rule(r[i], null));
			}
			if (d.reqRule) {
				var r = d.reqRule.split(',');
				for (var i = 0; i < r.length; i++) f.push(that._rule(r[i], this));
			}
		});
		for (var i = 0, l = f.length; i < l; i++) { var v = f[i](obj); if (v) e.push(v); }
		that.summary(e);
		return e.length == 0;
	}
	this.summary = function (rules) {
		rules = [].concat(rules);
		that.container.find('[data-msg],[data-req-rule],[data-req-field]').each(function () {
			var d = $(this).data();
			if (d.msg) $(this).toggle(that._fail(d.msg, rules));
			else {
				var c = d.errorClass || that.errorClass;
				var rr = d.reqField && d.reqRule ? d.reqField + ',' + d.reqRule : d.reqField || d.reqRule;
				$(this).toggleClass(c, that._fail(rr, rules));
			}
		});
	}
	this._bind = function (gs, d, e, i) {
		if (d[gs + 'Expr']) new Function("data", d[gs + 'Expr']).call(e, i);
		else if (d[gs + 'Method']) smarti.data.get(d[gs + 'Method'], smarti.scope).call(e, i);
		else if (d.bind) {
			if (gs == 'set') {
				var v = smarti.data.get(d.bind, i);
				e[d.prop || 'value'] = v != null ? v : '';
			}
			else smarti.data.set(d.bind, i, e[d.prop || 'value']);
		}
	}
	this._rule = function (r, f) {
		r = this._sr(r);
		if (f) return function (e) { var g = smarti.data.get(r.r, smarti.scope); if (g && !g.call(f, e)) return r.k; };
		else return function (e) { var v = smarti.data.get(r.r, e); if (!v && v !== 0) return r.k; };
	}
	this._fail = function (r, a) {
		r = r.split(',');
		for (var i = 0; i < r.length; i++) { r[i] = this._sr(r[i]); if (a.indexOf(r[i].k) >= 0) return true; }
		return false;
	}
	this._sr = function (r) {
		var k = r;
		if (k.indexOf(':') >= 0) { r = r.split(':'); k = r[0]; r = r[1]; }
		return { k: k, r: r };
	}
	this.container.find('*').each(function () {
		var jq = $(this);
		var d = jq.data();
		if (d.msg) jq.hide();
		if (d.reset) jq.click(function () { that.load() });
		else if (d.save) jq.click(function () { if (that.save()) smarti.data.get(d.save, smarti.scope)(that.data); });
	});
	if (this.data) $(window).load(function () { that.load(smarti.data.get(that.data, smarti.scope)); });
	if (this.defaultData) this.defaultData = smarti.data.get(this.defaultData, smarti.scope);
	return this;
}
