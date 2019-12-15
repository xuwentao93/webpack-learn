module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "linebreak-style": ["off"], // 不同操作系统换行符问题.
    "comma-dangle": ["error", "never"], // 对象最后一个不要加逗号.
    "semi": ["error", "never"], // 不要分号
    "react/jsx-filename-extension": ["off"], // js中用jsx语法报错.
    "import/extensions": ["off"], // import .jsx文件报错.
    "no-console": ["off"],
    "no-static-element-interactions": ["off"],
    "click-events-have-key-events": ["off"]
  }
}