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
    <td>Defines javascript object to be bound to input controls (global scope)</td>
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
    <td>Defines javascript object of default item in case of reset form (global scope)</td>
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
</table>
