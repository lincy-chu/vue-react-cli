const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator')

const create  = async (name, options) => {
    // 执行创建命令
    console.log('执行创建命令')

    // 当前命令行选择的目录
    const cwd = process.cwd()

    // 需要创建的目录地址
    const targetDir = path.join(cwd, name)

    // 目录是否已经存在
    if (fs.pathExistsSync(targetDir)) {
        // 是否强制创建
        if (options.force) {
            await fs.remove(targetDir)
        } else {
            // 询问用户是否确定要覆盖
            console.log('执行...')
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action: ',
                    choices: [
                        {
                            name: 'Overwrite',
                            value: 'overwrite'
                        },
                        {
                            name: 'Cancel',
                            value: 'cancel'
                        }
                    ]
                }
            ])

            if (!action) return
            if (action === 'overwrite') {
                // 移除已存在的目录
                console.log(`\r\nRemoving...`)
                await fs.remove(targetDir)
                    .then(() => {
                        console.log(`\r\nRemove Success`)
                    })
            }
        }
    }

    // 创建项目
    const generator = new Generator(name, targetDir)

    // 开始创建项目
    await generator.create()
}

module.exports = create