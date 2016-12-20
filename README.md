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
    <td>Defines js object to be bound to input controls (global scope)</td>
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
    <td>Defines js object of default item in case of reset form (global scope)</td>
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
    <td>Defines CSS class to be applied to any element with failed validation</td>
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
    <td>Defines js expression for custom input control</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">

</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-set-method, data-get-method</b></td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">

</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-req-field</b></td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">

</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-req-rule</b></td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">

</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-error-class</b></td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">

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
