import { ComponentMetadata, componentsTags } from '@/components/types'
import {
  getGeneralSettings,
  getComponentSettings,
  settings,
  isUserComponent,
} from '@/core/settings'
import { descendingSort } from '@/core/utils/sort'
import { LaunchBarActionProvider } from '../launch-bar/launch-bar-action'
import { ComponentAction } from '../settings-panel/component-actions/component-actions'

interface UpdateCheckItem {
  url: string
  lastUpdateCheck: number
  installTime: number
  alwaysUpdate?: boolean
}
const localhost = /^http:\/\/localhost/
const name = 'autoUpdate'
type UpdateRecord = Record<string, Record<string, UpdateCheckItem>>
interface CheckSingleTypeUpdateConfig {
  filterNames?: string[]
  force?: boolean
  maxCount?: number
}
type CheckSingleTypeUpdate = (config?: CheckSingleTypeUpdateConfig) => Promise<string>
interface CheckUpdateConfig extends CheckSingleTypeUpdateConfig {
  items: Record<string, UpdateCheckItem>
  existPredicate?: (name: string) => boolean
  // installer: (code: string) => Promise<{ message: string }>
}
const isLocalItem = (url: string) => localhost.test(url)
const defaultExistPredicate = (itemName: string) => (
  settings.userComponents[itemName] !== undefined
  || settings.userPlugins[itemName] !== undefined
  || settings.userStyles[itemName] !== undefined
)
const checkUpdate = async (config: CheckUpdateConfig) => {
  const {
    items,
    existPredicate = defaultExistPredicate,
    filterNames = [],
    force = false,
    maxCount = Infinity,
  } = config
  const now = Number(new Date())
  const { devMode } = getGeneralSettings()
  const { options } = getComponentSettings(name)
  // Remove uninstalled items
  Object.keys(items).filter(it => !existPredicate(it)).forEach(key => {
    delete items[key]
  })
  const shouldUpdate = (itemName: string) => {
    if (filterNames.length === 0) {
      return true
    }
    return filterNames.includes(itemName)
  }
  let updatedCount = 0
  const results = await Promise.allSettled(
    Object.entries(items)
      .filter(([itemName, item]) => shouldUpdate(itemName) && Boolean(item.url))
      .map(async ([itemName, item]) => {
        const { url, lastUpdateCheck, alwaysUpdate } = item
        const isDebugItem = alwaysUpdate && devMode
        if (!isDebugItem && now - lastUpdateCheck <= options.minimumDuration && !force) {
          return `[${itemName}] ????????????????????????, ?????????`
        }
        if (updatedCount > maxCount && !force) {
          return `[${itemName}] ?????????????????????????????? (${maxCount} ???), ?????????`
        }
        let finalUrl = url
        if (localhost.test(url) && options.localPortOverride) {
          finalUrl = url.replace(/:(\d)+/, `:${options.localPortOverride}`)
        }
        const code: string = await coreApis.ajax.monkey({ url: finalUrl })
        // ????????????????????????????????????, ???????????????????????????????????????
        if (!(itemName in items)) {
          return `[${itemName}] ????????????, ????????????`
        }
        if (!code) {
          return `[${itemName}] ??????????????????, ????????????`
        }
        const { installFeatureFromCode } = await import('@/core/install-feature')
        const { message } = await installFeatureFromCode(code, url)
        item.lastUpdateCheck = Number(new Date())
        updatedCount++
        return `[${itemName}] ${message}`
      }),
  )
  return results.map((r, index) => {
    if (r.status === 'fulfilled') {
      return r.value
    }
    const message = r.reason?.message ?? r.reason.toString()
    return `[${Object.keys(items)[index]}] ${message}`
  }).join('\n').trim()
}
const checkComponentsUpdate: CheckSingleTypeUpdate = async config => {
  const { options } = getComponentSettings(name)
  const { components } = options.urls as UpdateRecord
  return checkUpdate({
    items: components,
    ...config,
  })
}
const checkPluginsUpdate: CheckSingleTypeUpdate = async config => {
  const { options } = getComponentSettings(name)
  const { plugins } = options.urls as UpdateRecord
  return checkUpdate({
    items: plugins,
    ...config,
  })
}
const checkStylesUpdate: CheckSingleTypeUpdate = async config => {
  const { options } = getComponentSettings(name)
  const { styles } = options.urls as UpdateRecord
  return checkUpdate({
    items: styles,
    ...config,
  })
}
export const component: ComponentMetadata = {
  name,
  displayName: '???????????????',
  description: {
    'zh-CN': '??????????????????, ????????????????????????. (?????????????????????????????????)',
  },
  tags: [componentsTags.utils],
  options: {
    lastUpdateCheck: {
      displayName: '????????????????????????',
      defaultValue: 0,
      hidden: true,
    },
    localPortOverride: {
      displayName: '????????????????????????',
      defaultValue: '',
      hidden: true,
    },
    minimumDuration: {
      displayName: '???????????? (ms)',
      defaultValue: 1000 * 3600 * 24,
    },
    urls: {
      displayName: '????????????',
      defaultValue: {
        components: {},
        plugins: {},
        styles: {},
      },
      hidden: true,
    },
    maxUpdateCount: {
      displayName: '????????????????????? (???)',
      defaultValue: 4,
      // hidden: true,
    },
  },
  entry: async ({ settings: { options }, coreApis: { pluginApis } }) => {
    const now = Number(new Date())
    const duration = now - options.lastUpdateCheck
    const checkUpdates = async () => {
      console.log('[???????????????] ??????????????????')
      console.log(await checkComponentsUpdate({ maxCount: options.maxUpdateCount }) || '??????????????????')
      console.log(await checkPluginsUpdate({ maxCount: options.maxUpdateCount }) || '??????????????????')
      console.log(await checkStylesUpdate({ maxCount: options.maxUpdateCount }) || '??????????????????')
      options.lastUpdateCheck = Number(new Date())
      console.log('[???????????????] ??????????????????')
    }

    if (duration >= options.minimumDuration) {
      coreApis.lifeCycle.fullyLoaded(checkUpdates)
    }

    const exportMethods = {
      checkUpdates,
      checkUpdatesAndReload: async () => {
        await checkUpdates()
        window.location.reload()
      },
      updateSingleComponent: async (...itemNames: string[]) => {
        await checkComponentsUpdate({ filterNames: itemNames, force: true })
        window.location.reload()
      },
      updateSinglePlugin: async (...itemNames: string[]) => {
        await checkPluginsUpdate({ filterNames: itemNames, force: true })
        window.location.reload()
      },
      updateSingleStyle: async (...itemNames: string[]) => {
        await checkStylesUpdate({ filterNames: itemNames, force: true })
        window.location.reload()
      },
      updateLastFeature: async () => {
        const items = Object.values(options.urls)
          .flatMap(it => Object.entries(it))
          .map(([key, record]: [string, UpdateCheckItem]) => (
            { key, time: record.lastUpdateCheck, item: record }
          ))
          .sort(descendingSort(it => it.time))
        const [firstItem] = items
        if (!firstItem) {
          console.log('?????????????????????????????????')
          return
        }
        await checkUpdate({
          items: { [firstItem.key]: firstItem.item },
          force: true,
        })
        window.location.reload()
      },
    }
    if (getGeneralSettings().devMode) {
      const icon = 'mdi-cloud-sync-outline'
      pluginApis.data.addData('launchBar.actions', (actions: LaunchBarActionProvider[]) => {
        actions.push({
          name: 'autoUpdateActions',
          getActions: async () => [
            {
              name: '??????????????????',
              description: 'Check Updates',
              action: async () => {
                const { Toast } = await import('@/core/toast')
                const toast = Toast.info('??????????????????...', '??????????????????')
                await exportMethods.checkUpdatesAndReload()
                toast.dismiss()
              },
              icon,
            },
            {
              name: '???????????????????????????',
              description: 'Check Last Update',
              action: async () => {
                const { Toast } = await import('@/core/toast')
                const toast = Toast.info('??????????????????...', '???????????????????????????')
                await exportMethods.updateLastFeature()
                toast.dismiss()
              },
              icon,
            },
          ],
        })
      })
    }
    return exportMethods
  },
  plugin: {
    displayName: '??????????????? - ????????????',
    description: {
      'zh-CN': '???????????????????????????????????????/?????????????????????????????????; ?????????????????????????????????????????????????????????.',
    },
    // ?????????????????????????????????????????????????????????, ????????????????????? Hooks ????????????.
    setup: ({ addData, addHook }) => {
      const types = ['components', 'plugins', 'styles']
      types.forEach(type => {
        addHook(`user${lodash.startCase(type)}.add`, {
          after: (_, url: string, metadata: { name: string }) => {
            // console.log('hook', `user${lodash.startCase(type)}.add`, metadata.name, url)
            const { options } = getComponentSettings('autoUpdate')
            const existingItem = options.urls[type][metadata.name] as UpdateCheckItem
            if (!existingItem) {
              options.urls[type][metadata.name] = {
                url,
                lastUpdateCheck: Number(new Date()),
                installTime: Number(new Date()),
                alwaysUpdate: isLocalItem(url),
              } as UpdateCheckItem
            } else {
              existingItem.url = url
              existingItem.lastUpdateCheck = Number(new Date())
              existingItem.alwaysUpdate = isLocalItem(url)
              // keep install time
            }
          },
        })
        addHook(`user${lodash.startCase(type)}.remove`, {
          after: (metadata: { name: string }) => {
            const { options } = getComponentSettings('autoUpdate')
            if (!options.urls[type][metadata.name]) {
              return
            }
            delete options.urls[type][metadata.name]
          },
        })
      })
      addData('settingsPanel.componentActions', (actions: ComponentAction[]) => {
        const { options } = getComponentSettings('autoUpdate')
        actions.push(metadata => {
          const item = options.urls.components[metadata.name] as UpdateCheckItem
          if (!item) {
            return undefined
          }
          return {
            name: 'checkUpdate',
            displayName: '????????????',
            icon: isLocalItem(item.url) ? 'mdi-file-download-outline' : 'mdi-cloud-download-outline',
            condition: () => isUserComponent(metadata),
            title: item.url,
            action: async () => {
              const { Toast } = await import('@/core/toast')
              const toast = Toast.info('???????????????...', '????????????')
              const result = await checkComponentsUpdate({
                filterNames: [metadata.name],
                force: true,
              })
              toast.message = result
              toast.duration = 3000
            },
          }
        })
      })
    },
  },
}
