import {Environment} from '@city-sdk/environments';

export const isNonIntegratedEnvironment = (
  environment: Environment,
): boolean => {
  return (
    environment === Environment.Sbx ||
    environment === Environment.Fdv ||
    environment === Environment.Dev
  );
};

export const isFdv = (environment: Environment): boolean =>
  environment === Environment.Fdv;

export const isPre = (environment: Environment): boolean =>
  environment === Environment.Pre;

export const isPrd = (environment: Environment): boolean =>
  environment === Environment.Prd;

export const isPreOrPrd = (environment: Environment): boolean =>
  isPre(environment) || isPrd(environment);

export const isNotProd = (environment: Environment): boolean =>
  environment !== Environment.Prd;
