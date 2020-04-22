import i18n from '@/lang' 
import defaultSettings from '@/settings'

const title = defaultSettings.title || '精英天成单采血浆站标准化业务管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${generateTitle(pageTitle)} - ${title}`
  }
  return `${title}`
}


function generateTitle(title) {
  const hasKey = i18n.te('route.' + title)
  if (hasKey) {
    const translatedTitle = i18n.t('route.' + title)

    return translatedTitle
  }
  return title
}