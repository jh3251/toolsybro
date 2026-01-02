
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ToolsyBro',
  description: 'Our Privacy Policy for ToolsyBro and our collection of free tools.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 2, 2023';

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Privacy Policy</h1>
        <p className="mt-4 text-xl text-muted-foreground">Last updated: {lastUpdated}</p>
      </header>
      <article className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-muted-foreground">
        <p>
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Information Collection and Use</h2>
        <p>
          For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy. The app does use third-party services that may collect information used to identify you.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Log Data</h2>
        <p>
          We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Cookies</h2>
        <p>
          Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Google AdSense</h2>
        <p>
          We use Google AdSense to serve ads on our website. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </article>
    </div>
  );
}
