import calver from 'calver';
import { usage } from '.';
import type { Params } from '../types';

const message = (msg?: string): never => {
  console.error(usage);
  if (msg) {
    console.error(`[ERROR]: ${msg}`);
    process.exit(2); // ignore stack trace when exiting
  }
  process.exit(0); // ignore stack trace when exiting
};

const finalizeRelease = (version: string, buildId: string): string => {
  return buildId !== '' ? `${version}+${buildId}` : version;
};

const getNextRelease = ({
  modifier,
  release,
  identifier = '',
  format = 'yy.mm.dd.patch',
}: Params): string | never => {
  try {
    const nextVersion = calver.inc(format, `${release}`, modifier);
    return finalizeRelease(nextVersion, identifier);
  } catch (e) {
    return message(`${e.message}, ${release}`);
  }
};

export { getNextRelease, message };
