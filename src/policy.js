import logger from './logger';

class Policy {
  constructor(effect, resource) {
    this.effect = effect;
    this.resource = resource;
  }

  buildPolicyDocument() {
    /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
    const apiOptions = {};
    const tmp = this.resource.split(':');
    const apiGatewayArnTmp = tmp[5].split('/');
    const awsAccountId = tmp[4];
    apiOptions.region = tmp[3];
    apiOptions.restApiId = apiGatewayArnTmp[0];
    apiOptions.stage = apiGatewayArnTmp[1];

    const resourceArn = `arn:aws:execute-api:${
      apiOptions.region
    }:${awsAccountId}:${apiOptions.restApiId}/${apiOptions.stage}/*`;

    logger.info(`resource arn for authoriser policy is: ${resourceArn}`);

    const policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = this.effect;
    statementOne.Resource = resourceArn;
    policyDocument.Statement[0] = statementOne;
    logger.info(`policy document is:`, policyDocument);
    return policyDocument;
  }
}

export default Policy;
