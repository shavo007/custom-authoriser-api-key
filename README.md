# custom-authoriser-api-key

Showcase how to use a custom authoriser to  attach api key

This project uses [Serverless Node.js Starter](https://github.com/shavo007/serverless-nodejs-starter) that includes [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) plugin, [Babel](https://babeljs.io), and [Mocha](https://mochajs.org/). It supports:

- **ES7 syntax in your handler functions**
  - Use async/await
  - And much more!
- **Run API Gateway locally**
  - Use `yarn serve`
- **Support for unit tests**
  - Run `yarn test:unit` to run your tests
- **Sourcemaps for proper error messages**
  - Error message show the correct line numbers
  - Works in production with CloudWatch
- **Automatic support for multiple handler files**
  - No need to add a new entry to your `webpack.config.js`
- **Add environment variables for your stages**



## Install

* Yarn

1. `curl -o- -L https://yarnpkg.com/install.sh | bash`
2. `yarn bash completion` - https://github.com/dsifford/yarn-completion



```bash

# Install dependencies
yarn install
```



#### 3. Create your custom domain

```yaml
customDomain:
    domainName: shane.shanelee.xyz
    certificateName: '*.shanelee.xyz'
    basePath: ''
    stage: ${self:provider.stage}
    createRoute53Record: true
    endpointType: 'regional'

```

To create the custom domain

**Make sure and change the values to suit your needs**

`sls create_domain --stage dev`


### API Gateway-like local dev server

To spin up a local dev server that will more closely match the API Gateway endpoint/experience:

```bash
yarn serve
```


### Renovate

> Automated Dependency Updates

Renovate runs continuously to detect the latest available versions. And automagicaly creates PR on your github project with changelog and release notes.

For more info and how to authorise the github app check out [onboarding guide](https://renovateapp.com/docs/getting-started/configure-renovate)

## Deploy

Assuming you've already set up your default AWS credentials

`yarn deploy:dev` will deploy to "dev" environment.

## Expose API Key Source

After you've deployed, the output of the deploy script will give you the API endpoint
for your deployed function(s), and most importantly the **api key value**

Copy this value into the custom authoriser variable `usageIdentifierKey` located at [`./src/authoriser.js`](./src/authoriser.js)

**the Lambda authorizer Lambda function must also return an API key of the usage plan as the usageIdentifierKey property value**

Under the API Key Source section in the Settings pane for API Gateway console, choose `AUTHORIZER` from the drop-down list. Save changes and then you need to redeploy your service

```bash
yarn deploy:dev
```

The client can now call the API key-required methods without explicitly supplying any API key. The authorizer-returned API key is used automatically. So you should be able to test the deployed API via that URL.


```bash

$ curl -H 'Authorization: Bearer xxx' 'https://xyz.execute-api.us-east-1.amazonaws.com/dev/hello'
{"message":" Hello world Your function executed successfully! (with a delay)"}

```

See.. No API Key Needed!!

## Useful links
* https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html#api-gateway-api-usage-plans-overview

* https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html

* https://aws.amazon.com/about-aws/whats-new/2017/12/amazon-api-gateway-supports-api-keys-in-custom-authorizer-responses/
