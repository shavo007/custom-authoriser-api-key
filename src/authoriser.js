import logger from './logger';
import Policy from './policy';

const authoriser = async (event, context, callback) => {
  logger.info(`request params ${JSON.stringify(event)}`);
  logger.info(`Method ARN: ${event.methodArn}`);

  const policy = new Policy('Allow', event.methodArn);

  const doc = {
    principalId: 'yyyyyy',
    policyDocument: policy.buildPolicyDocument(),
    usageIdentifierKey: 'cUNsYiLHtr5fDtKXKU3aqaKd8TvMKR8Fa6dtYfDk',
  };
  logger.info('doc is ', doc);

  callback(null, doc);
};

export default authoriser;
