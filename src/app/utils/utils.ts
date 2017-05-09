import {environment} from '../../environments/environment';
export function selectByEnv(prod, dev) {
  return environment.production ? prod : dev;
}