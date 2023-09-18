import path from 'path';

export function isDevFn(mode) {
  return mode === 'development';
}

export function isProdFn(mode) {
  return mode === 'production';
}

export function isTestFn(mode) {
  return mode === 'test';
}

/**
 * 读取所有要处理的环境变量配置文件.env
 */
export function isReportMode() {
  return process.env.VITE_REPORT === 'true';
}

// 读取所有要处理的环境变量配置文件.env
export function wrapperEnv(envConf) {
  const ret = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName =
      realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') realName = Number(realName);
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    ret[envName] = realName;
  }
  return ret;
}

/**
 * 获取用户根目录
 * @param dir file path
 */
export function getRootPath(...dir) {
  return path.resolve(process.cwd(), ...dir);
}
