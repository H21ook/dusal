import InstallPrompt from '@/components/custom/install-prompt'
import PushNotificationManager from '@/components/custom/push-notification-manager'

export default function Page() {
  return (
    <main>
      <div>
        <PushNotificationManager />
        <InstallPrompt />
      </div>
    </main>
  )
}