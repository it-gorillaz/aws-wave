# aws-wave
AWS Lambda Microframework

## About AWS Wave
AWS Wave is a microframework that makes it easier to develop rest api's using AWS Lambda Functions and API Gateway. It attempts to make the develpment faster by easing common tasks, such as:

 - Exception handling
 - Request body deserialization
 - Response body serialization
 - Request validation
 
## Lambda Proxy Integration

In order to use AWS Wave all methods defined in the API Gateway must use Request Integration Type:```LAMBDA_PROXY```.

A detailed documentation can be found [here](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html).

## Getting Started

### Instalation

```
npm install aws-wave
```

### Handling Requests

The AWS Wave microframework provides an abstract class called AbstratRequestHandler that handles a Lambda execution call and perform some operations such as request body deserialization, request validation, response body serialization and exception handling.

```javascript
const AbstractRequestHandler = require('aws-wave').AbstractRequestHandler;

class PostUserHandler extends AbstractRequestHandler {
    
    before(event, context) {
      // perform anything before the execution
      this.cors('*');
    }
        
    execute(body, context) {
      return { message: 'Hello from aws-wave' };
    }
}

exports.handler = (event, context, callback) => {
  const handler = new PostUserHandler();
  handler.handleRequest(event, context, callback);
}
```

### The Request / Response Attributes
The AbstractRequestHandler class provides methods to access all the request / response attributes and the Lambda environment context as well:

 Attribute                           |                 Method
 -------------------------------- | -----------------------------------------------------
 Request Headers          | getRequestHeader("headerName")
 Response Headers     | addResponseHeader("headerName")
 Raw Request Body     | getRawRequestBody()
 Http Method              | getHttpMethod()
 Resource Path        | getPath()
 Stage Variables          | getStageVariable("stageVariableName")
 Path Parameters          | getPathParameter("parameterName")
 Query String Parameters | getQueryStringParameter("parameterName")
 Request Context Parameter | getRequestContextParameter("parameterName")
 
### Request Validation
AWS Wave uses [Joi](https://github.com/hapijs/joi) to validate requests.
To validate the incoming request a schema should be defined in the class constructor

Eg.:
```javascript
const Joi = require('joi');
const AbstractRequestHandler = require('aws-wave').AbstractRequestHandler;

const schema = Joi.object().keys({
  code: Joi.string().required()  
});

class PhoneConfirmationHandler extends AbstractRequestHandler {
    
    constructor() {
      super(schema);
    }
    
    before(event, context) {     
      this.cors('*');
    }
        
    execute(body, context) {
      return { message: 'The request body is valid!' };
    }
}

exports.handler = (event, context, callback) => {
  const handler = new PhoneConfirmationHandler();
  handler.handleRequest(event, context, callback);
}
```

If any constraint violation occurs an UnprocessableEntityException will be thrown and the http response will be serialized with the error details.


Eg.:
```sh
curl -X POST http://my-api-gateway-resource/phone-confirmations -d '{"invalidParam": "value"}'
```
I this particular example the server will respond the above request with a http status code 422 and the following response body:
```json
{
  "message": "Unprocessable entity",
  "errors": [
    {
      "message": "\"code\" is required",
      "path": "code",
      "type": "any.required",
      "context": {
         "key": "code"
      }
    }
  ]
}
```
A detailed documentation of Joi validations can be found [here](https://github.com/hapijs/joi/blob/v10.6.0/API.md).


If you want to provide your own request body validation mechanism, the method *resolveRequestBodyValidator* should be overridden:

```javascript
const Wave = require('aws-wave');

const RequestBodyValidator         = Wave.RequestBodyValidator;
const UnprocessableEntityException = Wave.UnprocessableEntityException;

class MyCustomValidator extends RequestBodyValidator {
  
  validate(entity, schema) {
    // custom validation here
    // should throw a HttpException if any constraint is violated
    throw new UnprocessableEntityException({message: 'Invalid request body'});
  }
  
}

module.exports = MyCustomValidator;
```

```javascript
const MyCustomValidator = require('my-custom-validator');
const AbstractRequestHandler = require('aws-wave').AbstractRequestHandler;

const myCustomSchema = {};

class MyHandler extends AbstractRequestHandler {
    
    constructor() {
      super(myCustomSchema);
    }
    
    before(event, context) {      
      this.cors('*');
    }
        
    execute(body, context) {
      return { message: 'The request body is valid!' };
    }
    
    resolveRequestBodyValidator() {
      return new MyCustomValidator();
    }
}

exports.handler = (event, context, callback) => {
  const handler = new MyHandler();
  handler.handleRequest(event, context, callback);
}
```

### Serialization and Deserialization
The current version of AWS Wave supports only JSON serialization/deserialization.

The deserialization and serialization strategies are based on two http headers:

 - **Content-Type** for deserialization
 - **Accept** for serialization

If you want to provide your own request body deserializer, the method *resolveRequestBodyDeserializer* should be overridden:
```javascript
const Wave = require('aws-wave');

const BadRequestException             = Wave.BadRequestException;
const RequestBodyDeserializerStrategy = Wave.RequestBodyDeserializerStrategy;

class MyCustomDeserializer extends RequestBodyDeserializerStrategy {
  
  deserialize(body) {
    // custom deserialization here
    // should throw a HttpException if any error occur
    throw new BadRequestException({message: 'Invalid request body'});
  }
  
}

module.exports = MyCustomDeserializer;
```

If you want to provide your own response body serializer, the method *resolveResponseBodySerializer* should be overridden:
```javascript
const Wave = require('aws-wave');

const InternalServerErrorException    = Wave.InternalServerErrorException;
const RequestBodyDeserializerStrategy = Wave.ResponseBodySerializerStrategy;

class MyCustomSerializer extends ResponseBodySerializerStrategy {
  
  serialize(entity) {
    // custom serialization here
    // should throw a HttpException if any error occur
    throw new InternalServerErrorException({message: 'Unable to serialize the response body'});
  }
  
}

module.exports = MyCustomSerializer;
```

### Exception Handling
AWS Wave offers a built in exception handler, any HttpException will be serialized as response body and any exception not handled will be serialized as an Internal Server Error.

E.g.:

```javascript
const Wave = require('aws-wave');

const AbstractRequestHandler = Wave.AbstractRequestHandler;
const UnauthorizedException  = Wave.UnauthorizedException;

class PostUserHandler extends AbstractRequestHandler {
    
    before(event, context) {      
      this.cors('*');
    }
        
    execute(body, context) {
      // any validation
      if (body.hasPermission)
        throw new UnauthorizedException({'The user has no permission'});
        
      return { message: 'The user has permission'};
    }
}

exports.handler = (event, context, callback) => {
  const handler = new PostUserHandler();
  handler.handleRequest(event, context, callback);
}
```

## License
The AWS Wave microframework is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT) .
