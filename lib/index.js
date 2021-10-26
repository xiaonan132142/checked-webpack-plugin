const fs = require('fs');
const readline = require('readline');

const pluginName = 'checked-webpack-plugin';
const DEFAULT_OPTIONS = {
  resultPath: '',
};

class  CheckedWebpackPlugin {
  constructor(options) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync(pluginName, (params, callback) => {
      if (fs.existsSync(this.options.resultPath)) {
        const filePath = this.options.resultPath;
        const errmsg = `${pluginName}:${filePath}`;
        const rl = readline.createInterface({
          input: fs.createReadStream(filePath),
        });
        rl.on('line', (line) => {
          if (!line) {
            throw new Error(`${errmsg} 文件为空`);
          }
          const result = line.split(':')[1] * 1;
          if (result < 100) {
            throw new Error(`${errmsg} not checked`);
          }
        });
        return callback();
      }
      throw new Error(`${errmsg} not found`);
    });
  }
}
module.exports = CheckedWebpackPlugin;
