# BigTime SDK

Browser and node module for making API requests against [BigTime SDK](https://iq.bigtime.net/BigtimeData/api/{version}).

**Please note: This module uses [Popsicle](https://github.com/blakeembrey/popsicle) to make API requests. Promises must be supported or polyfilled on all target environments.**

## Installation

```
npm install big-time-sdk --save
bower install big-time-sdk --save
```

## Usage

### Node

```javascript
var BigTimeSdk = require('big-time-sdk');

var client = new BigTimeSdk();
```

### Browsers

```html
<script src="big-time-sdk/index.js"></script>

<script>
  var client = new BigTimeSdk();
</script>
```

### Options

You can set options when you initialize a client or at any time with the `options` property. You may also override options for a single request by passing an object as the second argument of any request method. For example:

```javascript
var client = new BigTimeSdk({ ... });

client.options = { ... };

client.resource('/').get(null, {
  baseUri: 'http://example.com',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### Base URI

You can override the base URI by setting the `baseUri` property, or initializing a client with a base URI. For example:

```javascript
new BigTimeSdk({
  baseUri: 'https://example.com'
});
```

#### Base URI Parameters

If the base URI has parameters inline, you can set them by updating the `baseUriParameters` property. For example:

```javascript
client.options.baseUriParameters.version = 'v2';
```

### Resources

All methods return a HTTP request instance of [Popsicle](https://github.com/blakeembrey/popsicle), which allows the use of promises (and streaming in node).

#### resources.session

```js
var resource = client.resources.session;
```

##### POST

Create a session

```js
resource.post().then(function (res) { ... });
```

##### Body

**application/x-www-form-urlencoded**

{
  "userid": {
    "required": true,
    "type": "string",
    "displayName": "userid"
  },
  "pwd": {
    "required": true,
    "type": "string",
    "displayName": "pwd"
  }
}

#### resources.staff

```js
var resource = client.resources.staff;
```

##### GET

Get staff listing

```js
resource.get().then(function (res) { ... });
```

#### resources.staff.detail.staffId(staffId)

* **staffId** _string_

```js
var resource = client.resources.staff.detail.staffId(staffId);
```

##### GET

Get staff detail

```js
resource.get().then(function (res) { ... });
```

#### resources.time

```js
var resource = client.resources.time;
```

##### POST

Create a time entry

```js
resource.post().then(function (res) { ... });
```

##### Body

**application/x-www-form-urlencoded**

#### resources.time.Sheet.staffId(staffId)

* **staffId** _string_

```js
var resource = client.resources.time.Sheet.staffId(staffId);
```

##### GET

Get individual staff timesheets

```js
resource.get().then(function (res) { ... });
```

#### resources.time.TotalByDay.staffId(staffId)

* **staffId** _string_

```js
var resource = client.resources.time.TotalByDay.staffId(staffId);
```

##### GET

Get individual staff total by day

```js
resource.get().then(function (res) { ... });
```

#### resources.time.id(id)

* **id** _string_

```js
var resource = client.resources.time.id(id);
```

##### GET

Get individual time entry

```js
resource.get().then(function (res) { ... });
```

##### POST

Update a time entry

```js
resource.post().then(function (res) { ... });
```

##### Body

**application/x-www-form-urlencoded**

##### DELETE

Delete a time entry

```js
resource.delete().then(function (res) { ... });
```

##### Body

**application/x-www-form-urlencoded**



### Custom Resources

You can make requests to a custom path in the API using the `#resource(path)` method.

```javascript
client.resource('/example/path').get();
```

## License

Apache 2.0
