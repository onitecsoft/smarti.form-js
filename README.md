# smarti.form.js

JQuery form: binding input controls to javascript object, client side validation, client and server side summary

Automatically initializes when page is loaded. If content was loaded within ajax request, call JQuery extension method `smarti()` on container: `$(container).smarti();`

[Download](https://raw.githubusercontent.com/onitecsoft/smarti.form.js/master/src/smarti.form.js)

<b>Dependencies:</b> [smarti.data.js](https://github.com/onitecsoft/smarti.data.js), [smarti.to.js](https://github.com/onitecsoft/smarti.to.js)

<b>Structure:</b>
```html
<... data-name="..." data-smarti="form" ...> <!--container-->
  ...
</...>
```
<b>Container html attribute reference:</b>

<table>
  <thead>
    <tr>
      <th>attribute</th>
      <th>description</th>
    </tr>
  </thead>
  <tr>
    <td><b>data-name</b></td>
    <td>Defines javascript instance name of type <code>smarti.form</code></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-smarti="form" data-name="form"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-data</b></td>
    <td>Define bound to form js object (global scope)</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var item = {...};
&lt;/script&gt;
&lt;div data-smarti="form" data-name="form" data-data="item"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-default-data</b></td>
    <td>Defines bound empty form js object (global scope)</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var item = {...};
  var defaultItem = {...};
&lt;/script&gt;
&lt;div data-smarti="form" data-name="form" data-data="item" data-default-data="defaultItem"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-error-class</b></td>
    <td>Defines CSS class that will be applied to every form element with failed validation</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-smarti="form" data-name="form" data-error-class="..."&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
</table>

<b>Inner elements html attribute reference:</b>

<table>
  <thead>
    <tr>
      <th>attribute</th>
      <th>description</th>
    </tr>
  </thead>
  <tr>
    <td><b>data-bind</b></td>
    <td>Defines bound js object property name to <code>value</code> property of HtmlElement</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;input data-bind="Email" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-prop</b></td>
    <td>Defines bound HtmlElement property name (should be set if it is other than <code>value</code>)</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;input type="checkbox" data-bind="Enabled" data-prop="checked" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-set-expr, data-get-expr</b></td>
    <td>Defines custom binding by js expression. <code>this</code> - current HtmlElement, <code>data</code> - js object bound to form</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  //jquery ui datepicker example
  $(function () { $("#dateInput").datepicker(); });
&lt;/script&gt;
&lt;input id="dateInput"
  data-set-expr="$(this).datepicker('setDate', data.Date)"
  data-get-expr="data.Date = $(this).datepicker('getDate')" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-set-method, data-get-method</b></td>
    <td>Defines custom binding by external js method. <code>this</code> - current HtmlElement, method argument - js object bound to form</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  $(function () { $("#dateInput").datepicker(); });
  var setDate = function (e) { $(this).datepicker('setDate', e.Date); }
  var getDate = function (e) { e.Date = $(this).datepicker('getDate'); }
&lt;/script&gt;
&lt;input id="dateInput" data-set-method="setDate" data-get-method="getDate" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-req-field</b></td>
    <td>Defines required property of js object bound to form. Can be multiple fields separated by <code>,</code>. When failed <code>data-error-class</code> will be applied to current element and <code>data-msg</code> with same value will be shown</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;input data-bind="Name" data-req-field="Name" /&gt;
&lt;input data-bind="Field1" data-req-field="Field1,Field2" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-req-rule</b></td>
    <td>Defines custom validation rule by external js method that returns <code>true</code> or <code>false</code>. <code>this</code> - current HtmlElement (useful when single rule applied for different inputs), method argument - js object bound to form (filled with form values right before validation). Multiple rules separated by <code>,</code> can be applied to single element</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var emailValidator = function (e) { return e.Email != ''; }
  var globalEmailValidator = function (e) { return this.value != ''; }
  var rule1 = function(e) { return ... }
  var rule2 = function(e) { return ... }
&lt;/script&gt;
&lt;input data-bind="Email" data-req-rule="emailValidator" /&gt;
&lt;input data-bind="SomeField" data-req-rule="rule1,rule2" /&gt;
&lt;!-- Email1 and Email2 are used as unique rule names for data-error-class and data-msg --&gt;
&lt;input data-bind="Email1" data-req-rule="Email1:globalEmailValidator" /&gt;
&lt;input data-bind="Email2" data-req-rule="Email2:globalEmailValidator" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-error-class</b></td>
    <td>Defines CSS class that will be applied to current element when validation fail</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;input data-bind="Name" data-req-field="Name" data-error-class="invalid2" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-msg</b></td>
    <td>Defines message to show when validator with same name will fail. Message can have multiple names separated by <code>,</code> in case if it belongs to multiple validators. By default all elements with <code>data-msg</code> attribute are hidden</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-msg="Email"&gt;Wrong email!&lt;/div&gt;
&lt;div data-msg="Firstname,Lastname"&gt;Required fields must be filled!&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-reset</b></td>
    <td>Defines reset button (click will execute form <code>load</code> method with default or empty js object)</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;input type="button" value="Reset" data-reset="true" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-save</b></td>
    <td>Defines save button. Attribute value represents url where form data will be submitted with ajax post request. Server response may represent an array of <code>data-msg</code> names to show validation error or success messages.</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;input type="button" value="Save" data-save="/Product/Save" /&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-callback</b></td>
    <td>Defines callback method after save request (is used with <code>data-save</code> attribute).</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var SaveCallback = function(data) { ... }
&lt;/script&gt;
&lt;input type="button" value="Save" data-save="/Product/Save" data-callback="SaveCallback" /&gt;
</pre>
    </td>
  </tr>
</table>

<b>API reference:</b>

<table>
  <thead>
    <tr>
      <th>member</th>
      <th>description</th>
    </tr>
  </thead>
  <tr>
    <td><code>object</code> <b>data</b></td>
    <td>Represents bound to form js object</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var data = form.data;
&lt;/script&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><code>object</code> <b>defaultData</b></td>
    <td>Represents bound empty form js object</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var defaultData = form.defaultData;
&lt;/script&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><code>string</code> <b>errorClass</b></td>
    <td>Represents common validation error CSS class</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var errorClass = form.errorClass;
&lt;/script&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><code>void</code> <b>load(data = null)</b></td>
    <td>Fills form with data if specified, otherwise <code>defaultData</code> or empty js object is used</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  form.load();
  var data = { ... };
  form.load(data);
&lt;/script&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><code>bool</code> <b>save(data = null)</b></td>
    <td>Updates data if specified with form values, otherwise form member <code>data</code> is used. Returns <code>true</code> if validation succeeds</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
var data = {};
var success = form.save(data);
//or
if(form.save()) data = form.data;
&lt;/script&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><code>void</code> <b>summary(ruleNames)</b></td>
    <td>Toggles visibility of elements with <code>data-msg</code> attribute and toggles <code>data-error-class</code> on elements with <code>data-req-field</code> and <code>data-req-rule</code> attributes. <code>ruleNames</code> is an array of failed validator names (Used to show server side validation result)</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  form.summary(['Name','Email','rule1',...]);
&lt;/script&gt;
</pre>
    </td>
  </tr>
</table>
