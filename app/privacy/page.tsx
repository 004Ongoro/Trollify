import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#1A1A2E]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Image src="/logo.png" alt="Trollify" width={100} height={32} className="h-8 w-auto" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-[#00DDEB]">Privacy Policy</CardTitle>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                <p>
                  Trollify is designed with privacy in mind. We do not require user registration or authentication, and
                  we do not collect personal information from our users.
                </p>
                <h3 className="text-lg font-medium text-white mt-4 mb-2">Information We Do NOT Collect:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Personal identification information (name, email, phone number)</li>
                  <li>User accounts or profiles</li>
                  <li>Content created using the service (not stored on our servers)</li>
                  <li>Uploaded images (processed locally in your browser)</li>
                  <li>Usage history or preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Technical Information</h2>
                <p>We may collect minimal technical information for service operation and security purposes:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>IP addresses (for security and abuse prevention)</li>
                  <li>Browser type and version (for compatibility)</li>
                  <li>Device information (for responsive design)</li>
                  <li>Access logs (for service maintenance)</li>
                </ul>
                <p className="mt-2">
                  This information is automatically deleted after 30 days and is not linked to any personal identity.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. How We Process Your Content</h2>
                <p>
                  All content creation and image processing happens locally in your browser using client-side
                  JavaScript. This means:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Your uploaded images never leave your device</li>
                  <li>Text content is not transmitted to our servers</li>
                  <li>Generated images are created and downloaded directly from your browser</li>
                  <li>We have no access to or record of your created content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Cookies and Local Storage</h2>
                <p>We may use minimal browser storage for:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Remembering your theme preferences</li>
                  <li>Storing temporary session data</li>
                  <li>Improving user experience</li>
                </ul>
                <p className="mt-2">No personal information is stored in cookies or local storage.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
                <p>Our service may use third-party services for:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Web hosting and content delivery</li>
                  <li>Analytics (anonymized data only)</li>
                  <li>Security and abuse prevention</li>
                </ul>
                <p className="mt-2">
                  These services are bound by their own privacy policies and do not receive personal information from
                  us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect against unauthorized access, alteration,
                  disclosure, or destruction of information. Since we don't store personal data, the risk of data
                  breaches affecting user privacy is minimal.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Children's Privacy</h2>
                <p>
                  Our service is not directed to children under 13. We do not knowingly collect personal information
                  from children under 13. If you are a parent or guardian and believe your child has used our service,
                  please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. International Users</h2>
                <p>
                  Our service is available globally. By using Trollify, you consent to the processing of minimal
                  technical information as described in this policy, regardless of your location.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify users of any material changes by
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through our official channels.
                </p>
              </section>

              <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 mt-8">
                <h3 className="text-lg font-semibold text-green-400 mb-2">🔒 Privacy-First Design</h3>
                <p className="text-sm">
                  Trollify is built with privacy as a core principle. We believe in providing a useful service without
                  compromising your personal information or privacy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
