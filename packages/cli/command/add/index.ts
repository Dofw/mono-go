import chalk from 'chalk'
import MiddleWare from './middleware'
import load from './load'
import confirm from './confirm'

const app = new MiddleWare()

// 先确认, 在加载
app
  .use(confirm)
  .use(load)

async function addAction(configFile: _Global.ConfigFile, _args) {
  const [template] = _args
  if (!template)
    throw new Error(chalk.red('Missing require argument: `tempalte`.'))

  const context: _Global.Context = {
    template,
    answers: Object.create(null),
    configFile,
  }

  await app.run(context)
}

export default addAction
