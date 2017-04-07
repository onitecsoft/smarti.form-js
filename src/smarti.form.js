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
		that._bind(that.container.find('[data-bind],[data-prop],[data-set]'), that.data, 'set');
		that.summary();
	}
	this.sync = function (data) {
		var obj = that.data || $.extend({}, that.defaultData);
		var elems = that.container.find('[data-bind],[data-prop],[data-set],[data-get]');
		that._bind(elems, obj, 'get');
		if (data) $.extend(obj, data);
		that._bind(elems, obj, 'set');
	}
	this.save = function (data) {
		var f = [], e = [];
		var obj = data || that.data;
		if (!obj) {
			that.data = $.extend({}, that.defaultData);
			obj = that.data;
		}
		that._bind(that.container.find('[data-bind],[data-prop],[data-get]'), obj, 'get');
		that.container.find('[data-req-field],[data-req-rule]').each(function () {
			var d = $(this).data();
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
	this._bind = function(elems, data, action) {
		var b = [];
		elems.each(function() {
			var d = $(this).data();
			if (d.bind) {
				var g = smarti.data.getter(d.bind);
				if (action == 'get' && b.indexOf(d.bind) == -1) {
					b.push(d.bind);
					g(data, null);
				}
				that['_' + action](this, d.prop, g, data);
			}
			if (d[action]) {
				var mf = smarti.data.get(d[action], smarti.scope);
				if (mf) mf.call(this, data, d.bind);
				else new Function("data", d[action]).call(this, data);
			}
		});
	}
	this._set = function (e, prop, g, data) {
		var v = g(data);
		if (e.type == 'checkbox' || e.type == 'radio') {
			prop = 'checked';
			var ev = e.value == null || e.value == 'on' ? true : e.value;
			v = smarti.data.filter([].concat(v), function(r) { return r == ev }).length > 0;
		}
		if (e.type == 'select-multiple') that._msv(e, v);
		else e[prop || 'value'] = v != null ? v : '';
	}
	this._get = function (e, prop, g, data) {
		if (e.type == 'checkbox' || e.type == 'radio') {
			if (e.value == null || e.value == 'on') prop = 'checked';
			else if (!e.checked) return;
		}
		var v = g(data);
		var ev = e.type == 'select-multiple' ? that._msv(e) : e[prop || 'value'];
		g(data, v == null ? ev : [].concat(v, ev));
	}
	this._msv = function(e) {
		var r = [];
		var v = arguments.length > 1 ? [].concat(arguments[1]) : null;
		for (var i = 0; i < e.options.length; i++) {
			if (v != null) e.options[i].selected = smarti.data.filter(v, function(r) { return r == e.options[i].value }).length > 0;
			if (e.options[i].selected) r.push(e.options[i].value);
		}
		return r;
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
	if (this.data) $(function() { that.load(smarti.data.get(that.data, smarti.scope)); });
	if (this.defaultData) this.defaultData = smarti.data.get(this.defaultData, smarti.scope);
	return this;
}
