# About [Husky](https://typicode.github.io/husky/)

[Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 관리를 위한 도구  
보통 버전 관리에 포함하지 않는 `.git` 디렉토리 대신 `.husky` 디렉토리에서 스크립트를 관리하기 때문에 협업 환경을 구성할 수 있다.

## Troubleshooting

### npm: command not found

터미널에서 커밋하면 정상 동작하지만, [Fork](https://git-fork.com/)에서 커밋하면 에러가 발생하는 현상  
`$PATH` 이슈로 발생하는 문제로 Husky 시작 파일을 생성해 해결한다.  
(참고: https://typicode.github.io/husky/how-to.html#node-version-managers-and-guis)

```sh
# ~/.config/husky/init.sh

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
