#! /usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')

program
    // 定义命令和参数
    .command('create <app-name>')
    .description('create a new project')
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        // 打印执行结果
        // console.log('name: ', name, 'options: ', options)
        // 在 create.js 找那个执行创建任务
        require('../lib/create.js')(name, options)
    })

program
    // 配置版本号信息
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')

program
    // 监听 --help 执行
    .on('--help', () => {
        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`)
    })

// 解析用户执行命名传入参数
program
    .parse(process.argv)
