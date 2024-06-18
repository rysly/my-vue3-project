# my-vue3-project 开发须知

## 项目主要使用 uni-app + vue3 + vite3 + typescript + pinia + uv-ui + Tailwind css

## 建议使用 node18+ 或node20 环境开发，使用 yarn 下载安装包

## 脚手架搭建

- [项目搭建参考](https://zhuanlan.zhihu.com/p/676624807)
- [node](http://nodejs.org/) and [git](https://git-scm.com/)
- [uni-app工程化](https://uniapp.dcloud.net.cn/quickstart-cli.html#install-vue-cli)
- [vue3](https://cn.vuejs.org/api/composition-api-setup.html)
- [vite3](https://vitejs.cn/)
- [TypeScript](https://www.typescriptlang.org/)
- [pinia](https://pinia.web3doc.top/)
- [UI 框架选型](https://juejin.cn/post/7337513012393607207)
- [tailwindcss](https://tailwindcss.com/) - 方便的写 css

## Install and use

- Get the project code

```bash
git clone https://github.com/rysly/my-vue3-project.git
```

- Installation dependencies

```bash
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
nvm use 20
nvm install 20
node -v
npm install yarn -g
yarn
```

- run

```bash
yarn dev:mp-weixin
yarn dev:h5
```

- build

```bash
yarn build:h5
```

- 提交代码使用 commitizen

```bash
git pull

git add .
npm run commit
git push

git rebase master
git rebase --continue (有冲突)
git rebase --abort(有冲突，取消)

git stash
git stash pop

git reset --soft 266a026 (commit撤回)
```

## 知识积累
