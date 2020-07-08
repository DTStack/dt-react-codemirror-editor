# storybook-ts-boilerplate

Boilerplate for storybook and Typescript.

## Integrated

- Storybook
- React.js
- Typescript
- Jest
- commitlint
- conventional-changelog
- husky

## :wrench: 本地开发

### **clone & npm install**

```bash
ssh://git@gitlab.prod.dtstack.cn:10022/dt-insight-front/infrastructure/storybook-ts-boilerplate.git
npm install
```

### 启动本地服务器

```bash
 npm run storybook
```

### 组件开发

+ src/components 目录下编写组件
+ src/stories 目录下编写 storybook 文档
+ npm run storybook 本地文档预览  

## 静态服务部署构建

```bash
npm run build-storybook
```

**组件发布至 npm**
**在按照一些列组件开发规范流程下，测试组件无问题后进行组件发布**

```bash
# output to lib
npm run compile
# Publish to registry
npm publish
```

## 版本发布

```bash
# 默认分支为 master , 发布为此版本更新
$ npm run release

#【自定义】版本发布名称为 v1.0.0-test
$ npm run release -- -r v1.0.0-test

# 指定升级版本为【次】版本号
$ npm run release -- -r minor

# 指定升级版本为【主】版本号
$ npm run release -- -r major

# 指定升级版本为【修订】版本号
$ npm run release -- -r patch

# 指定发布分支
$ npm run release -- -b branchName

# 指定发布分支以及发布名称
$ npm run release -- -b branchName -r versionName

```
