import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for MultiToolSuite to understand how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Privacy Policy</h1>
        <p className="mt-4 text-xl text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
          Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Google AdSense</h2>
        <p>
          We use Google AdSense to serve ads on our website. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </article>
    </div>
  );
}
