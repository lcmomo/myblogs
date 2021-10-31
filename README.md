# myblogs

scripty 运行脚本，需要设置scripts文件夹可执行 chmod -R u+x scripts

### 添加eslint：

#### 安装依赖
```js
npm i eslint -D
npm i @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
npm i eslint-plugin-react -D
npm i eslint-config-alloy -D
npm i eslint-loader -D
```

 - 首先要安装 eslint，eslint 默认使用 Espree 进行解析，无法识别 ts 的一些语法，所以需要安装一个 ts 的解析器 @typescript-eslint/parser，用它来代替默认的解析器，然后由 @typescript-eslint/eslint-plugin 来提供有关 ts 的规则补充。
- 由于是 react 项目，所以还需要插件 eslint-plugin-react 来支持 .tsx。
- eslint 规则众多，且有些原生规则在 ts 中不兼容，推荐 alloy 的这套配置 eslint-config-alloy，它提供了 ts + react 的版本，并且不包含代码格式的部分，与 Prettier 完全兼容。
- 最后是提供给 webpack 的 eslint-loader，可以在使用 webpack-dev-server 开发中实时检查，越早发现错误越好解决。

#### 配置文件
```json
{
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint/eslint-plugin"
    ],
    "extends": [
        "alloy",
        "alloy/react",
        "alloy/typescript"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "env": {
        // 您的环境变量（包含多个预定义的全局变量）
        // Your environments (which contains several predefined global variables)
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    "globals": {
        // 您的全局变量（设置为 false 表示它不允许被重新赋值）
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },
    "rules": {
        // 自定义您的规则
        // Customize your rules
    }
}
```

#### 给 webpack 添加 eslint-loader
```js
module: {
        rules: [
            {
                test: /\.(jsx|js|ts|tsx)$/,
                include: [
                    path.resolve(__dirname, '../components'),
                    path.resolve(__dirname, '../example')
                ],
                exclude: [/node_modules/],
                use: ['eslint-loader'],
                enforce: 'pre'
            }
      ]
}
要把它放在 rules 的第一项，或者添加 enforce: 'pre' 来保证首先应用 eslint-loader，因为是要对我们的源代码进行检查，检查要在 babel-loader 等其他编译之前。
```

